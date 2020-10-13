import { ACTION_LIST, STORAGE_KEY } from "./state_actions";
import { getJSONObject } from "./storage";

export const getStoredValues = async () => {
  try {
    const storedValues = await getJSONObject(STORAGE_KEY);
    return {
      type: ACTION_LIST.GET_STORED_VALUES,
      appUser: storedValues?.appUser,
    };
  } catch (err) {
    console.warn(err);
    return {
      type: ACTION_LIST.ERROR_LOG,
      error: `Internal error (${err.message})`,
    };
  }
};

export const logIn = async (params) => {
  try {
    const prom = await new Promise((res) =>
      res({ userName: "gurumukhi", token: "testToken" })
    );
    if (!prom) {
      return {
        type: ACTION_LIST.ERROR_LOG,
        error: `Internal error`,
      };
    }
    const response = prom;
    return {
      type: ACTION_LIST.LOG_IN,
      appUser: response,
      error: response?.message && response.status > 399 ? response.message : "",
    };
  } catch (err) {
    console.warn(err);
    return {
      type: ACTION_LIST.ERROR_LOG,
      error: `Internal error (${err.name}: ${err.message})`, ///- Use this format wherever not adopted yet
    };
  }
};

export const logOut = async (params) => {
  try {
    const response = await new Promise((res) => res({ message: "logged out" }));
    return {
      type: ACTION_LIST.LOG_IN,
      error: response?.message && response.status > 399 ? response.message : "",
      appUser: { name: null, token: null },
    };
  } catch (err) {
    console.warn(err);
    return {
      type: ACTION_LIST.ERROR_LOG,
      appUser: { name: null, token: null },
      error: `Internal error (${err.message})`,
    };
  }
};
