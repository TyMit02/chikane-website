export const validateEmail = (email) => {
    // More comprehensive email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      isValid: emailRegex.test(email),
      message: emailRegex.test(email) ? '' : 'Please enter a valid email address'
    };
  };