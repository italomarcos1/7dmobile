import React from 'react';
import PropTypes from 'prop-types';

import RadioButtonContainer from '../GreenRadioButtonContainer';
import RadioButton from '../GreenRadioButton';

function CustomRadioButton({
  title,
  titleFontSize,
  option,
  setOption,
  style,
  column,
  firstOption,
  secondOption,
}) {
  return (
    <RadioButtonContainer style={style}>
      <small style={{ fontSize: titleFontSize }}>{title}</small>
      <div
        style={
          column
            ? { flexDirection: 'column', alignItems: 'flex-start' }
            : { flexDirection: 'row' }
        }
      >
        <span>
          <RadioButton
            selected={option === 'yes'}
            onClick={() => setOption('yes')}
          />
          {firstOption}
        </span>
        <span style={column ? { marginTop: 20 } : { marginTop: 0 }}>
          <RadioButton
            style={column ? { marginLeft: 0 } : { marginLeft: 20 }}
            selected={option === 'no'}
            onClick={() => setOption('no')}
          />
          {secondOption}
        </span>
      </div>
    </RadioButtonContainer>
  );
}

CustomRadioButton.propTypes = {
  title: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired,
  setOption: PropTypes.string.isRequired,
  firstOption: PropTypes.string,
  secondOption: PropTypes.string,
  titleFontSize: PropTypes.number,
  column: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object]),
};

CustomRadioButton.defaultProps = {
  style: {},
  column: false,
  firstOption: 'Yes',
  secondOption: 'No',
  titleFontSize: 14,
};

export default CustomRadioButton;
