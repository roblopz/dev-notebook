import * as Yup from 'yup';
import { validationMessages } from './validationMessages';
Yup.setLocale({
    mixed: {
        default: validationMessages.invalid(),
        required: validationMessages.required()
    },
    number: {
        min: validationMessages.minNumber(null, '${min}')
    },
    string: {
        min: validationMessages.minStringlength(null, '${min}'),
        matches: validationMessages.invalid(),
        email: validationMessages.invalid('Email'),
        length: validationMessages.exactLength('${length}')
    }
});
export var yup = Yup;
//# sourceMappingURL=yup.js.map