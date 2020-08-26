import React from 'react';
import PropTypes from 'prop-types';

import Container, { Content, Title, Message, ClickAnywhere } from './styles';

import check from '../../assets/check.svg';

export default function FinishModal({ isDesktop, ...rest }) {
  return (
    <Container {...rest}>
      <Content {...rest} isDesktop={isDesktop}>
        <img src={check} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Title>Success</Title>
          <Message>Thanks for submitting your application.</Message>
        </div>
        <ClickAnywhere id="click">
          click anywhere to close this message
        </ClickAnywhere>
      </Content>
    </Container>
  );
}

FinishModal.propTypes = {
  isDesktop: PropTypes.bool.isRequired,
};
