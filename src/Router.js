import React, { useContext } from "react";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import "./theme/variables.css";

import Login from "./pages/login";
import MainPage from "./pages/mainPage";
import Facts from "./pages/facts";
import QRScanner from "./pages/qrScanner";
import About from "./pages/about";
import Info from "./pages/info";

import { AppContext } from "./store/state_actions.jsx";
import { IMG_SRC } from "./assets/assets";

const Router = () => {
  const { state } = useContext(AppContext);

  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/login" component={Login} />
          <Route path="/mainPage" component={MainPage} />
          <Route path="/facts" component={Facts} />
          <Route path="/qrScanner" component={QRScanner} />
          <Route path="/about" component={About} />
          <Route path="/info" component={Info} />
          <Route
            path="/"
            render={() => (
              <Redirect to={!!state.appUser?.token ? "/mainPage" : "/login"} />
            )}
            exact={true}
          />
        </IonRouterOutlet>
        {
          <IonTabBar
            slot="bottom"
            style={{ display: !!state.appUser?.token ? "flex" : "none" }}
          >
            <IonTabButton tab="mainPage" href="/mainPage">
              <IonIcon src={IMG_SRC.shopping_cart} />
              <IonLabel>Main Page</IonLabel>
            </IonTabButton>
            <IonTabButton tab="facts" href={`/facts`}>
              <IonIcon src={IMG_SRC.trekList} />
              <IonLabel>Interesting Facts</IonLabel>
            </IonTabButton>
            <IonTabButton tab="qrScanner" href="/qrScanner">
              <IonIcon src={IMG_SRC.qrScanner} />
              <IonLabel>QR Scanner</IonLabel>
            </IonTabButton>
          </IonTabBar>
        }
      </IonTabs>
    </IonReactRouter>
  );
};

export default Router;
