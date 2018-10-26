import React from 'react';
import styled from "styled-components";

const Wrapper = styled.header`
    background: #42BA78;
    display: flex;
    flex-flow: column nowrap;
`;

const Title = styled.h1`
    color: #ffffff;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    line-height: 36px;
    font-size: 34px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 0;
`;

const Subtitle = styled.h2`
    color: #ffffff;
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    font-size: 20px;
    letter-spacing: 0.75px;
    text-transform: uppercase; 
`;

export default function Header() {
    return (
        <Wrapper>
            <div className='container-fluid'>
                <Title>Бюджет Томска</Title>
                <Subtitle>Открытые данные</Subtitle>
            </div>
        </Wrapper>
    )
}