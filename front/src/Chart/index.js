import React, { Component } from 'react';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

import { Doughnut } from 'react-chartjs-2';

import { fetchData } from '../api/methods'

let randomColor = require('randomcolor');

const Wrapper = styled.section`
    display: flex;
    flex-flow: column nowrap;
    padding: 0 20px 0 20px;
    align-items: center;
`;

const History = styled.div`
    display: flex;
    flex-flow: row wrap;
    font-size: 12px;
    line-height: 14px;
    color: #ffffff;
    width: 800px;
    @media (max-width: 1024px) {
        width: 500px;
    }
    @media (max-width: 768px) {
        width: 450px;
    }
`;

const HistoryItem = styled.div`
    display: inline-block;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: #42BA78;
    padding: 2px 4px 2px 2px;
    cursor: pointer;
    &:nth-child(2n) {
        background #000000;
    }
    &:hover {
        opacity: 0.6;
    }
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
        enabled: false,

        custom: function(tooltipModel) {
            let tooltipEl = document.getElementById('chartjs-tooltip');

            if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.id = 'chartjs-tooltip';
                tooltipEl.innerHTML = "<section></section>";
                document.body.appendChild(tooltipEl);
            }

            if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
            }

            tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
                tooltipEl.classList.add('no-transform');
            }

            function getBody(bodyItem) {
                return bodyItem.lines;
            }

            if (tooltipModel.body) {
                let titleLines = tooltipModel.title || [];
                let bodyLines = tooltipModel.body.map(getBody);

                let innerHtml = '<header>';

                titleLines.forEach(function(title) {
                    innerHtml += '<span>' + title + '</span>';
                });
                let style = 'background: #000000;';
                style += 'box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2), 0px 1px 18px rgba(0, 0, 0, 0.12), 0px 6px 10px rgba(0, 0, 0, 0.14);';
                style += 'border: 1px solid #000000;';
                style += 'border-radius: 4px;';
                style += 'display: flex;';
                style += 'flex-flow: column nowrap;';
                style += 'max-width: 250px;';
                style += 'opacity: 0.85;';
                style += 'padding: 4px 8px;';
                style += 'font-family: Roboto;';
                style += 'font-size: 14px;';
                style += 'line-height: 16px;';
                style += 'color: #ffffff';
                innerHtml += '</header><div style="' + style + '" >';

                bodyLines.forEach(function(body, i) {
                    body = String(body)
                    let delim1 = body.indexOf(':');
                    let id = body.substring(0, delim1);
                    let delim2 = body.lastIndexOf(':');
                    let main = body.substring(delim1 + 1, delim2);
                    let value = body.substring(delim2 + 1);
                    innerHtml += '<div style="padding: 4px 0 16px 0;"><span style="letter-spacing: 1.15px; font-weight: 500;">id: </span>' + id + '</div>';
                    innerHtml += '<div style="padding: 0 0 16px 0;">' + main + '</div>';
                    innerHtml += '<div style="padding: 0 0 4px 0; letter-spacing: 1.15px; font-weight: 500;">' + value + ' тыс.руб </div>';
                });
                innerHtml += '</div>';

                let tooltipRoot = tooltipEl.querySelector('section');
                tooltipRoot.innerHTML = innerHtml;
            }

            let position = this._chart.canvas.getBoundingClientRect();

            tooltipEl.style.opacity = 1;
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
            tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
            tooltipEl.style.pointerEvents = 'none';
        }
    },
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
        this.handleHistoryElemClick = this.handleHistoryElemClick.bind(this);         
    }

    handleElemClick(elem) {
        if (elem[0] !== undefined) {
            let str = elem[0]._model.label
            let i = str.indexOf(':')
            let id = str.substring(0,i)
            let label = str.substring(i+1)
            this.setState({backBtnIsShown: true})
            fetchData(this.state.type, id).then(fetchedData => {
                chartTitle = label
                currId = id
                prevLabel.push(chartTitle)
                prevLevel.push(currId)
                let labels = fetchedData.map(item => item.id + ':' + item.name)
                let values = fetchedData.map(item => item.value)
                let backgroundColors = fetchedData.map(() => randomColor(colorScheme))
                let ids = fetchedData.map(item => item.id)
                let datasets = [{data: values, backgroundColor: backgroundColors, id: ids}]
                let data = { datasets, labels}
                // this.setState({data})
                if (values.length) {
                    this.setState({data})
                } else {
                    prevLevel.pop()
                    prevLabel.pop()
                    let last = prevLevel.length-1
                    let lastLabel = prevLabel.length-1
                    let id = prevLevel[last]
                    let label = prevLabel[lastLabel]
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
                }
                let valSum = values.reduce((acc, i) => {return acc+i}, 0)
                this.props.updateData(valSum)
            }).catch(error => console.log(error))
        }
    }

    handleBackBtnClick() {
        prevLevel.pop()
        prevLabel.pop()
        let last = prevLevel.length-1
        let lastLabel = prevLabel.length-1
        let id = prevLevel[last]
        let label = prevLabel[lastLabel]
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
        }
    }

    handleHistoryElemClick(idOfElem) {
        let currElem = prevLevel.indexOf(idOfElem)
        let lastElem = prevLevel.length - 1
        let diff = lastElem - currElem
        while (diff > 0) {
            prevLevel.pop()
            prevLabel.pop()
            diff = diff - 1
        }
        let last = prevLevel.length-1
        let lastLabel = prevLabel.length-1
        let id = prevLevel[last]
        let label = prevLabel[lastLabel]
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
            prevLabel.push(chartTitle)
            prevLevel.push(currId)
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
            prevLabel = []
            prevLevel = []
            prevLabel.push(chartTitle)
            prevLevel.push(currId)
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
        }
      }

    render() {
        return (
            <Wrapper>
                <History>
                    {prevLabel.map((item, i) => (
                        <HistoryItem key={i} onClick={() => (this.handleHistoryElemClick(prevLevel[i]))}>{item}</HistoryItem>
                    ))}
                </History>
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
                    {/* <MediaQuery maxDeviceWidth={576}>
                        <Doughnut 
                            width={150} 
                            height={150} 
                            options={opts} 
                            data={this.state.data}
                            getElementAtEvent={this.handleElemClick} 
                            legend={legendOpts}
                        />
                    </MediaQuery> */}
                </ChartWrapper>
            </Wrapper>
        )
    }
}