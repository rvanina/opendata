import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Header from './Header';
import Chart from './Chart';
import Sidebar from './Sidebar';

const ContentWrapper = styled.main`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  overflow: hidden;
  @media (max-width: 767px) {
    flex-flow: row wrap;
    align-items: center;
  }
`;

class App extends Component {
  state = {
    type: 'regional',
    value: undefined,
  }

  setDataType = (dataType) => {
    this.setState({ type: dataType });
  }

  updateData = (data) => {
    this.setState({ value: data });
  }
  render() {
    const { value, type } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>Бюджет Томска | Открытые данные 2018</title>
        </Helmet>
        <Header/>
        <div className="container">
          <ContentWrapper>
            <Sidebar setDataType={this.setDataType} data={value} />
            <Chart type={type} updateData={this.updateData} />
          </ContentWrapper>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
