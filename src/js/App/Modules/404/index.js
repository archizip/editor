import React, { Component } from 'react';
import { Row, Col } from 'antd';

export default class NotFound extends Component {
  render() {
    return (
      <Row>
        <Col span={12} offset={6}>
          <div className="hero-text">
            <div className="hero-text-brand">404. Page Not Found.</div>
          </div>
        </Col>
      </Row>
    );
  }
}
