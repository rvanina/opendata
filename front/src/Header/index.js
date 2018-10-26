import React from 'react';
import styled from "styled-components";

const Wrapper = styled.header`
    background: #ffffff;
    display: flex;
    flex-flow: column nowrap;
`;

const Title = styled.h1`    
`;

const Subtitle = styled.h2`    
`;

export default function Header() {
    return (
        <Wrapper>
            <div className='container-fluid'>
                <Title>Открыте данные|QEEP-Pro</Title>
                <Subtitle>Бюджет Томска</Subtitle>
            </div>
        </Wrapper>
    )
}