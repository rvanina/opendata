import React, { Component } from 'react';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

import { Doughnut } from 'react-chartjs-2';

import { fetchData } from '../api/methods';

const randomColor = require('randomcolor');

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
  color: #42ba78;
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

    custom: function (tooltipModel) {
      let tooltipEl = document.getElementById('chartjs-tooltip');

      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.innerHTML = '<section></section>';
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
        const titleLines = tooltipModel.title || [];
        const bodyLines = tooltipModel.body.map(getBody);

        let innerHtml = '<header>';

        titleLines.forEach((title) => {
          innerHtml += `<span>${title}</span>`;
        });
        let style = 'background: #000000;';
        style += 'box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2),';
        style += '0px 1px 18px rgba(0, 0, 0, 0.12),';
        style += '0px 6px 10px rgba(0, 0, 0, 0.14);';
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
        innerHtml += `</header><div style="${style}" >`;

        bodyLines.forEach((body) => {
          const strBody = String(body);
          const delim1 = strBody.indexOf(':');
          const id = strBody.substring(0, delim1);
          const delim2 = strBody.lastIndexOf(':');
          const main = strBody.substring(delim1 + 1, delim2);
          const value = strBody.substring(delim2 + 1);
          innerHtml += '<div style="padding: 4px 0 16px 0;">';
          innerHtml += '<span style="letter-spacing: 1.15px; font-weight: 500;">id: </span>';
          innerHtml += `${id}</div>`;
          innerHtml += `<div style="padding: 0 0 16px 0;">${main}</div>`;
          innerHtml += '<div style="padding: 0 0 4px 0;';
          innerHtml += 'letter-spacing: 1.15px; font-weight: 500;">';
          innerHtml += `${value} тыс.руб </div>`;
        });
        innerHtml += '</div>';

        const tooltipRoot = tooltipEl.querySelector('section');
        tooltipRoot.innerHTML = innerHtml;
      }

      const position = this._chart.canvas.getBoundingClientRect();

      let incrX = 0;
      let incrY = 0;

      tooltipEl.style.opacity = 1;
      tooltipEl.style.position = 'absolute';
      if (tooltipModel.caretX > 260) {
        incrX -= 260;
      }
      if (tooltipModel.caretY > 320) {
        incrY -= 160;
      }
      tooltipEl.style.left = `${position.left + window.pageXOffset + tooltipModel.caretX + incrX}px`;
      tooltipEl.style.top = `${position.top + window.pageYOffset + tooltipModel.caretY + incrY}px`;
      tooltipEl.style.pointerEvents = 'none';
    },
  },
};

let chartTitle = '';

let currId;

let prevLevel = [];

let prevLabel = [];

const colorScheme = {
  luminosity: 'light',
  hue: 'blue',
};

export default class Chart extends Component {
  constructor(props) {
    super(props);

    const { type } = this.props;

    this.state = {
      type,
      data: {},
      backBtnIsShown: false,
    };
    this.handleElemClick = this.handleElemClick.bind(this);
    this.handleBackBtnClick = this.handleBackBtnClick.bind(this);
    this.handleHistoryElemClick = this.handleHistoryElemClick.bind(this);
  }

  componentDidMount() {
    const { type } = this.state;
    const { updateData } = this.props;
    fetchData(type)
      .then((fetchedData) => {
        if (type === 'regional') {
          chartTitle = 'Общий бюджет Томской области';
        } else {
          chartTitle = 'Общий бюджет Томска';
        }
        currId = null;
        prevLabel.push(chartTitle);
        prevLevel.push(currId);
        const labels = fetchedData.map(item => `${item.id}:${item.name}`);
        const values = fetchedData.map(item => item.value);
        const backgroundColors = fetchedData.map(() => randomColor(colorScheme));
        const ids = fetchedData.map(item => item.id);
        const datasets = [
          { data: values, backgroundColor: backgroundColors, id: ids },
        ];
        const data = { datasets, labels };
        this.setState({ data });
        const valSum = values.reduce((acc, i) => (acc + i), 0);
        updateData(valSum);
      })
      .catch(error => console.log(error));
  }

  componentDidUpdate(prevProps) {
    const { type, updateData } = this.props;
    if (type !== prevProps.type) {
      fetchData(type)
        .then((fetchedData) => {
          if (type === 'regional') {
            chartTitle = 'Общий бюджет Томской области';
          } else {
            chartTitle = 'Общий бюджет Томска';
          }
          currId = null;
          prevLabel = [];
          prevLevel = [];
          prevLabel.push(chartTitle);
          prevLevel.push(currId);
          const labels = fetchedData.map(item => `${item.id}:${item.name}`);
          const values = fetchedData.map(item => item.value);
          const backgroundColors = fetchedData.map(() => randomColor(colorScheme));
          const datasets = [{ data: values, backgroundColor: backgroundColors }];
          const data = { datasets, labels };
          this.setState({ data });
          const valSum = values.reduce((acc, i) => acc + i, 0);
          updateData(valSum);
        })
        .catch(error => console.log(error));
      this.setState({ backBtnIsShown: false });
    }
  }

