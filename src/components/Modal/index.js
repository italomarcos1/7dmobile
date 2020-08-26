import React from 'react';
import PropTypes from 'prop-types';

import Container, { Content, Title, Message, ClickAnywhere } from './styles';

import alert from '../../assets/alert.svg';

export default function Modal({ isDesktop, ...rest }) {
  return (
    <Container {...rest}>
      <Content {...rest} isDesktop={isDesktop}>
        <img src={alert} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Title>Warning</Title>
          <Message>You must fill every field before submitting.</Message>
        </div>
        <ClickAnywhere id="click">
          click anywhere to close this message
        </ClickAnywhere>
      </Content>
    </Container>
  );
}

Modal.propTypes = {
  isDesktop: PropTypes.bool.isRequired,
};
