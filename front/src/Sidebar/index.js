import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.aside`
  display: flex;
  padding: 8px;
  flex-flow: column wrap;
  border: 8px solid #42ba78;
`;

const Button = styled.button`
  display: inline-block;
  padding: 8px;
  min-width: 300px;
  background: #42ba78;
  color: #ffffff;
  border: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  font-size: 18px;
  letter-spacing: 0.75px;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
  &:hover {
    background: black;
  }
  &:focus {
    background: black;
  }
  @media (max-width: 767px) {
    max-width: 300px;
    min-width: 0;
  }
`;

const InfoBlock = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 8px 8px 16px 8px;
  max-width: 300px;
  background: none;
  border: none;
  border-bottom: 4px solid #42ba78;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  font-size: 18px;
  letter-spacing: 0.75px;
  margin: 0 0 16px 0;
  &:first-child {
    padding-top: 16px;
  }
  ${props =>
    props.noBottomLine && css`
      border-bottom: none;
    `};
`;

const Cost = styled.span`
  line-height: 32px;
  font-size: 28px;
  color: #42ba78;
  text-transform: uppercase;
`;

const TOMSK_POP = 595.2;

const REG_POP = 1078.3;

export default class Sidebar extends Component {
  state = {
    currentType: 'regional',
    nextType: 'municipal',
  };

  handleChangeType = () => {
    const { setDataType } = this.props;
    const { nextType, currentType } = this.state;
    setDataType(nextType);
    this.setState({
      currentType: nextType,
      nextType: currentType,
    });
  };

  render() {
    const { data } = this.props;
    const { currentType } = this.state;

    const val = data;

    return (
      <Wrapper>
        <Button onClick={this.handleChangeType}>
          {currentType === 'regional' ? 'Томская область' : 'Томск'}
        </Button>
        <br />
        <InfoBlock>
          <Cost>{Math.round(val)} тыс.руб</Cost>
          Всего
        </InfoBlock>
        <InfoBlock>
          {currentType === 'regional' ? (
            <Cost>{Math.round(((val / REG_POP) * 100) / 100)} тыс.руб</Cost>
          ) : (
            <Cost>{Math.round(((val / TOMSK_POP) * 100) / 100)} тыс.руб</Cost>
          )}
          {currentType === 'regional'
            ? 'На одного жителя Томской области'
            : 'На одного Томича'}
        </InfoBlock>
        <InfoBlock noBottomLine>
          Проект "Бюджет Томска" - простая и удобная визуализация статей
          расходов бюджета Томска и Томской области. Использованы данные из
          открытых источников.
        </InfoBlock>
      </Wrapper>
    );
  }
}
