import React, { useState, useRef, useEffect, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect, { Props as ReactSelectProps } from 'react-select/lib/Async';
import { makeStyles, useTheme } from '@material-ui/styles';
import TextField, { TextFieldProps, BaseTextFieldProps } from '@material-ui/core/TextField';
import { ControlProps } from 'react-select/lib/components/Control';
import { MenuProps } from 'react-select/lib/components/Menu';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { OptionProps } from 'react-select/lib/components/Option';
import { MenuItemProps } from '@material-ui/core/MenuItem';
import { PaperProps } from '@material-ui/core/Paper';

import { SelectComponents, components } from 'react-select/lib/components';

const getStyles = (theme: any) => ({
  menuContainer: {
    '& div:empty': {
      display: 'none'
    }
  },
  menuItem: {
    padding: `5px ${theme.spacing(2)}px`
  },
  placeholderText: {
    opacity: .42,
    transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    color: 'currentColor',
    position: 'absolute' as 'absolute',
    left: 0,
    bottom: 4,
    fontSize: 16
  },
  inputContainer: {
    position: 'relative' as 'relative',
    top: -5,
    left: -2,
    width: '100%'
  }
});

export interface IOption<T> {
  label: string;
  value: T;
}

export interface IMatAutocompleteProps<T> extends ReactSelectProps<IOption<T>> {
  value?: Array<IOption<T>> | IOption<T>;
  defaultValue?: Array<IOption<T>> | IOption<T>;
  defaultOptions?: Array<IOption<T>>;
  textFieldProps?: TextFieldProps;
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
  { inputRef, ...other }: Pick<BaseTextFieldProps, 'inputRef'> & HTMLAttributes<HTMLDivElement>
) => {
  return (
    <div ref={inputRef} {...other} />
  );
};

const ControlComponent = <T extends {}>(props: ControlProps<IOption<T>>) => {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { textFieldProps, onEnter }
  } = props;

  return (
    <TextField {...textFieldProps}
      InputProps={{
        ...textFieldProps.InputProps,
        inputComponent: InputComponent,
        inputProps: {
          ...((textFieldProps.InputProps && textFieldProps.InputProps.inputProps || {}) || {}),
          ref: innerRef,
          children,
          ...innerProps
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
    <MenuItem {...menuItemProps as any} component="div"
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
  const classes = makeStyles(getStyles)({});
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
      <AsyncSelect {...other} classNamePrefix="my-select"
        components={{
          Control: ControlComponent,
          Menu: MenuComponent,
          Option: OptionComponent,
          Placeholder: (props) => (
            <Typography color="textSecondary" className={classes.placeholderText}
              {...props.innerProps}> {props.children}</Typography>
          ),
          // Input: InputContainer,
          IndicatorsContainer: () => null,
          NoOptionsMessage: () => null,
          LoadingIndicator: () => null,
          LoadingMessage: () => null,
          ...other.components
        } as SelectComponents<IOption<T>>}
        styles={{
          ...other.styles,
          input: (provided) => ({
            ...provided,
            position: 'relative',
            left: -2,
            top: -2,
            ...(other.styles && other.styles.input),
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: 0,
            ...(other.styles && other.styles.valueContainer),
          }),
          singleValue: (provided) => ({
            ...provided,
            position: 'relative',
            top: 7,
            left: -2,
            ...(other.styles && other.styles.singleValue),
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
  menuItemProps: PropTypes.object,
  menuPaperProps: PropTypes.object
};

export default MatAutocomplete;