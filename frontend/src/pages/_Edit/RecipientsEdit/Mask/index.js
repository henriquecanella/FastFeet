import React, { useRef, useState, useEffect } from 'react';
import InputMask from 'react-input-mask';

import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

export default function Mask({ name }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [mask, setMask] = useState(defaultValue);

  useEffect(() => {
    setMask(defaultValue || '');
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
      clearValue: pickerRef => {
        pickerRef.setInputValue(null);
      },
    });
  }, [defaultValue, fieldName, registerField]);

  function handleMask(e) {
    const { value } = e.target;
    return setMask(value);
  }

  return (
    <>
      <InputMask
        name="cep"
        mask="99999-999"
        maskChar="_"
        placeholder="00000-000"
        value={mask}
        onChange={e => handleMask(e)}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}

Mask.propTypes = {
  name: PropTypes.string.isRequired,
};
