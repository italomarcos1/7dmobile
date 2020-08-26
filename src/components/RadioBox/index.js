import React from 'react';
import PropTypes from 'prop-types';

import { Container, Button } from './styles';

function RadioBox({ setValue, selected, style, children }) {
  return (
    <Container style={style}>
      <Button onClick={setValue} selected={selected}>
        <span style={selected ? { display: 'block' } : { display: 'none' }} />
      </Button>
      <small>{children}</small>
    </Container>
  );
}

RadioBox.propTypes = {
  setValue: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.object]),
  selected: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
};

RadioBox.defaultProps = {
  style: {},
};

export default RadioBox;
