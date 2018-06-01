import React, { Component } from 'react';
import { Menu, Row, Col, Layout, Badge, Switch as AntSwitch, Icon } from 'antd';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { validateUrl } from '../../../Framework/Support/reqex';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Suggestions from '../Suggestions';
import ApprovedSuggestions from '../Approved';
import NotFound from '../404';
import ParagraphList from '../List';
import Articles from '../Articles';

const { Header, Content } = Layout;

export class Home extends Component {

  renderSwitch = () => {
    const { suggestions: { approvedSuggestion }, location } = this.props;
    if (location.pathname === '/results') {
      return (
        <div className="show-approved">
          Show approved paragraphs
          <AntSwitch
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="cross" />}
            onChange={this.onChange}
            disabled={approvedSuggestion.length === 0}
          />
          <Badge showZero count={approvedSuggestion.length} />
        </div>
      );
    }
  };

  onChange = (checked) => {
    const { history } = this.props;
    history.push({
      pathname: '/results',
      search: checked ? '?showApproved=true' : '',
    });
  };

  render() {
    const { suggestions: { userSuggestions }, location } = this.props;
    const activeTab = location.pathname === '/' ? '1' : '2';
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo">
            {this.renderSwitch()}
          </div>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={[activeTab]}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Link to="/">List of articles</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/results">
                Users Suggestions<Badge showZero count={userSuggestions.length} />
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Row>
            <Col span={12} offset={6}>
              <Switch>
                <Route exact path="/" component={Articles} />
                <Route exact path='/fb' render={props => {
                  const params = new URLSearchParams(props.location.search);
                  const articleURL = params.get('articleURL');
                  return validateUrl(articleURL) ? <ParagraphList url={articleURL} {...props} /> : <Redirect to="/" />;
                }} />
                <Route path='/results' render={props => {
                  const params = new URLSearchParams(props.location.search);
                  const showApproved = params.get('showApproved');
                  return showApproved ? <ApprovedSuggestions /> : <Suggestions />;
                }} />
                <Route component={NotFound} />
              </Switch>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    suggestions: state.suggestions,
  };
}

export default withRouter(connect(mapStateToProps)(Home));
