import './App.css';
import React, { useState } from 'react';
import MultiLevelSelect from './components/MultiLevelSelect';
import LineGraph from './components/LineGraph.js';
import CsvTable from './components/CsvTable.js';
import CsvReader from './components/CsvReader.js';
import Papa from 'papaparse';
import moment from 'moment';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [selectedSerialNumber, setSelectedSerialNumber] = useState(null);
  const [selectedStationNumber, setSelectedStationNumber] = useState(null);
  const [selectedTagName, setSelectedTagName] = useState(null);

  // 以 papaparse 解析上傳的.csv檔案
  const handleFileUpload = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setCsvData(results.data);
      },
    });
  };

  // 篩選並排序資料
  const filterAndSortData = (serialNumber, stationNumber, tagName) => {
    const filteredData = csvData.filter(
      (item) =>
        item.serial_number === serialNumber &&
        item.station_number === stationNumber &&
        item.tag_name === tagName
    );

    const sortedData = filteredData.sort(
      (a, b) =>
        moment(a.tag_created_at, 'YYYY-MM-DD HH:mm:ss').toDate() -
        moment(b.tag_created_at, 'YYYY-MM-DD HH:mm:ss').toDate()
    );

    return sortedData;
  };

  const filteredAndSortedData = filterAndSortData(
    selectedSerialNumber,
    selectedStationNumber,
    selectedTagName
  );

  return (
    <div className='App'>
      <header className='App-header'>
        <p className='title'>React 網頁讀取 CSV 格式檔案</p>
      </header>
      <CsvReader onFileUpload={handleFileUpload} />
      <div className='select-chart-container'>
        <div className='select-area'>
          <MultiLevelSelect
            options={csvData}
            handleSelectChange={setSelectedSerialNumber}
            filterKey='serial_number'
            listName='產品序號列表'
          />
          <MultiLevelSelect
            options={csvData.filter(
              (item) => item.serial_number === selectedSerialNumber
            )}
            handleSelectChange={setSelectedStationNumber}
            filterKey='station_number'
            listName='機器站點列表'
          />
          <MultiLevelSelect
            options={csvData.filter(
              (item) => item.station_number === selectedStationNumber
            )}
            handleSelectChange={setSelectedTagName}
            filterKey='tag_name'
            listName='TAG 列表'
          />
        </div>
        <LineGraph data={filteredAndSortedData} />
      </div>
      <label className='sub-title'>CSV輸出表格 : 點擊欄目可以調整排序</label>
      <CsvTable data={csvData} />
    </div>
  );
}

export default App;
