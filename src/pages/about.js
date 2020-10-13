import React, { useState } from "react";
import { IonToast, IonImg, IonIcon, IonContent, IonPage } from "@ionic/react";
import { IMG_SRC } from "../assets/assets";
import { SKIRHeader } from "../components/SKIRHeader";
import {
  logoTwitter,
  logoWordpress,
  mailOutline,
  logoGithub,
} from "ionicons/icons";

const About = ({ history }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [message, setMessage] = useState();
  const [alertObject, setAlertObject] = useState();

  const mailTo = `mailto:${encodeURIComponent(
    '"Ram Dayal Vaishnav"<vaishnav.rd@gmail.com>'
  )}?subject=SKIRApp`;

  return (
    <IonPage>
      <SKIRHeader
        history={history}
        title={"About SKIR"}
        alertObject={alertObject}
      />
      <IonContent>
        {/* <div style={{ textAlign: "left", marginTop: "10%" }}> */}
        <div className="center">
          <IonImg
            onClick={() => setIsAnimating(!isAnimating)}
            src={IMG_SRC.para}
            className={isAnimating ? "para2" : ""}
            style={{
              marginLeft: "30%",
              width: "40%",
              marginTop: "100px",
              maxWidth: "150px",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            top: "265px",
            width: "100%",
          }}
        >
          <div className="hasDisplayFlexColumn">
            <div style={{ textAlign: "center", width: "100%" }}>
              <h2 style={{ fontWeight: "900" }}>
                SKIR<span className="colorYellow">APP</span>
              </h2>
              <div className="hasFontSizeMedium" style={{ paddingTop: 8 }}>
                Version 1.0
              </div>
            </div>
          </div>

          <div
            className=" center"
            style={{
              marginTop: 40,
              borderTop: "1px solid silver",
              marginLeft: 20,
              marginRight: 20,
              paddingTop: 20,
            }}
          >
            <div
              className="hasFontSize colorGray"
              style={{ fontStyle: "italic" }}
            >
              developed by
            </div>
            <h5
              style={{
                margin: 10,
                color: "black",
                fontWeight: "900",
              }}
            >
              Gurumukhi IT Solutions
            </h5>

            <div>
              <IonIcon
                className="aboutIcon"
                icon={logoGithub}
                onClick={() => {
                  window.open("https://github.com/gurumukhi");
                }}
              />

              <IonIcon
                className="aboutIcon"
                icon={mailOutline}
                onClick={() => {
                  setAlertObject({
                    header: "Mail ID",
                    message: `<a href="${mailTo}">vaishnav.rd@gmail.com</a>`,
                    dismissHandler: () => setAlertObject(null),
                    showClose: true,
                    additionalButtons: [],
                  });
                }}
              />
              <IonIcon
                className="aboutIcon"
                icon={logoTwitter}
                onClick={() => {
                  window.open("https://twitter.com/ram_gurumukhi");
                }}
              />
              <IonIcon
                className="aboutIcon"
                icon={logoWordpress}
                onClick={() => {
                  window.open("https://gurumukhi.wordpress.com/");
                }}
              />
            </div>
            <hr />
          </div>
        </div>

        <IonToast
          isOpen={!!message}
          onDidDismiss={() => setMessage()}
          message={message}
          buttons={[
            {
              text: "Close",
              handler: () => {
                setMessage();
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default About;
