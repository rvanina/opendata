import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
  background: #42ba78;
  display: flex;
  flex-flow: column nowrap;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12),
    0px 0px 2px rgba(0, 0, 0, 0.14);
  margin: 0 0 48px 0;
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

function Header() {
  return (
    <Wrapper>
      <div className='container-fluid'>
        <Title>Бюджет Томска</Title>
        <Subtitle>Открытые данные</Subtitle>
      </div>
    </Wrapper>
  );
}

export default Header;
