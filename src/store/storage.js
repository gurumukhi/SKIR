import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

export const getJSONObject = async (key = `SKIRAppData`) => {
  const result = await Storage.get({ key });
  return JSON.parse(result.value)?.value;
};

export const setJSONObject = async (key, value) => {
  // const result1 = await Storage.get({ key });

  const result = await Storage.set({
    key,
    value: JSON.stringify({
      value,
    }),
  });

  return result;
};

export const getStringItem = async (key) => {
  const { value } = await Storage.get({ key });
  return value;
};

export const setStringItem = async (key, value) => {
  await Storage.set({
    key,
    value,
  });
};

export const getAllKeys = async () => {
  const { keys } = await Storage.keys();
  return keys;
};

export const removeItem = async (key) => {
  await Storage.remove({ key });
};

export const clear = async () => {
  await Storage.clear();
};
