import React, { useRef, useEffect } from 'react';
import ReactInputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

export default function InputMask({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField /* error */ } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',

      setValue(ref, value) {
        ref.setInputValue(value);
      },

      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);
  console.log(rest);
  return <ReactInputMask ref={inputRef} {...rest} />;
}

InputMask.propTypes = {
  name: PropTypes.string.isRequired,
};
