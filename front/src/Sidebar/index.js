import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.aside`
    display: flex;
    padding: 20px;
    flex-flow: column wrap;
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
                Sidebar
                <button onClick={this.handleChangeType}>{this.state.currentType}</button>
            </Wrapper>
        )
    }
}