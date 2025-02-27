const Validate = (function (doc) {
  let email;
  let postalCode;
  let country;
  let password;
  let confirmationPassword;
  const validationErrors = {
    email: {
      valueMissing: "Please enter a email address",
      patternMismatch: "Please enter a valid email address",
    },
    postalCode: {
      valueMissing: "Please enter a postal code",
      patternMismatch: "Please enter a valid postal code",
    },
    country: {
      valueMissing: "Please select a country",
    },
    password: {
      valueMissing: "Please enter a password",
      patternMismatch:
        "Password must be between 8 and 20 characters long, include at least one letter, one number, and one special character (@$!%*?&).",
    },
    confirmPassword: {
      valueMissing: "Please enter a password",
      patternMismatch:
        "Password must be between 8 and 20 characters long, include at least one letter, one number, and one special character (@$!%*?&).",
      passwordMismatch:
        "Confirmation password should be the same as the password",
    },
  };

  function passwordMatch() {
    return password === confirmPassword;
  }

  function addError(field) {
    const fieldError = doc.querySelector(`#${field.id} + span.error`);
    if (field.validity.valueMissing) {
      fieldError.textContent = validationErrors[`${field.id}`]["valueMissing"];
    } else if (field.validity.tooShort) {
      fieldError.textContent = `Field must contain at least ${field.minLength} characters, you entered ${field.value.length}.`;
    } else if (field.validity.tooLong) {
      fieldError.textContent = `Field must contain at least ${field.maxLength} characters, you entered ${field.value.length}.`;
    } else if (field.validity.rangeUnderflow) {
      fieldError.textContent = `Minimum allowed value is ${field.min}, you entered ${field.value}.`;
    } else if (field.validity.rangeOverflow) {
      fieldError.textContent = `Minimum allowed value is ${field.max}, you entered ${field.value}.`;
    } else if (field.validity.typeMismatch) {
      fieldError.textContent = `Entered value needs to be ${field.getAttribute(
        "type"
      )}.`;
    } else if (field.validity.patternMismatch) {
      fieldError.textContent =
        validationErrors[`${field.id}`]["patternMismatch"];
    } else if (field.id === "confirmPassword" && passwordMatch) {
      validationErrors[`${field.id}`]["passwordMismatch"];
    }
    if (fieldError.textContent.trim() !== "") {
      fieldError.classList.add("active");
    }
  }

  function removeError(field) {
    const errorMessage = doc.querySelector(`#${field.id} + span.error`);
    errorMessage.textContent = "";
    errorMessage.classList.remove("active");
  }

  function validateField(event) {
    const field = event.target;
    if (
      field.checkValidity() ||
      (field.id === "confirmPassword" && field.checkValidity() && passwordMatch)
    ) {
      removeError(field);
    } else {
      addError(field);
    }
  }

  function cacheDom() {
    email = doc.querySelector("#email");
    postalCode = doc.querySelector("#postalCode");
    country = doc.querySelector("#country");
    password = doc.querySelector("#password");
    confirmPassword = doc.querySelector("#confirmPassword");
  }

  function bindEvents() {
    email.addEventListener("input", validateField);
    postalCode.addEventListener("input", validateField);
    country.addEventListener("input", validateField);
    password.addEventListener("input", validateField);
    password.addEventListener("input", validateField);
  }

  function init() {
    cacheDom();
    bindEvents();
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(document || documentMock);
