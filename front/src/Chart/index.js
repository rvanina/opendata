import React, { Component } from 'react';
import styled from 'styled-components';
import {Doughnut} from 'react-chartjs-2';

const Wrapper = styled.section`
    display: flex;
    padding: 0 20px;
`;

const testdata = {
    datasets: [{
        data: [10, 20, 30]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
};

export default class Chart extends Component {
    render() {
        return (
            <Wrapper>
                <Doughnut 
                    width={500} 
                    height={500} 
                    options={{ maintainAspectRatio: false }} 
                    data={testdata} 
                />
            </Wrapper>
        )
    }
}