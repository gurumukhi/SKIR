// Ref: https://ionicframework.com/docs/enterprise/filesystem

import {
  Plugins,
  FilesystemDirectory,
  FilesystemEncoding,
} from "@capacitor/core";

const { Filesystem } = Plugins;

export const fileWrite = async (data, path) => {
  try {
    const result = await Filesystem.writeFile({
      path,
      data,
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8,
    });
    return { result };
  } catch (error) {
    console.error("Unable to write file", error);
    return { error };
  }
};

export const fileRead = async (path) => {
  try {
    return await Filesystem.readFile({
      path,
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8,
    });
  } catch (err) {
    console.error("Unable to read file", err);
  }
};
