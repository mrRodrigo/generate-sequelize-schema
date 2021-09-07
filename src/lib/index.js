import SequelizeModel from "./SequelizeModel";

export const buildSequelizeModels = (tables) => {
  const stringModels = [];

  tables.forEach((table) => {
    stringModels.push(new SequelizeModel(table).execute());
  });

  return stringModels.join("");
};
