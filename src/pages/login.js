import React, { useState, useContext } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  useIonViewDidEnter,
} from "@ionic/react";
import "../theme/style.scss";
import { AppContext } from "../store/state_actions";
import "../theme/style.scss";

import { logIn } from "../store/action_methods";
import { getJSONObject } from "../store/storage";
import { ToastMessage } from "../components/ToastMessage";

const Login = ({ history }) => {
  const { state, dispatch } = useContext(AppContext);

  useIonViewDidEnter(async () => {
    const storedValues = await getJSONObject();
    if (!!storedValues?.appUser?.token) {
      history.replace("/mainPage");
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState();

  const [toastMessage, setToastMessage] = useState();
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const login = async () => {
    setProcessing("login");
    const response = await logIn({
      email,
      password,
      connectToProdServer: state.settings?.connectToProdServer,
    });
    setToastMessage(
      response.error
        ? response.error
        : response.appUser.token
        ? null // "Logged in successfully"
        : "Could not login"
    );
    if (!response.error && response.appUser.token) {
      // Login Successful
      dispatch(response);
      history.entries = [];
      history.index = -1;
      history.push(`/`);
    }

    setProcessing();
    setShowForgotPassword(true);
  };

  const resetPassword = async () => {
    if (!email || processing) return;
    setProcessing("resetPassword");

    setToastMessage("All is well");
    setProcessing();
  };

  return (
    <IonPage>
      <IonContent>
        {!!toastMessage && (
          <ToastMessage
            message={toastMessage}
            onDismiss={() => setToastMessage()}
          />
        )}
        <div className="hasDisplayFlexRow" style={{ height: "100%" }}>
          <div
            style={{
              fontWeight: 600,
              width: "100%",
              textAlign: "center",
              height: 50,
              fontSize: 32,
              backgroundColor: "#ffcc03",
              paddingTop: 7,
            }}
          >
            SKIR-APP
          </div>
          <div className="loginMain">
            <div
              className="loginForm"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                textAlign: "center",
                margin: 50,
                padding: "5px 0px 15px 0px",
                borderRadius: 4,
              }}
            >
              <div
                className="tvName"
                style={{
                  fontWeight: 900,
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                Login
                {/* <span className="colorYellow">Vitals</span> */}
              </div>
              <IonInput
                className="loginInput borderBottom"
                type="email"
                value={email}
                style={{ borderRadium: 4 }}
                placeholder="Email ID"
                onIonChange={(e) => {
                  setEmail(e.detail.value);
                }}
              />
              <IonInput
                className="loginInput borderBottom"
                type="password"
                value={password}
                style={{ borderRadium: 4 }}
                placeholder={"Password"}
                onIonChange={(e) => {
                  setPassword(e.detail.value);
                }}
              />
              <div style={{ textAlign: "center", marginTop: 10 }}>
                <IonButton
                  disabled={!email || !password || processing === "login"}
                  onClick={login}
                >
                  {processing === "login" ? "Loggin in..." : "Log In"}
                </IonButton>
              </div>
              {showForgotPassword && (
                <div
                  className={`hasPadding hasFontSizeMedium underline ${
                    email && !processing ? "colorGray" : "colorGray"
                  }`}
                  onClick={resetPassword}
                >
                  {processing === "forgotPassword"
                    ? "Finding user..."
                    : "Forgot Password?"}
                </div>
              )}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
