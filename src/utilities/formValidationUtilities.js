const formValidationUtilities = {
  required: value => (value ? undefined : "Pflichtfeld"),
  requiredEmail: value =>
    value
      ? undefined
      : "Email Adresse wird beötigt, um ihre Identität als Student oder Mitarbeiter zu verifizieren.",
  requiredPassword: value =>
    value ? undefined : "Bitte geben Sie ein Passwort an.",
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
      ? "Invalid email address"
      : undefined,
  uniSiegenEmail: value =>
    value && !/.+@uni-siegen\.de/.test(value)
      ? "Dies ist keine gültige Uni Siegen Email"
      : undefined,
  passwordStrength: value =>
    value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)
      ? "Password muss mindestens einen Kleinbuchstaben, einen Großbuchstaben und eine Zahl enthalten, sowie mindestens 8 Zeichen lang sein."
      : undefined,
  passwordNotJochen: value =>
    value && value.indexOf("Jochen") !== -1 && value.indexOf("jochen") !== -1
      ? "Passwort darf nicht deinen Namen enthalten, Jochen :)"
      : undefined
};

export default formValidationUtilities;
