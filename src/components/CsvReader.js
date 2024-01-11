import React from 'react';
import Form from 'react-bootstrap/Form';

const CsvReader = (props) => {
  const { onFileUpload } = props;

  const handleFileInput = (e) => {
    // 若取消上傳檔案則返回
    if (!(e.target && e.target.files && e.target.files[0])) {
      return;
    }
    onFileUpload(e.target.files[0]);
  };

  return (
    <div>
      <Form.Group controlId='formFile' className='mb-3'>
        <Form.Label>選擇CSV格式檔案</Form.Label>
        <Form.Control type='file' accept='.csv' onChange={handleFileInput} />
      </Form.Group>
    </div>
  );
};

export default CsvReader;