  handleElemClick(elem) {
    const { type } = this.state;
    const { updateData } = this.props;
    if (elem[0] !== undefined) {
      const str = elem[0]._model.label;
      const i = str.indexOf(':');
      const id = str.substring(0, i);
      const label = str.substring(i + 1);
      this.setState({ backBtnIsShown: true });
      fetchData(type, id)
        .then((fetchedData) => {
          const values = fetchedData.map(item => item.value);
          if (values.length) {
            const labels = fetchedData.map(item => `${item.id}:${item.name}`);
            const backgroundColors = fetchedData.map(() => randomColor(colorScheme));
            const ids = fetchedData.map(item => item.id);
            const datasets = [
              { data: values, backgroundColor: backgroundColors, id: ids },
            ];
            const data = { datasets, labels };
            this.setState({ data });
            chartTitle = label;
            currId = id;
            prevLabel.push(chartTitle);
            prevLevel.push(currId);
            const valSum = values.reduce((acc, count) => acc + count, 0);
            updateData(valSum);
          }
        })
        .catch(error => console.log(error));
    }
  }

  handleBackBtnClick() {
    const { type } = this.state;
    const { updateData } = this.props;
    prevLevel.pop();
    prevLabel.pop();
    const last = prevLevel.length - 1;
    const lastLabel = prevLabel.length - 1;
    const id = prevLevel[last];
    const label = prevLabel[lastLabel];
    fetchData(type, id)
      .then((fetchedData) => {
        chartTitle = label;
        currId = id;
        const labels = fetchedData.map(item => `${item.id}:${item.name}`);
        const values = fetchedData.map(item => item.value);
        const backgroundColors = fetchedData.map(() => randomColor(colorScheme));
        const ids = fetchedData.map(item => item.id);
        const datasets = [
          { data: values, backgroundColor: backgroundColors, id: ids },
        ];
        const data = { datasets, labels };
        this.setState({ data });
        const valSum = values.reduce((acc, i) => acc + i, 0);
        updateData(valSum);
      })
      .catch(error => console.log(error));
    if (prevLevel.length === 1) {
      this.setState({ backBtnIsShown: false });
    }
  }

  handleHistoryElemClick(idOfElem) {
    const { type } = this.state;
    const { updateData } = this.props;
    const currElem = prevLevel.indexOf(idOfElem);
    const lastElem = prevLevel.length - 1;
    let diff = lastElem - currElem;
    while (diff > 0) {
      prevLevel.pop();
      prevLabel.pop();
      diff -= 1;
    }
    const last = prevLevel.length - 1;
    const lastLabel = prevLabel.length - 1;
    const id = prevLevel[last];
    const label = prevLabel[lastLabel];
    fetchData(type, id)
      .then((fetchedData) => {
        chartTitle = label;
        currId = id;
        const labels = fetchedData.map(item => `${item.id}:${item.name}`);
        const values = fetchedData.map(item => item.value);
        const backgroundColors = fetchedData.map(() => randomColor(colorScheme));
        const ids = fetchedData.map(item => item.id);
        const datasets = [
          { data: values, backgroundColor: backgroundColors, id: ids },
        ];
        const data = { datasets, labels };
        this.setState({ data });
        const valSum = values.reduce((acc, i) => acc + i, 0);
        updateData(valSum);
      })
      .catch(error => console.log(error));
    if (prevLevel.length === 1) {
      this.setState({ backBtnIsShown: false });
    }
  }


  render() {
    const { backBtnIsShown, data } = this.state;
    return (
      <Wrapper>
        <History>
          {prevLabel.map((item, i) => (
            <HistoryItem
              key={item}
              onClick={() => this.handleHistoryElemClick(prevLevel[i])}
            >
              {item}
            </HistoryItem>
          ))}
        </History>
        <Header>
          {backBtnIsShown && (
            <Button onClick={this.handleBackBtnClick}>◀</Button>
          )}
          <Title>{`${chartTitle} (тыс.руб)`}</Title>
        </Header>
        <ChartWrapper>
          <MediaQuery minDeviceWidth={1024}>
            <Doughnut
              width={500}
              height={500}
              options={opts}
              data={data}
              getElementAtEvent={this.handleElemClick}
              legend={legendOpts}
            />
          </MediaQuery>
          <MediaQuery maxDeviceWidth={1023}>
            <Doughnut
              width={300}
              height={300}
              options={opts}
              data={data}
              getElementAtEvent={this.handleElemClick}
              legend={legendOpts}
            />
          </MediaQuery>
        </ChartWrapper>
      </Wrapper>
    );
  }
}
