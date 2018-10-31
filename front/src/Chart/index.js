import React, { Component } from 'react';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

import { Doughnut } from 'react-chartjs-2';

import { fetchData } from '../api/methods'

var randomColor = require('randomcolor');

const Wrapper = styled.section`
    display: flex;
    flex-flow: column nowrap;
    padding: 0 20px 0 20px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    width: 450px;
    min-height: 100px;
    @media (max-width: 500px) {
        width: 300px;
    }
`;

const Title = styled.h2`
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    font-size: 18px;
    letter-spacing: 0.75px;
    text-transform: uppercase; 
`;

const Button = styled.button`
    display: inline-block;
    padding: 2px;
    margin: 2px;
    background: none;
    color: #42BA78;
    border: none;
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    font-size: 24px;
    letter-spacing: 0.75px;
    text-transform: uppercase; 
    outline: none;
    cursor: pointer;
    &:hover {
        color: black;
    } 
    &:focus {
        color: black;
    }
`;

const ChartWrapper = styled.div`
    cursor: pointer;
`;

const legendOpts = {
    display: false,
};

const opts = {
    maintainAspectRatio: false,
    tooltips: {
        xPadding: 16,
        yPadding: 8,
    }
}

let chartTitle = '';

let currId;

let prevLevel = [];

let prevLabel = [];
  
const colorScheme = {
    luminosity: 'light',
    hue: 'blue'
}

export default class Chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: this.props.type,
            data: {},
            backBtnIsShown: false
        }
        this.handleElemClick = this.handleElemClick.bind(this);
        this.handleBackBtnClick = this.handleBackBtnClick.bind(this);         
    }

    handleElemClick(elem) {
        if (elem[0] !== undefined) {
            let str = elem[0]._model.label
            let i = str.indexOf(':')
            let id = str.substring(0,i)
            let label = str.substring(i+1)
            this.setState({backBtnIsShown: true})
            prevLabel.push(chartTitle)
            prevLevel.push(currId)
            fetchData(this.state.type, id).then(fetchedData => {
                chartTitle = label
                currId = id
                let labels = fetchedData.map(item => item.id + ':' + item.name)
                let values = fetchedData.map(item => item.value)
                let backgroundColors = fetchedData.map(() => randomColor(colorScheme))
                let ids = fetchedData.map(item => item.id)
                let datasets = [{data: values, backgroundColor: backgroundColors, id: ids}]
                let data = { datasets, labels}
                this.setState({data})
                let valSum = values.reduce((acc, i) => {return acc+i}, 0)
                this.props.updateData(valSum)
                prevLabel.push(chartTitle)
                prevLevel.push(currId)
            }).catch(error => console.log(error))
        }
    }

    handleBackBtnClick() {
        prevLevel.pop()
        prevLabel.pop()
        let last = prevLevel.length
        let lastLabel = prevLabel.length
        let id = prevLevel[last-1]
        let label = prevLabel[lastLabel-1]
        fetchData(this.state.type, id).then(fetchedData => {
            chartTitle = label
            currId = id
            let labels = fetchedData.map(item => item.id + ':' + item.name)
            let values = fetchedData.map(item => item.value)
            let backgroundColors = fetchedData.map(() => randomColor(colorScheme))
            let ids = fetchedData.map(item => item.id)
            let datasets = [{data: values, backgroundColor: backgroundColors, id: ids}]
            let data = { datasets, labels}
            this.setState({data})
            let valSum = values.reduce((acc, i) => {return acc+i}, 0)
            this.props.updateData(valSum)
        }).catch(error => console.log(error))
        if (prevLevel.length === 1) {
            this.setState({backBtnIsShown: false})
            prevLabel = []
            prevLevel = []
        }
    }

    componentDidMount() {
        fetchData(this.state.type).then(fetchedData => {
            if (this.state.type === 'regional') {
                chartTitle = 'Общий бюджет Томской области'
            } else {
                chartTitle = 'Общий бюджет Томска'
            }
            currId = null
            let labels = fetchedData.map(item => item.id + ':' + item.name)
            let values = fetchedData.map(item => item.value)
            let backgroundColors = fetchedData.map(() => randomColor(colorScheme))
            let ids = fetchedData.map(item => item.id)
            let datasets = [{data: values, backgroundColor: backgroundColors, id: ids}]
            let data = { datasets, labels}
            this.setState({data})
            let valSum = values.reduce((acc, i) => {return acc+i}, 0)
            this.props.updateData(valSum)
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
            currId = null
            let labels = fetchedData.map(item => item.id + ':' + item.name)
            let values = fetchedData.map(item => item.value)
            let backgroundColors = fetchedData.map(() => randomColor(colorScheme))
            let datasets = [{data: values, backgroundColor: backgroundColors}]
            let data = { datasets, labels}
            this.setState({data})
            let valSum = values.reduce((acc, i) => {return acc+i}, 0)
            this.props.updateData(valSum)
        }).catch(error => console.log(error))
        this.setState({backBtnIsShown: false})
        prevLabel = []
        prevLevel = []
        }
      }

    render() {
        return (
            <Wrapper>
                <Header>
                    {this.state.backBtnIsShown && <Button onClick={this.handleBackBtnClick}>◀</Button>}
                    <Title>{chartTitle + ' (тыс.руб)'}</Title>
                </Header>
                <ChartWrapper>
                    <MediaQuery minDeviceWidth={1024}>
                        <Doughnut 
                            width={500} 
                            height={500} 
                            options={opts} 
                            data={this.state.data}
                            getElementAtEvent={this.handleElemClick} 
                            legend={legendOpts}
                        />
                    </MediaQuery>
                    <MediaQuery maxDeviceWidth={1023}>
                        <Doughnut 
                            width={300} 
                            height={300} 
                            options={opts} 
                            data={this.state.data}
                            getElementAtEvent={this.handleElemClick} 
                            legend={legendOpts}
                        />
                    </MediaQuery>
                    <MediaQuery maxDeviceWidth={350}>
                        <Doughnut 
                            width={150} 
                            height={150} 
                            options={opts} 
                            data={this.state.data}
                            getElementAtEvent={this.handleElemClick} 
                            legend={legendOpts}
                        />
                    </MediaQuery>
                </ChartWrapper>
            </Wrapper>
        )
    }
}