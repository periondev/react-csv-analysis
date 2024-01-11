import React, { useState } from 'react';
import { FixedSizeList as List } from 'react-window';

const MultiLevelSelect = ({
  options,
  handleSelectChange,
  filterKey,
  listName,
}) => {
  // 設定選取樣式
  const [selectedOption, setSelectedOption] = useState(null);

  // 列表選取操作
  const handleItemClick = (value) => {
    setSelectedOption(value);
    handleSelectChange(value);
  };

  // 過濾列表重複選項
  const uniqueOptions = Array.from(
    new Set(options.map((item) => item[filterKey]))
  ).map((option) => ({
    value: option,
    label: option,
  }));

  // 列表選項
  const Row = ({ index }) => (
    <div
      className={`list-item ${
        uniqueOptions[index].value === selectedOption ? 'selected' : ''
      }`}
      onClick={() => handleItemClick(uniqueOptions[index].value)}
    >
      {uniqueOptions[index].label}
    </div>
  );

  return (
    <div className='list-container'>
      <label className='list-label'>{listName}</label>
      <List
        height={376}
        itemCount={uniqueOptions.length}
        itemSize={35}
        width={100}
      >
        {Row}
      </List>
    </div>
  );
};

export default MultiLevelSelect;
