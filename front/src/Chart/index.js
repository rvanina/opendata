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

const Header = styled.div`
    display: flex;
    width: 300px;
`;

const Title = styled.h2`
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    font-size: 14px;
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
    line-height: 20px;
    font-size: 18px;
    letter-spacing: 0.75px;
    text-transform: uppercase; 
`;

const ChartWrapper = styled.div`
    cursor: pointer;
`;

const legendOpts = {
    display: false,
};

const opts = {
    maintainAspectRatio: false,
}

let chartTitle = '';

let currId = null;

let prevLevel = [];

let prevLabel = [];
  

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
            let id = elem[0]._model.label.charAt(0)
            let label = elem[0]._model.label.substring(1)
            this.setState({backBtnIsShown: true})
            prevLabel.push(chartTitle)
            prevLevel.push(currId)
            fetchData(this.state.type, id).then(fetchedData => {
                chartTitle = label
                prevLabel.push(chartTitle)
                currId = id
                prevLevel.push(currId)
                let labels = fetchedData.map(item => item.id + item.name)
                let values = fetchedData.map(item => item.value)
                let backgroundColors = fetchedData.map(() => randomColor())
                let ids = fetchedData.map(item => item.id)
                let datasets = [{data: values, backgroundColor: backgroundColors, id: ids}]
                let data = { datasets, labels}
                this.setState({data})
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
            let labels = fetchedData.map(item => item.id + item.name)
            let values = fetchedData.map(item => item.value)
            let backgroundColors = fetchedData.map(() => randomColor())
            let ids = fetchedData.map(item => item.id)
            let datasets = [{data: values, backgroundColor: backgroundColors, id: ids}]
            let data = { datasets, labels}
            this.setState({data})
        }).catch(error => console.log(error))
        if (prevLabel.length === 1) {
            this.setState({backBtnIsShown: false})
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
                prevLabel.push(chartTitle)
            } else {
                chartTitle = 'Общий бюджет Томска'
                prevLabel.push(chartTitle)
            }
            let labels = fetchedData.map(item => item.name)
            let values = fetchedData.map(item => item.value)
            let backgroundColors = fetchedData.map(() => randomColor())
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
                    <Title>{chartTitle + '(тыс.руб)'}</Title>
                </Header>
                <ChartWrapper>
                    <Polar 
                        width={500} 
                        height={500} 
                        options={opts} 
                        data={this.state.data}
                        getElementAtEvent={this.handleElemClick} 
                        legend={legendOpts}
                    />
                </ChartWrapper>
            </Wrapper>
        )
    }
}