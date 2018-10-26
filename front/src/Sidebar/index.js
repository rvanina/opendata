import React, { Component } from 'react';
import styled from 'styled-components';

import { fetchRegionalData } from '../api/methods'

const Wrapper = styled.aside`
    display: flex;
    padding: 20px;
`;

export default class Sidebar extends Component {
    state = {
        data: []
    }

    componentWillMount() {
        fetchRegionalData().then(data => this.setState({data})).catch(error => console.log(error))
    }

    render() {
        return (
            <Wrapper>
                Sidebar
                {JSON.stringify(this.state.data)}
            </Wrapper>
        )
    }
}