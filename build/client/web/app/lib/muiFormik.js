import { getIn } from 'formik';
export var mapMuiFormikdProps = function (fieldName, values, errors, touched) {
    var fieldError = getFieldError(fieldName, errors);
    var isFieldTouched = getIn(touched, fieldName);
    var hasError = !!fieldError && !!isFieldTouched;
    return {
        value: getIn(values, fieldName) || '',
        name: fieldName,
        error: hasError,
        helperText: hasError ? fieldError : null
    };
};
export var isTouchedInvalid = function (fieldName, errors, touched) {
    return !!getFieldError(fieldName, errors) && !!isFieldTouched(fieldName, touched);
};
export var getFieldError = function (fieldName, errors) { return getIn(errors, fieldName); };
export var isFieldTouched = function (fieldName, touched) { return getIn(touched, fieldName); };
//# sourceMappingURL=muiFormik.js.map