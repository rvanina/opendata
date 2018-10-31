import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Header from './Header';
import Chart from './Chart';
import Sidebar from './Sidebar';

const ContentWrapper = styled.main`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

class App extends Component {
  state = {
    type: 'regional',
    value: undefined
  }

  setDataType = (dataType) => {
    this.setState({ type: dataType })
  }

  updateData = (data) => {
    this.setState({value: data})
  }
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Бюджет Томска | Открытые данные 2018</title>
        </Helmet>
        <Header/>
        <div className="container">
          <ContentWrapper>
            <Sidebar setDataType={this.setDataType} data={this.state.value} />
            <Chart type={this.state.type} updateData={this.updateData}/>
          </ContentWrapper>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
