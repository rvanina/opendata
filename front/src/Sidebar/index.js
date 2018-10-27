import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.aside`
    display: flex;
    padding: 20px;
    flex-flow: column wrap;
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
`;

const Numbers = styled.div`
    display: inline-block;
    padding: 8px;
    max-width: 300px;
    background: none;
    border: none;
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    font-size: 18px;
    letter-spacing: 0.75px;
    & span {
        line-height: 32px;
        font-size: 28px;
        color: #42BA78;
        text-transform: uppercase;
    } 
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
                    {(this.state.currentType === 'regional') ? (
                        <span>{Math.round((val/REG_POP)*100/100)} тыс.руб</span>
                        ) : (
                        <span>{Math.round((val/TOMSK_POP)*100/100)} тыс.руб</span>
                        )}
                    <br/> 
                    В расчете на одного Томича
                </Numbers>
            </Wrapper>
        )
    }
}