import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import Table from 'react-bootstrap/Table';

const CsvTable = (props) => {
  // 設定表格的欄位名
  const columns = useMemo(
    () => [
      {
        Header: 'Serial Number',
        accessor: 'serial_number',
      },
      {
        Header: 'Station Number',
        accessor: 'station_number',
      },
      {
        Header: 'Tag Name',
        accessor: 'tag_name',
      },
      {
        Header: 'Tag Value',
        accessor: 'tag_value',
      },
      {
        Header: 'Created Time',
        accessor: 'tag_created_at',
      },
    ],
    []
  );

  // 將 props.data 作為 data 的值傳遞給表格組件
  const data = useMemo(() => props.data, [props.data]);

  // 使用 react-table 套件來呈現表格
  const tableInstance = useTable({ columns, data }, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className='table-display'>
      {data.length ? (
        <Table striped bordered hover {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : null}
    </div>
  );
};

export default CsvTable;
