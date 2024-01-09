import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import Table from 'react-bootstrap/Table';

const CsvTable = (props) => {
  // 讀取並解析CSV檔案
  // const [data, setData] = useState([]);
  // const handleFileUpload = (e) => {
  //   if (!(e.target && e.target.files && e.target.files[0])) {
  //     return;
  //   }
  //   Papa.parse(e.target.files[0], {
  //     header: true,
  //     complete: (results) => {
  //       setData(results.data);
  //     },
  //   });
  // };

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
        Header: 'Tag Time',
        accessor: 'tag_created_at',
      },
      {
        Header: 'Tag Name',
        accessor: 'tag_name',
      },
      {
        Header: 'Tag Value',
        accessor: 'tag_value',
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
    <div>
      {/* <Form.Group controlId='formFile' className='mb-3'>
        <Form.Label>讀取CSV格式檔案</Form.Label>
        <Form.Control type='file' accept='.csv' onChange={handleFileUpload} />
      </Form.Group> */}
      <div className='table-display'>
        {data.length ? (
          <Table striped bordered hover {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
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
    </div>
  );
};

export default CsvTable;
