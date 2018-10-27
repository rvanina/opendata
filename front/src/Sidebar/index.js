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

export default class Sidebar extends Component {
    state = {
        currentType: 'regional',
        nextType: 'municipal'
    }

    handleChangeType = () => {
        this.props.setDataType(this.state.nextType)
        this.setState({currentType: this.state.nextType, 
            nextType: this.state.currentType
        })
    }

    render() {
        return (
            <Wrapper>
                <Button onClick={this.handleChangeType}>
                    {(this.state.currentType === 'regional') ? (
                        'Томская область'
                     ) : (
                        'Томск'
                     )}
                </Button>
            </Wrapper>
        )
    }
}