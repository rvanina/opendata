import React, { Component } from 'react';
import styled from 'styled-components';

import { Polar } from 'react-chartjs-2';

import { fetchData } from '../api/methods'

var randomColor = require('randomcolor');

const Wrapper = styled.section`
    display: flex;
    padding: 20px 20px 0 20px;
`;

const legendOpts = {
    display: false,
};

let opts = {
    maintainAspectRatio: false,
    title: {
        display: true,
        text: 'Общий бюджет'
    }
}
  

export default class Chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: this.props.type,
            data: {},
        }        
    }

    componentDidMount() {
        fetchData(this.state.type).then(fetchedData => {
            if (this.state.type === 'regional') {
                opts.title.text = 'Общий бюджет Томской области'
            } else {
                opts.title.text = 'Общий бюджет Томска'
            }
            let labels = fetchedData.map(item => item.name)
            let values = fetchedData.map(item => item.value)
            let backgroundColors = fetchedData.map(() => randomColor())
            let datasets = [{data: values, backgroundColor: backgroundColors}]
            let data = { datasets, labels}
            this.setState({data})
        }).catch(error => console.log(error))
    }

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type) {
          fetchData(this.props.type).then(fetchedData => {
            if (this.props.type === 'regional') {
                opts.title.text = 'Общий бюджет Томской области'
            } else {
                opts.title.text = 'Общий бюджет Томска'
            }
            let labels = fetchedData.map(item => item.name)
            let values = fetchedData.map(item => item.value)
            let backgroundColors = fetchedData.map(() => randomColor())
            let datasets = [{data: values, backgroundColor: backgroundColors}]
            let data = { datasets, labels}
            this.setState({data})
        }).catch(error => console.log(error))
        }
      }

    render() {
        return (
            <Wrapper>
                <Polar 
                    width={500} 
                    height={500} 
                    options={opts} 
                    data={this.state.data}
                    getElementAtEvent={elem => console.log(elem)} 
                    legend={legendOpts}
                />
            </Wrapper>
        )
    }
}