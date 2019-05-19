import { getIn, FormikErrors, FormikTouched } from 'formik';

export const mapMuiFormikdProps = <Values>(
  fieldName: string,
  values: Values,
  errors: FormikErrors<Values>,
  touched: FormikTouched<Values>
) => {
  const fieldError = getFieldError(fieldName, errors);
  const isFieldTouched = getIn(touched, fieldName);
  const hasError = !!fieldError && !!isFieldTouched;

  return {
    value: getIn(values, fieldName) || '',
    name: fieldName,
    error: hasError,
    helperText: hasError ? fieldError : null
  };
};

export const isTouchedInvalid = <Values>(
  fieldName: string,
  errors: FormikErrors<Values>,
  touched: FormikTouched<Values>
): boolean =>
  !!getFieldError(fieldName, errors) && !!isFieldTouched(fieldName, touched);

export const getFieldError = <Values>(
  fieldName: string,
  errors: FormikErrors<Values>
): string => getIn(errors, fieldName);

export const isFieldTouched = <Values>(
  fieldName: string,
  touched: FormikTouched<Values>
): boolean => getIn(touched, fieldName);