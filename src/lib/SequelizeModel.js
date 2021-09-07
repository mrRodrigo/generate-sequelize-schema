// https://sequelize.org/v4/manual/tutorial/models-definition.html
import SequelizeFieldBuilder from "./SequelizeFieldBuilder";

const PLACEHOLDER = "$$$";

export default class SequelizeModel {
  constructor({ tableName, columns }) {
    this.columns = columns;
    this.schema = "";
    this._buildBaseSchema(tableName);
  }

  execute() {
    const stringFields = [];

    this.columns.forEach((c, index) => {
      const fieldString = new SequelizeFieldBuilder(c)
        .buildFieldName()
        .addTypeName()
        .addUniqueKey()
        .addPrimaryKey()
        .addAllowNull()
        .execute();

      stringFields.push(fieldString);
    });

    this.schema = this.schema.replace("$$$", stringFields.join(""));
    return this.schema;
  }

  _buildBaseSchema(tableName) {
    this.schema = `const ${tableName} = Sequelize.define('${tableName}', {\n${PLACEHOLDER}\n});\n\n`;
  }
}
