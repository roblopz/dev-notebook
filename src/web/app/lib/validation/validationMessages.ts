
export const validationMessages = {
  required(field?: string) {
    return `${field ? field : 'This field'} is required`;
  },
  invalid(field?: string) {
    const suffix = field ? ` for ${field}` : '';
    return `This is not a valid value${suffix}`;
  },
  minNumber(field?: string, min?: string | number) {
    const prefix = field ? `${field}` : 'This value';
    return min ? `${prefix} shall be greater than ${min}` : this.invalid(field);
  },
  minStringlength(field?: string, min?: string | number) {
    const suffix = field ? ` for ${field}` : '';
    return min ? `Enter at least ${min} characters${suffix}` : this.invalid(field);
  },
  exactLength(field?: string, length?: string | number) {
    const suffix = field ? ` for ${field}` : '';
    return length ? `Enter exactly ${length} caractéres${suffix}` : this.invalid(field);
  }
};