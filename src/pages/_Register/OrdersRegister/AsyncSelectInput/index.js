/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';
import Select from 'react-select/async';

import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { Container, Label, Error, SelectInput } from './styles';

export default function AsyncSelectInput({ name, label, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const customStyles = {
    control: provided => ({
      ...provided,
      height: 45,
      width: 350,
      marginBottom: 10,
    }),
    menuList: provided => ({
      ...provided,
      width: 350,
      display: 'inline-block',
    }),
    menu: provided => ({
      ...provided,
      width: 350,
      display: 'inline-block',
    }),
    placeholder: provided => ({
      ...provided,
      paddingBottom: 25,
    }),
    singleValue: provided => ({
      ...provided,
      paddingBottom: 25,
    }),
    dropdownIndicator: provided => ({
      ...provided,
      paddingBottom: 25,
    }),
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(option => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
      clearValue(ref) {
        ref.select.select.clearValue();
      },
      setValue(ref, value) {
        ref.select.select.setValue(value);
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      {label && <Label htmlFor={fieldName}>{label}</Label>}
      <Select
        cacheOptions
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        isSearchable={false}
        styles={customStyles}
        {...rest}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}

AsyncSelectInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

AsyncSelectInput.defaultProps = {
  name: '',
  label: '',
};
