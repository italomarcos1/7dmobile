import React from 'react';
import PropTypes from 'prop-types';

import { Container, Button } from './styles';

function Switch({ checked, ...rest }) {
  return (
    <Container checked={checked} {...rest}>
      <Button checked={checked} />
    </Container>
  );
}

Switch.propTypes = {
  checked: PropTypes.bool.isRequired,
};

export default Switch;
