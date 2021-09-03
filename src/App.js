import "./App.css";
import React, { useState } from "react";
import Table from "./components/Table/Table";
import Sequelize from "./lib/Sequelize";

function App() {
  const [tables, setTables] = useState([]);
  
  const [tablesData, setTablesData] = useState([]);

  const addTable = () =>
    setTables((old) => [...old, <Table setTableData={updateTableData} />]);

  const updateTableData = (data) => {
    setTablesData(prev => {
      const stay = prev.filter(({ id }) => id !== data.id)
      return [...stay, data]
    });
  };

  const generate = () => {
    const code = Sequelize(tablesData);
    const element = document.createElement("a");
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "model.js";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div className="App">
      <header className="App-header">
        {tables.map((e) => e)}
        <button onClick={addTable}> add table </button>
        <button onClick={generate}> Generate </button>
      </header>
    </div>
  );
}

export default App;
