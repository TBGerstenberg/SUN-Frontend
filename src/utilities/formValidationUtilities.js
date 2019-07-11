import i18next from "i18next";

/**
 * A set of utilites to validate various form-fields
 * used throughout the system and display localized
 * error messages. These have been written as
 * individual utilities to be able to freely combine them on
 * the form fields depending on the content.
 */
const formValidationUtilities = {
  required: value => {
    return value ? undefined : false;
  },
  requiredEmail: value =>
    value ? undefined : i18next.t("formValidationMessages-required-email"),
  requiredPassword: value =>
    value ? undefined : i18next.t("formValidationMessages-required-password"),
  maxLength: max => value =>
    value && value.length > max
      ? `Must be ${max} characters or less`
      : undefined,
  number: value =>
    value && isNaN(Number(value)) ? "Must be a number" : undefined,
  minValue: min => value =>
    value && value < min ? `Must be at least ${min}` : undefined,
  email: value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? i18next.t("formValidationMessages-invalid-email")
      : undefined,
  uniSiegenEmail: value =>
    value && !/.+@(student\.)?uni-siegen\.de/.test(value)
      ? i18next.t("formValidationMessages-invalid-siegen-email")
      : undefined,
  passwordStrength: value =>
    value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)
      ? i18next.t("formValidationMessages-password-strength")
      : undefined,
  passwordNotJochen: value =>
    value && value.indexOf("Jochen") !== -1 && value.indexOf("jochen") !== -1
      ? "Passwort darf nicht deinen Namen enthalten, Jochen :)"
      : undefined
};

export default formValidationUtilities;
