import "./App.css";
import React, { useState } from "react";
import Table from "./components/Table/Table";

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
    console.log(tablesData)
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
