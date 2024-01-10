import React from 'react';
import { FixedSizeList as List } from 'react-window';
const MultiLevelSelect = ({
  options,
  handleSelectChange,
  filterKey,
  listName,
}) => {
  const uniqueOptions = Array.from(
    new Set(options.map((item) => item[filterKey]))
  ).map((option) => ({
    value: option,
    label: option,
  }));

  const ListItem = ({ index }) => (
    <option onClick={() => handleSelectChange(uniqueOptions[index].value)}>
      {uniqueOptions[index].label}
    </option>
  );

  return (
    <div className='list-container'>
      <label>{listName}</label>
      <List
        height={150}
        itemCount={uniqueOptions.length}
        itemSize={35}
        width={300}
      >
        {ListItem}
      </List>
    </div>
  );
};

export default MultiLevelSelect;
