export var validationMessages = {
    required: function (field) {
        return (field ? field : 'This field') + " is required";
    },
    invalid: function (field) {
        var suffix = field ? " for " + field : '';
        return "This is not a valid value" + suffix;
    },
    minNumber: function (field, min) {
        var prefix = field ? "" + field : 'This value';
        return min ? prefix + " shall be greater than " + min : this.invalid(field);
    },
    minStringlength: function (field, min) {
        var suffix = field ? " for " + field : '';
        return min ? "Enter at least " + min + " characters" + suffix : this.invalid(field);
    },
    exactLength: function (field, length) {
        var suffix = field ? " for " + field : '';
        return length ? "Enter exactly " + length + " caract\u00E9res" + suffix : this.invalid(field);
    }
};
//# sourceMappingURL=validationMessages.js.map