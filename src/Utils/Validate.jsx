export const checkValidData = (email, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const passwordRegex = /^.{4,60}$/;

  let errors = { email: "", password: "", global: "" };

  // Case 1: Email empty → show message under email field
  if (!email) {
    errors.email = "Please enter a valid email address.";
  }

  // Case 2: Password empty → show message under password field
  if (!password) {
    errors.password = "Your password must contain between 4 and 60 characters.";
  }

  // Case 3: Both filled but fail regex → clear field errors, show global message
  if (
    email &&
    password &&
    (!emailRegex.test(email) || !passwordRegex.test(password))
  ) {
    errors = {
      email: "",
      password: "",
      global:
        "Sorry, we can't find an account with this email address. Please try again or create a new account.",
    };
  }

  return errors;
};
