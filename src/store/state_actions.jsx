import React, { useEffect, createContext, useReducer } from "react";
import { setJSONObject, getJSONObject } from "./storage";

export const STORAGE_KEY = `SKIRAppData`;
let AppContext = createContext();

const setPersistedState = (state) => {
  setJSONObject(STORAGE_KEY, state);
};

const getPersistedState = () => {
  return getJSONObject(STORAGE_KEY);
};

const AUDIT_FLAG = false;

const ACTION_LIST = {
  GET_STORED_VALUES: "getStoredValues",
  LOG_IN: "logIn",
  ERROR_LOG: "errorLog",
  PATH_CHANGE: "pathChange",
  SETTING_CHANGE: "settingChange",
};

const getAuditObject = (state, action) => [
  ...(state.audit || []),
  {
    action: AUDIT_FLAG
      ? action
      : {
          type: action.type,
        },
    // timeStamp: new Date(),
  },
];

let reducer = (state, action) => {
  switch (action.type) {
    case ACTION_LIST.GET_STORED_VALUES: {
      return {
        ...state,
        ...action.values,
        audit: getAuditObject(state, action),
      };
    }
    case ACTION_LIST.LOG_IN: {
      return {
        ...state,
        appUser: action.appUser,
        audit: getAuditObject(state, action),
      };
    }
    case ACTION_LIST.PATH_CHANGE: {
      return {
        ...state,
        currentPath: action.path,
        audit: getAuditObject(state, action),
      };
    }
    case ACTION_LIST.ERROR_LOG: {
      return {
        ...state,
        appUser: action.appUser ? action.appUser : state.appUser,
        audit: getAuditObject(state, action),
      };
    }
    case ACTION_LIST.SETTING_CHANGE: {
      return {
        ...state,
        settings: action.settings,
        audit: getAuditObject(state, action),
      };
    }
    default: {
      console.error(`Oops. Got action of unknown type ${action}`);
      //   return new Error();
    }
  }
  return state;
};

const logger = (reducer) => {
  const reducerWithLogger = (state, action) => {
    const loggingOn = false;
    if (loggingOn) {
      console.log(
        "%cPrevious State:",
        "color: #9E9E9E; font-weight: 700;",
        state
      );
      console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action);
      console.log(
        "%cNext State:",
        "color: #47B04B; font-weight: 700;",
        reducer(state, action)
      );
    }
    return reducer(state, action);
  };
  return reducerWithLogger;
};

const loggerReducer = logger(reducer);

const AppContextProvider = (props) => {
  const fullInitialState = {};
  let [state, dispatch] = useReducer(loggerReducer, fullInitialState);
  let value = { state, dispatch };

  // On app load, fetch state from storage
  useEffect(() => {
    const set = async () => {
      const values = await getPersistedState();
      dispatch({ type: ACTION_LIST.GET_STORED_VALUES, values });
    };
    set();
  }, []);

  // Store updated state in storage (unless we just now fetched it)
  useEffect(() => {
    const set = async () => {
      if (
        JSON.stringify(state) !== "{}" &&
        state.audit[state.audit.length - 1].type !==
          ACTION_LIST.GET_STORED_VALUES
      ) {
        await setPersistedState(state);
      }
    };
    set();
  }, [state]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer, ACTION_LIST };
