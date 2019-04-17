import _get from 'lodash/get';

export const mapMuiFormikdProps = <Values>(
  fieldName: string,
  values: Values,
  errors: { [key: string]: any },
  touched: { [key: string]: any }
) => {
  const fieldError = getFieldError(fieldName, errors);
  const isFieldTouched = _get(touched, fieldName);
  const hasError = !!fieldError && !!isFieldTouched;

  return {
    value: _get(values, fieldName) || '',
    name: fieldName,
    error: hasError,
    helperText: hasError ? fieldError : null
  };
};

export const isTouchedInvalid = (
  fieldName: string,
  errors: { [key: string]: string },
  touched: { [key: string]: string }
) =>
  !!getFieldError(fieldName, errors) && !!isFieldTouched(fieldName, touched);

export const getFieldError = (
  fieldName: string,
  errors: { [key: string]: string }
) => _get(errors, fieldName);

export const isFieldTouched = (
  fieldName: string,
  touched: { [key: string]: string }
) => _get(touched, fieldName);