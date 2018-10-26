import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Header from './Header';
import Chart from './Chart';
import Sidebar from './Sidebar';

const ContentWrapper = styled.main`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
`;

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Бюджет Томска | Открытые данные 2018</title>
        </Helmet>
        <Header/>
        <ContentWrapper>
          <Sidebar/>
          <Chart/>
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default App;
