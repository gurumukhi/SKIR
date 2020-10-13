import React, { useContext, useState } from "react";
import {
  IonContent,
  IonPage,
  IonLabel,
  IonImg,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { IMG_SRC } from "../assets/assets";
import "../theme/style.scss";
import { AppContext, ACTION_LIST } from "../store/state_actions";
import { SKIRHeader } from "../components/SKIRHeader";

const MainPage = ({ history }) => {
  const { dispatch } = useContext(AppContext);

  const [isReloading, setIsReloading] = useState(false);
  const [toastMessage, setToastMessage] = useState();

  const [alertObject, setAlertObject] = useState();

  // Fetch list from server (pull-to-refresh action)
  const doRefresh = async (event) => {
    try {
      setIsReloading(true);
      console.log("some operation");

      setIsReloading(false);
      event.detail.complete();
      setToastMessage("Operation performed");
    } catch (err) {
      console.warn(err);
      dispatch({ type: ACTION_LIST.ERROR_LOG, error: err });
    }
  };

  return (
    <IonPage>
      <SKIRHeader
        history={history}
        title={"Your Main Page"}
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
        alertObject={alertObject}
      />
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div className="center">
          <IonImg
            src={IMG_SRC.para}
            className={isReloading ? "para" : ""}
            style={{
              width: "50%",
              margin: "25%",
              opacity: isReloading ? "1" : "0.3",
            }}
          />
        </div>
        <div className="hasFontSize colorGray center">
          <IonLabel>
            {isReloading
              ? null
              : `Pull down the screen to ${"refresh"} the list.`}
          </IonLabel>
          <div className="spacerMedium" />
          {!isReloading && (
            <IonLabel
              className="colorGray underline"
              onClick={async () => {
                setAlertObject({
                  header: "Proceed to select file",
                  message: `Proceed with file upload?`,
                  dismissHandler: () => setAlertObject(null),
                  additionalButtons: [
                    {
                      text: "Continue",
                      handler: async () => {
                        console.log("some operation");
                      },
                    },
                  ],
                });
              }}
            >
              Click here to upload a file.
            </IonLabel>
          )}{" "}
          <div className="spacerMedium" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MainPage;
