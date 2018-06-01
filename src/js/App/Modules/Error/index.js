import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

export class Error extends Component {
  render() {
    return (
      <Row className="hero">
        <Col span={12} offset={6}>
          <div className="hero-text">
            <div className="hero-text-brand">Incorrect url</div>
          </div>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    suggestions: state.suggestions,
  };
}

export default connect(mapStateToProps)(Error);
