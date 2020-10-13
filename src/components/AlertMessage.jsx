import React from "react";
import { IonAlert } from "@ionic/react";

export const AlertMessage = ({ alertObject }) => (
  <IonAlert
    isOpen={true}
    onDidDismiss={alertObject.dismissHandler}
    header={alertObject.header}
    message={alertObject.message}
    buttons={[
      {
        text: alertObject.showClose ? "Close" : "Cancel",
        role: "cancel",
        cssClass: "alertSecondary",
      },
      ...alertObject?.additionalButtons,
    ]}
  />
);
