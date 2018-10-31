import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.aside`
    display: flex;
    padding: 8px;
    flex-flow: column wrap;
    border: 8px solid #42BA78;
`;

const Button = styled.button`
    display: inline-block;
    padding: 8px;
    min-width: 300px;
    background: #42BA78;
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
    &:hover {
        background: black;
    } 
`;

const Numbers = styled.div`
    display: flex;
    flex-flow: column nowrap;
    padding: 8px 8px 16px 8px;
    max-width: 300px;
    background: none;
    border: none;
    border-bottom: 4px solid #42BA78;
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
`;

const Cost = styled.span`
    line-height: 32px;
    font-size: 28px;
    color: #42BA78;
    text-transform: uppercase;
`;

const TOMSK_POP = 595.2;

const REG_POP = 1078.3;

export default class Sidebar extends Component {
    state = {
        currentType: 'regional',
        nextType: 'municipal',
        value: undefined
    }

    handleChangeType = () => {
        this.props.setDataType(this.state.nextType)
        this.setState({currentType: this.state.nextType, 
            nextType: this.state.currentType
        })
    }

    render() {

        let val = this.props.data

        return (
            <Wrapper>
                <Button onClick={this.handleChangeType}>
                    {(this.state.currentType === 'regional') ? (
                        'Томская область'
                     ) : (
                        'Томск'
                    )}
                </Button>
                <br/>
                <Numbers>
                    <Cost>{Math.round(val)} тыс.руб</Cost>
                    Всего
                </Numbers>
                <Numbers>
                    {(this.state.currentType === 'regional') ? (
                        <Cost>{Math.round((val/REG_POP)*100/100)} тыс.руб</Cost>
                        ) : (
                        <Cost>{Math.round((val/TOMSK_POP)*100/100)} тыс.руб</Cost>
                    )}
                    {(this.state.currentType === 'regional') ? (
                        'На одного жителя Томской области'
                        ) : (
                        'На одного Томича'
                    )}
                </Numbers>
            </Wrapper>
        )
    }
}