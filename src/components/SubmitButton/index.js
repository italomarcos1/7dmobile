import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function SubmitButton({ style, ...rest }) {
  return (
    <Container style={style} {...rest}>
      Submit the Application
    </Container>
  );
}

SubmitButton.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object]),
};

SubmitButton.defaultProps = {
  style: {},
};

export default SubmitButton;
