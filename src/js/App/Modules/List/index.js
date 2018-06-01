import React, { Component } from 'react';
import { Row, Col, List, Button, Input } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../Store/Reducers/Suggestions';
import Loader from '../../../Framework/Components/Loader';

const { TextArea } = Input;

export class ParagraphList extends Component {
  state = {
    data: [],
    loading: true,
    btnLoading: -1,
  };

  componentDidMount() {
    this.getData((res) => {
      this.setState({
        loading: false,
        data: res,
      });
    });
  }

  getData = (callback) => {
    const { location: { search, state: { item } }, url } = this.props;
    fetch(search).then(() => {
      setTimeout(() => {
        callback(item.paragraphs.map(quote => ({ text: quote, customText: '', url })));
      }, 1000);
    }).catch(error => {
      console.log(error);
    });
  };

  postData = (data, callback) => {
    const { location: { search } } = this.props;
    fetch(search, {
      method: 'POST',
      body: data,
    }).then(() => {
      setTimeout(() => {
        callback();
      }, 1500);
    });
  };

  createSuggestion = (item, index) => {
    this.setState({
      btnLoading: index,
    });
    this.postData(item, () => {
      const data = [...this.state.data];
      data.splice(index, 1);
      const arrOfP = item.customText.split('\n').filter(n => (n.length > 0));
      this.props.dispatch(
        actions.addSuggestion({ ...item, customText: arrOfP.map(p => ({ text: p, approved: false })) }));
      this.setState({
        data,
        btnLoading: -1,
      });
    });
  };

  handleTextareaChange = (item, index) => {
    const data = [...this.state.data];
    data[index] = item;
    this.setState({
      data,
    });
  };

  render() {
    const { data, loading, btnLoading } = this.state;
    return (
      <div>
        <Loader show={loading} />
        <List
          itemLayout="vertical"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item actions={[
              <Button
                onClick={() => this.createSuggestion(item, index)}
                type="primary"
                icon="check-circle-o"
                disabled={!item.customText}
                loading={btnLoading === index}
              >
                Send changes
              </Button>,
            ]}>
              <List.Item.Meta
                title={'Original text:'}
                description={item.text}
              />
              <h4 className="ant-list-item-meta-title">Users version:</h4>
              <TextArea autosize={{ minRows: 2, maxRows: 4 }}
                        value={item.customText}
                        onChange={(e) => this.handleTextareaChange({ ...item, customText: e.target.value }, index)} />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    suggestions: state.suggestions,
  };
}

export default connect(mapStateToProps)(ParagraphList);
