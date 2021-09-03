// https://sequelize.org/v4/manual/tutorial/models-definition.html

const typeMapper = {
  varchar: "STRING",
};

const Sequelize = (data) => {
    let model = "";
    let schema = "";
    console.log(data);

    data.map(table => {
        const { name: tableName, columns } = table;
        let fields = "";
        console.log(table)
        columns.forEach((c, index) => {
            const { name, type, allowNull, unique, primaryKey } = c;

            fields += `\t${name}: {\n`;
            fields += `\t\ttype: Sequelize.${typeMapper[type]},\n`;
            fields += `\t\tunique: ${unique === 'true'},\n`;

            if(primaryKey) fields += `\t\tprimaryKey: ${true},\n`;

            fields += `\t\tallowNull: ${allowNull === 'true'}\n\t}`;

            if (index !== columns.length - 1) fields += ",\n";
        });

        model += `const ${tableName} = Sequelize.define('${tableName}', {\n$$$\n});\n\n\n\n`;
        schema += model.replace("$$$", fields);
        console.log(schema);
        model = '';
    });

    return schema;
};

export default Sequelize;
