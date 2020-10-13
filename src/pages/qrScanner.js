import React, { useState, useCallback } from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonLabel,
  useIonViewDidEnter,
} from "@ionic/react";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { SKIRHeader } from "../components/SKIRHeader";

const QRScanner = ({ history }) => {
  const [value, setValue] = useState(null);

  const memoizedScanner = useCallback(async () => {
    try {
      const data = await BarcodeScanner.scan();
      console.log(data);
      if (!data.text || !parseInt(data.text)) {
        setValue("Try scanning again.");
        return;
      }
      setValue(data.text);
    } catch (error) {
      setValue(error);
      console.warn(error);
    }
  }, []);

  useIonViewDidEnter(() => {
    // memoizedScanner();
  });

  return (
    <IonPage>
      <SKIRHeader history={history} title={"QR Scanner"} />
      <IonContent>
        <div style={{ textAlign: "center", marginTop: "40%" }}>
          <IonButton onClick={memoizedScanner}>
            {value ? "Scan Barcode Again" : "Scan Barcode"}
          </IonButton>
          {!!value && (
            <div>
              <IonLabel>{value}</IonLabel>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default QRScanner;
