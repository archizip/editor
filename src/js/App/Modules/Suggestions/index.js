import React, { Component } from 'react';
import { Icon, Input, Card, Switch } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../Store/Reducers/Suggestions';

export class Suggestions extends Component {

  deleteSuggestion = (index) => {
    this.props.dispatch(actions.removeSuggestion(index));
  };

  approve = (item, textID, index, input = false) => {
    const text = [...item.customText];
    input ? text.push({ text: item.inputValue, approved: true }) : text[textID].approved = true;
    this.props.dispatch(actions.approveSuggestion({ ...item, customText: text }));
    this.props.dispatch(actions.removeSuggestion(index));
  };

  handleInputChange = (item, index) => {
    this.props.dispatch(actions.addSuggestion({ ...item, index }, true));
  };

  render() {
    const { suggestions: { userSuggestions } } = this.props;
    return (
      <div>
        {userSuggestions.map((suggestion, index) => (
          <Card
            key={index}
            title={<div className="card-title"><span>Original text:</span>{suggestion.text}</div>}
            extra={<Icon type="delete" onClick={this.deleteSuggestion} />}
          >
            <div className="content-title">
              User suggestions:
            </div>
            <ul>
              {
                suggestion.customText.map((p, id) => (
                  <li key={id}>
                    {p.text}
                    <Icon type="check-circle-o" onClick={() => this.approve(suggestion, id, index)} />
                  </li>
                ))
              }
            </ul>
            <Input value={suggestion.inputValue}
                   onChange={(e) => this.handleInputChange({ ...suggestion, inputValue: e.target.value }, index)}
                   placeholder="Enter your own suggestion" />
            <Icon type="check-circle-o" onClick={() => this.approve(suggestion, -1, index, true)} />
          </Card>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    suggestions: state.suggestions,
  };
}

export default withRouter(connect(mapStateToProps)(Suggestions));
