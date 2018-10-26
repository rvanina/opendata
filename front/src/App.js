import React, { Component } from 'react';
import Helmet from 'react-helmet'

import Header from './Header';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Бюджет Томска | Открытые данные 2018</title>
        </Helmet>
        <Header/>
      </React.Fragment>
    );
  }
}

export default App;
