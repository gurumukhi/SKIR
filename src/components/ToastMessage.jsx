import React from "react";
import { IonToast } from "@ionic/react";

// By default shown for 2.5sec without close button
export const ToastMessage = ({ showClose, message, duration, onDismiss }) => (
  <IonToast
    isOpen={true}
    onDidDismiss={() => onDismiss()}
    message={message}
    duration={duration || 2500}
    buttons={
      showClose
        ? [
            {
              text: "Close",
              handler: () => {
                onDismiss();
              },
            },
          ]
        : []
    }
  />
);
