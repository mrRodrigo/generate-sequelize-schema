import React, { useState } from "react";
import Draggable from "react-draggable";
import { EditText } from "react-edit-text";


import "./Table.css";

function Table(props) {
  const [id, setID] = useState(Date.now());
  const [tableName, setTableName] = useState("table");

  const [tableFields, setTableFields] = useState([
    { name: "name", type: "varchar", null: "false" },
    { name: "name", type: "varchar", null: "false" },
    { name: "name", type: "varchar", null: "false" },
  ]);

  const addColumn = () => {
    setTableFields((old) => [
      ...old,
      { name: "name", type: "varchar", null: "false" },
    ]);
    props.setTableData({ id, name: tableName, columns: tableFields });
  }
  

  const changeColumnField = (event, index, field) => {
    setTableFields((old) => {
      old[index][field] = event;
      return [...old];
    });
    props.setTableData({ id, name: tableName, columns: tableFields });
  };

  const updateName = name => {
    setTableName(name);
    props.setTableData({ id, name: tableName, columns: tableFields });
  }

  return (
    <Draggable>
      <div className="Table">
        <div className="TableTitle">
          <EditText value={tableName} onChange={updateName} />
        </div>

        <table className="FieldsContent">
          <tr>
            <th>Field Name</th>
            <th>Data Type</th>
            <th>Not null</th>
          </tr>
          {tableFields.map((field, index) => (
            <tr className="tableField">
              <td>
                <EditText
                  value={field.name}
                  onChange={event => changeColumnField(event, index, "name")}
                />
              </td>
              <td>
                <EditText
                  value={field.type}
                  onChange={event => changeColumnField(event, index, "type")}
                />
              </td>
              <td>
                <EditText
                  value={field.null}
                  onChange={event => changeColumnField(event, index, "null")}
                />
              </td>
            </tr>
          ))}
        </table>

        <button onClick={addColumn}> add column </button>
      </div>
    </Draggable>
  );
}

export default Table;

