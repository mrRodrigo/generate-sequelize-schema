const DEFAULT_TYPE = "varchar";
const TAB = "\t";
const DOUBLE_TAB = "\t\t";
const END_FIELD = "},\n";

const typeMapper = {
  varchar: "Sequelize.STRING",
};

const toBoolean = (value) => value === "true";

export default class SequelizeFieldBuilder {
  constructor({ name, type, allowNull, unique, primaryKey }) {
    this.fieldString = "";

    this.name = name;
    this.type = type;
    this.allowNull = allowNull;
    this.unique = unique;
    this.primaryKey = primaryKey;
  }

  execute() {
    this.fieldString += `${TAB}${END_FIELD}`;
    return this.fieldString;
  }

  buildFieldName() {
    this.fieldString += `${TAB}${this.name}: {\n`;
    return this;
  }

  addTypeName() {
    const sqlizeType = typeMapper[this.type] || typeMapper[DEFAULT_TYPE];

    this._addFieldOption("type", sqlizeType);
    return this;
  }

  addUniqueKey() {
    this._addFieldOption("unique", toBoolean(this.unique));
    return this;
  }

  addPrimaryKey() {
    this._addFieldOption("primaryKey", toBoolean(this.primaryKey));
    return this;
  }

  addAllowNull() {
    this._addFieldOption("allowNull", toBoolean(this.allowNull));
    return this;
  }

  _addFieldOption(optionName, value) {
    this.fieldString += `${DOUBLE_TAB}${[optionName]}: ${value},\n`;
  }
}
