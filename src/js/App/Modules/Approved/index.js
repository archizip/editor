import React, { Component } from 'react';
import { Icon, Card } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../Store/Reducers/Suggestions';

export class ApprovedSuggestions extends Component {

  approve = (item, textID, index) => {
    const text = [...item.customText];
    text[textID].approved = !text[textID].approved;
    this.props.dispatch(actions.approveSuggestion({ ...item, customText: text, index }, true));
  };

  render() {
    const { suggestions: { approvedSuggestion } } = this.props;
    return (
      <div>
        {approvedSuggestion.map((suggestion, index) => (
          <Card
            key={index}
            title={<div className="card-title"><span>Original text:</span>{suggestion.text}</div>}
          >
            <div className="content-title">
              User suggestions:
            </div>
            <ul>
              {
                suggestion.customText.map((p, id) => (
                  <li key={id}>
                    {p.text}
                    {p.approved ? <Icon type="check-circle-o" onClick={() => this.approve(suggestion, id, index)} />
                      : <Icon type="minus-circle" onClick={() => this.approve(suggestion, id, index)} />}
                  </li>
                ))
              }
            </ul>
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

export default withRouter(connect(mapStateToProps)(ApprovedSuggestions));
