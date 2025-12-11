export const checkValidData = (email, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{4,60}$/;

  let errors = { email: "", password: "", global: "" };

  // Case 1: Email empty → show message under email field
  if (!email) {
    errors.email = "Please enter a valid email address.";
    return errors;
  }

  // Case 2: Password empty → show message under password field
  if (!password) {
    errors.password = "Your password must contain between 4 and 60 characters.";
    return errors;
  }

  // Case 3: Email format invalid
  if (!emailRegex.test(email)) {
    errors.email = "Please enter a valid email address.";
    return errors;
  }

  // Case 4: Password length invalid
  if (!passwordRegex.test(password)) {
    errors.password = "Your password must contain between 4 and 60 characters.";
    return errors;
  }

  // All validations passed
  return errors;
};
