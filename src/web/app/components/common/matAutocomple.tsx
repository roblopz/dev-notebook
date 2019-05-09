import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect, { Props as ReactSelectProps } from 'react-select/lib/Async';
import deburr from 'lodash/deburr';
import { makeStyles, useTheme } from '@material-ui/styles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { ControlProps } from 'react-select/lib/components/Control';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';
import { InputProps } from '@material-ui/core/Input';
import { MenuProps } from 'react-select/lib/components/Menu';
import { Paper, MenuItem } from '@material-ui/core';
import { OptionProps } from 'react-select/lib/components/Option';
import { MenuItemProps } from '@material-ui/core/MenuItem';
import { PaperProps } from '@material-ui/core/Paper';

import { getStyles } from '../../styles/jss/common/matTagSelect';

export interface IOption {
  label: string;
  value: string;
}

export interface IMatAutocompleteProps extends ReactSelectProps<IOption> {
  isAppendable?: boolean;
  textFieldProps?: TextFieldProps;
  InputProps?: Partial<InputProps>;
  inputProps?: { [prop: string]: any };
  menuItemProps?: MenuItemProps;
  menuPaperProps?: PaperProps;
  preventParentSubmit?: boolean;
}

export interface IMatAutocompletePropsInternal extends IMatAutocompleteProps {
  setInputValue: (val: any) => void;
}

export const specialCamelCase = (str: string, maxLength = 0) => {
  str = deburr(str || '').trim();

  if (!str)
    return str;

  const rgx = /[^a-z0-9\.\+\-\/#]/ig;
  const splitted = str.split(rgx).filter(s => !!s);

  let res = splitted.reduce((acc, curr, idx) => {
    if (idx > 0)
      acc += curr.charAt(0).toUpperCase() + curr.substr(1).toLowerCase();
    else
      acc += curr.charAt(0).toLowerCase() + curr.substr(1).toLowerCase();
    return acc;
  }, '');

  if (maxLength && res.length > maxLength) {
    res = res.substr(0, maxLength);
  }

  return res;
};

const InputComponent = (
  { inputRef, ...other }: InputBaseComponentProps
) => (
    <div {...other as any} />
  );

const ControlComponent = (props: ControlProps<IOption>) => {
  const {
    textFieldProps,
    InputProps,
    inputProps,
    isAppendable
  } = props.selectProps as unknown as IMatAutocompletePropsInternal;

  return (
    <TextField {...textFieldProps}
      InputProps={{
        ...InputProps,
        inputComponent: InputComponent,
        inputProps: {
          ...inputProps,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        },
        onKeyDown: (evt) => {
          if (evt.key === 'Enter') {
            if (isAppendable) {
              evt.nativeEvent.stopImmediatePropagation();
              evt.stopPropagation();
              evt.preventDefault();

              const camelCased = specialCamelCase((evt.target as any).value as string, 15);
              if (camelCased) {
                const allTags = props.getValue() as IOption[];

                if (allTags.some(t => t.value.toLowerCase() === camelCased.toLowerCase())) {
                  (props.selectProps as IMatAutocompletePropsInternal).setInputValue('');
                } else {
                  const allTags = props.getValue() as IOption[];
                  const newTag = { label: camelCased, value: camelCased };
                  props.setValue([...allTags as any, newTag], 'set-value');
                }
              }
            }
          }
        }
      }}
      InputLabelProps={{ shrink: props.hasValue ? true : undefined }} />
  );
};

const MenuComponent = (props: MenuProps<IOption>) => {
  const { menuPaperProps } = props.selectProps as unknown as IMatAutocompletePropsInternal;
  
  return (
    <Paper {...menuPaperProps} {...props.innerProps}>
      {props.children}
    </Paper>
  );
};

function OptionComponent(props: OptionProps<IOption>) {
  const { menuItemProps } = props.selectProps as unknown as IMatAutocompletePropsInternal;
  return (
    <MenuItem {...menuItemProps} component="div"
      buttonRef={props.innerRef} selected={props.isFocused}
      {...props.innerProps}>
      {props.children}
    </MenuItem>
  );
}

function MatAutocomplete({
  textFieldProps = { margin: 'dense', label: 'Name', fullWidth: true },
  menuPaperProps = { square: true },
  menuItemProps = {},
  preventParentSubmit = true,
  ...other
}: IMatAutocompleteProps) {
  const classes = makeStyles(getStyles)();
  const theme = useTheme<any>();
  menuItemProps.className = menuItemProps.className || classes.menuItem;
  menuPaperProps.className = `${classes.menuContainer} ${menuPaperProps.className || ''}`;

  // Set defaults
  other.value = other.value || (other.isMulti ? [] : null);
  other.cacheOptions = other.cacheOptions !== undefined && other.cacheOptions !== null
    ? other.cacheOptions : true;

  const [inputVal, setInputVal] = useState('');

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preventParentSubmit) {
      wrapperRef.current.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter')
          evt.preventDefault();
      });
    }
  }, [preventParentSubmit]);

  return (
    <div ref={wrapperRef}>
      <AsyncSelect {...other}
        components={{
          Control: ControlComponent,
          Menu: MenuComponent,
          Option: OptionComponent,
          Placeholder: () => null,
          IndicatorsContainer: () => null,
          NoOptionsMessage: () => null,
          LoadingIndicator: () => null,
          LoadingMessage: () => null,
          ...other.components
        }}
        styles={{
          ...other.styles,
          valueContainer: (provided) => ({
            ...provided,
            padding: '2px 0',
            ...(other.styles && other.styles.valueContainer),
          }),
          multiValueRemove: (provided) => ({
            ...provided,
            ...(other.styles && other.styles.multiValueRemove),
            ':hover': {
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
              cursor: 'pointer',
              ...(other.styles && other.styles.multiValueRemove && other.styles.multiValueRemove[':hover'])
            }
          })
        }}
        inputValue={inputVal}
        onInputChange={(val, action) => setInputVal(val)}
        menuItemProps={menuItemProps}
        textFieldProps={{ ...textFieldProps, value: inputVal }}
        menuPaperProps={menuPaperProps}
        setInputValue={setInputVal} />
    </div>
  );
}

MatAutocomplete.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })),
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ]),
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })),
  isAppendable: PropTypes.bool,
  preventParentSubmit: PropTypes.bool,
  onChange: PropTypes.func,
  textFieldProps: PropTypes.object,
  InputProps: PropTypes.object,
  inputProps: PropTypes.object,
  menuItemProps: PropTypes.object,
  menuPaperProps: PropTypes.object
};

export default MatAutocomplete;