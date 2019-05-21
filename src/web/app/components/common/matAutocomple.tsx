import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect, { Props as ReactSelectProps } from 'react-select/lib/Async';
import { makeStyles, useTheme } from '@material-ui/styles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { ControlProps } from 'react-select/lib/components/Control';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';
import { InputProps } from '@material-ui/core/Input';
import { MenuProps } from 'react-select/lib/components/Menu';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { OptionProps } from 'react-select/lib/components/Option';
import { MenuItemProps } from '@material-ui/core/MenuItem';
import { PaperProps } from '@material-ui/core/Paper';

import { getStyles } from '../../styles/jss/common/matTagSelect';

export interface IOption<T> {
  label: string;
  value: T;
}

export interface IMatAutocompleteProps<T> extends ReactSelectProps<IOption<T>> {
  value?: Array<IOption<T>> | IOption<T>;
  defaultValue?: Array<IOption<T>> | IOption<T>;
  defaultOptions?: Array<IOption<T>>;
  textFieldProps?: TextFieldProps;
  InputProps?: Partial<InputProps>;
  inputProps?: { [prop: string]: any };
  menuItemProps?: MenuItemProps;
  menuPaperProps?: PaperProps;
  preventParentSubmit?: boolean;
  loadOptions: (inputValue: string, callback: ((options: Array<IOption<T>>) => void)) => Promise<any> | void;
  onEnter?: (
    evt: React.KeyboardEvent<HTMLInputElement>,
    props: IMatAutocompleteProps<T> & IMatAutocompletePropsInternal<T>
  ) => void;
}
export interface IMatAutocompletePropsInternal<T> extends IMatAutocompleteProps<T> {
  setInputValue: (val: any) => void;
}

const InputComponent = (
  { inputRef, ...other }: InputBaseComponentProps
) => (
    <div {...other as any} />
  );

const ControlComponent = <T extends {}>(props: ControlProps<IOption<T>>) => {
  const {
    textFieldProps,
    InputProps,
    inputProps,
    onEnter
  } = props.selectProps as unknown as IMatAutocompletePropsInternal<T>;

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
          if (evt.key === 'Enter' && onEnter)
            onEnter(evt as React.KeyboardEvent<HTMLInputElement>, props as any);
        }
      }}
      InputLabelProps={{ shrink: props.hasValue ? true : undefined }} />
  );
};

const MenuComponent = <T extends {}>(props: MenuProps<IOption<T>>) => {
  const { menuPaperProps } = props.selectProps as unknown as IMatAutocompletePropsInternal<T>;
  
  return (
    <Paper {...menuPaperProps} {...props.innerProps}>
      {props.children}
    </Paper>
  );
};

function OptionComponent<T>(props: OptionProps<IOption<T>>) {
  const { menuItemProps } = props.selectProps as unknown as IMatAutocompletePropsInternal<T>;
  return (
    <MenuItem {...menuItemProps} component="div"
      buttonRef={props.innerRef} selected={props.isFocused}
      {...props.innerProps}>
      {props.children}
    </MenuItem>
  );
}

function MatAutocomplete<T>({
  textFieldProps = { margin: 'dense', label: 'Name', fullWidth: true },
  menuPaperProps = { square: true },
  menuItemProps = {},
  preventParentSubmit = true,
  ...other
}: IMatAutocompleteProps<T>) {
  const classes = makeStyles(getStyles)();
  const theme = useTheme<any>();
  menuItemProps.className = menuItemProps.className || classes.menuItem;
  menuPaperProps.className = `${classes.menuContainer} ${menuPaperProps.className || ''}`;

  // Set defaults
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
      value: PropTypes.any
    })),
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any
    })
  ]),
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.any
  })),
  preventParentSubmit: PropTypes.bool,
  onChange: PropTypes.func,
  textFieldProps: PropTypes.object,
  InputProps: PropTypes.object,
  inputProps: PropTypes.object,
  menuItemProps: PropTypes.object,
  menuPaperProps: PropTypes.object
};

export default MatAutocomplete;