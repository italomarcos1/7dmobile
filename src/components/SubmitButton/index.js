import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function SubmitButton({ style }) {
  return <Container style={style}>Submit the Application</Container>;
}

SubmitButton.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object]),
};

SubmitButton.defaultProps = {
  style: {},
};

export default SubmitButton;
