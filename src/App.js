import './App.css';
import React, { useState } from 'react';
import CsvTable from './components/CsvTable.js';
import CsvReader from './components/CsvReader.js';
import Papa from 'papaparse';
function App() {
  const [data, setData] = useState([]);
  const handleFileUpload = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  };
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React 網頁讀取 CSV 格式檔案</h1>
      </header>
      <CsvReader onFileUpload={handleFileUpload} />
      <CsvTable data={data} />
    </div>
  );
}

export default App;
