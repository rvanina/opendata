import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.aside`
    display: flex;
    padding: 20px;
    flex-flow: row wrap;
`;

export default class Sidebar extends Component {
    render() {
        return (
            <Wrapper>
                Sidebar
            </Wrapper>
        )
    }
}