import { ellipsisVertical } from "ionicons/icons";
import React, { useState, useContext } from "react";
import {
  IonAlert,
  IonPopover,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonButtons,
  IonButton,
  IonListHeader,
  IonItem,
  useIonViewDidEnter,
  IonIcon,
} from "@ionic/react";
import "../theme/style.scss";
import { logOut } from "../store/action_methods";
import { AppContext, ACTION_LIST } from "../store/state_actions";
import { getJSONObject } from "../store/storage";
import { ToastMessage } from "./ToastMessage";
import { AlertMessage } from "./AlertMessage";

export const SKIRHeader = ({
  history,
  title,
  toastMessage,
  setToastMessage,
  alertObject,
}) => {
  const { state, dispatch } = useContext(AppContext);

  useIonViewDidEnter(async () => {
    const storedValues = await getJSONObject();
    if (!storedValues?.appUser?.token) {
      history.replace("/login");
    }
    dispatch({ type: ACTION_LIST.PATH_CHANGE, path: window.location.pathname });
  });

  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState(null);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const allSmileys = [
    require("../assets/smiles/1.svg"),
    require("../assets/smiles/2.svg"),
    require("../assets/smiles/3.svg"),
    require("../assets/smiles/4.svg"),
    require("../assets/smiles/5.svg"),
    require("../assets/smiles/6.svg"),
    require("../assets/smiles/7.svg"),
    require("../assets/smiles/8.svg"),
    require("../assets/smiles/9.svg"),
  ];

  const logout = async () => {
    const response = await logOut({
      token: state.appUser.token,
      connectToProdServer: state.settings?.connectToProdServer,
    });
    dispatch(response);
    history.entries = [];
    history.index = -1;
    history.push(`/`);
    if (!response.appUser?.token) {
      console.warn(
        "Could not log out successfully, manually marked user logged out"
      );
    }
  };

  return (
    <IonHeader>
      {!!toastMessage && (
        <ToastMessage
          message={toastMessage}
          onDismiss={() => setToastMessage()}
        />
      )}
      {!!alertObject && <AlertMessage alertObject={alertObject} />}

      <IonAlert
        isOpen={showLogoutAlert}
        onDidDismiss={() => setShowLogoutAlert(false)}
        header={"Confirm Logout"}
        message={"Are you sure you want to <strong>Logout</strong>?"}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "alertSecondary",
          },
          {
            text: "Yes",
            cssClass: "",
            handler: logout,
          },
        ]}
      />

      <IonToolbar color="primary">
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="secondary">
          <IonPopover
            isOpen={showPopover}
            onDidDismiss={(e) => {
              setShowPopover(false);
              setPopoverEvent(null);
            }}
            event={popoverEvent}
          >
            <IonList>
              <IonListHeader>
                Hi, {state.appUser?.userName}
                <IonIcon
                  icon={
                    allSmileys[Math.floor(Math.random() * allSmileys.length)]
                  }
                  className="iconSmiley marginHorizontal"
                />
              </IonListHeader>
              <IonItem button href="/info">
                Information
              </IonItem>
              <IonItem button href="/about">
                About
              </IonItem>
              <IonItem
                button
                onClick={() => {
                  setShowLogoutAlert(true);
                  setShowPopover(false);
                  setPopoverEvent(null);
                }}
              >
                Logout
              </IonItem>
            </IonList>
          </IonPopover>

          <IonButton
            onClick={(e) => {
              e.persist();
              setShowPopover(true);
              setPopoverEvent(e);
            }}
          >
            <IonIcon slot="icon-only" icon={ellipsisVertical} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};
