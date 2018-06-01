import React, { Component } from 'react';
import { List, Icon } from 'antd';

const data = [
  {
    title: 'Sport',
    icon: 'rocket',
    description: '',
    url: 'http://sport.com/article/123',
    paragraphs: [
      'Rafael Nadals secret weapon? The sea',
      'Serena Williams turns heads in grand slam comeback',
      'Japan star Nakata reveals the secret to his success',
      'Subtropical storm hampers US Open prep',
    ],
  },
  {
    title: 'Media',
    icon: 'video-camera',
    description: '',
    url: 'http://media.com/article/123',
    paragraphs: [
      'Never Mind the News Media: Politicians Test Direct-to-Voter Messaging',
      'Blurred Lines Between Journalists and What We Cover',
      'The Journalist and the Equestrian',
    ],
  },
  {
    title: 'IT',
    icon: 'code',
    description: '',
    url: 'http://it.com/article/123',
    paragraphs: [
      'WWDC 2018: WHAT TO EXPECT FROM APPLE’S BIG EVENT',
      'THE WD BLACK 3D, OUR FAVORITE NVME SSD, DROPS UNDER $100 IN AN UNPRECEDENTED SALE',
      'IOS 12: DIGITAL HEALTH FEATURES AND ARKIT IMPROVEMENTS EXPECTED',
    ],
  },
  {
    title: 'Technology',
    icon: 'tablet',
    description: '',
    url: 'http://technology.com/article/123',
    paragraphs: [
      'WWDC 2018: WHAT TO EXPECT FROM APPLE’S BIG EVENT',
      'THE WD BLACK 3D, OUR FAVORITE NVME SSD, DROPS UNDER $100 IN AN UNPRECEDENTED SALE',
      'IOS 12: DIGITAL HEALTH FEATURES AND ARKIT IMPROVEMENTS EXPECTED',
    ],
  },
];

export default class Articles extends Component {

  handleClick = (item) => {
    const { history } = this.props;
    history.push({
      pathname: '/fb',
      search: `?articleURL=${item.url}`,
      state: { item },
    });
  };

  render() {
    return (
      <div>
        <h3>Please choose one of article:</h3>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item onClick={() => this.handleClick(item)}>
              <List.Item.Meta
                title={<span><Icon type={item.icon} />{item.title}</span>}
                description="Fancy description"
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
