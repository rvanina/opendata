import React, { Component } from 'react';
import styled from 'styled-components';

import { Polar } from 'react-chartjs-2';

import { fetchData } from '../api/methods'

var randomColor = require('randomcolor');

const Wrapper = styled.section`
    display: flex;
    flex-flow: column nowrap;
    padding: 20px 20px 0 20px;
`;

const Title = styled.h2`
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    font-size: 14px;
    letter-spacing: 0.75px;
    text-transform: uppercase; 
    width: 300px;
`;

const legendOpts = {
    display: false,
};

const opts = {
    maintainAspectRatio: false,
}

let chartTitle = '';
  

export default class Chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: this.props.type,
            data: {},
        }
        this.handleClick = this.handleClick.bind(this);        
    }

    handleClick(elem) {
        if (elem[0] !== undefined) {
            let id = elem[0]._model.label.charAt(0)
            let label = elem[0]._model.label.substring(1)
            fetchData(this.state.type, id).then(fetchedData => {
                chartTitle = label
                let labels = fetchedData.map(item => item.id + item.name)
                let values = fetchedData.map(item => item.value)
                let backgroundColors = fetchedData.map(() => randomColor())
                let ids = fetchedData.map(item => item.id)
                let datasets = [{data: values, backgroundColor: backgroundColors, id: ids}]
                let data = { datasets, labels}
                this.setState({data})
            }).catch(error => console.log(error))
        } else {
            console.log('chart background')
        }
    }

    componentDidMount() {
        fetchData(this.state.type).then(fetchedData => {
            if (this.state.type === 'regional') {
                chartTitle = 'Общий бюджет Томской области'
            } else {
                chartTitle = 'Общий бюджет Томска'
            }
            let labels = fetchedData.map(item => item.id + item.name)
            let values = fetchedData.map(item => item.value)
            let backgroundColors = fetchedData.map(() => randomColor())
            let ids = fetchedData.map(item => item.id)
            let datasets = [{data: values, backgroundColor: backgroundColors, id: ids}]
            let data = { datasets, labels}
            this.setState({data})
        }).catch(error => console.log(error))
    }

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type) {
          fetchData(this.props.type).then(fetchedData => {
            if (this.props.type === 'regional') {
                chartTitle = 'Общий бюджет Томской области'
            } else {
                chartTitle = 'Общий бюджет Томска'
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
                <Title>{chartTitle}</Title>
                <Polar 
                    width={500} 
                    height={500} 
                    options={opts} 
                    data={this.state.data}
                    getElementAtEvent={this.handleClick} 
                    legend={legendOpts}
                />
            </Wrapper>
        )
    }
}