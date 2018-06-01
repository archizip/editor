import React from 'react';
import { Spin } from 'antd';

export default (props) => {
  return (
    props.show ? <div className="loader-content">
      <Spin size='large' tip="Loading..." />
    </div> : null
  );
}
