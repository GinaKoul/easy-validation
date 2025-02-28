const ErrorMessages = (function () {
  let messages = {
    default: {
      required: "Please fill out this field.",
      pattern: "Please match the requested format.",
      minlength: "The content of this field is less than the minimum length",
      maxlength: "The content of this field exceeds the maximum length",
      min: "The content of this field is less than the minimum allowed value",
      max: "The content of this field is greater than the maximum allowed value",
    },
  };

  function add(newErrorMessages) {
    Object.assign(messages, newErrorMessages);
  }

  function get() {
    return messages;
  }

  return {
    add,
    get,
  };
})();

const CustomValidations = (function () {
  let validationRules = [];

  function add(field, customValidation, customMessage) {
    validationRules.push({
      id: field.id,
      validate: customValidation,
      message: customMessage,
    });
  }

  function get(field) {
    return validationRules.find((obj) => obj.id === field.id);
  }

  return {
    add,
    get,
  };
})();

function customValidationInit() {
  const confirmPassword = document.querySelector("#confirmPassword");
  CustomValidations.add(
    confirmPassword,
    function () {
      const password = document.querySelector("#password");
      const confirmPassword = document.querySelector("#confirmPassword");
      return password.value === confirmPassword.value;
    },
    "Custom error"
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", customValidationInit);
} else {
  customValidationInit();
}

const validationErrors = {
  email: {
    required: "Please enter a email address",
    pattern: "Please enter a valid email address",
  },
  postalCode: {
    required: "Please enter a postal code",
    pattern: "Please enter a valid postal code",
  },
  country: {
    required: "Please select a country",
  },
  password: {
    required: "Please enter a password",
    pattern:
      "Password must be between 8 and 20 characters long, include at least one letter, one number, and one special character (@$!%*?&).",
  },
  confirmPassword: {
    required: "Please enter a password",
    pattern:
      "Password must be between 8 and 20 characters long, include at least one letter, one number, and one special character (@$!%*?&).",
    passwordmismatch:
      "Confirmation password should be the same as the password",
  },
};

ErrorMessages.add(validationErrors);

const Validate = (function (doc) {
  let email;
  let postalCode;
  let country;
  let password;
  let confirmationPassword;

  const errorMessages = ErrorMessages.get();

  function passwordMatch() {
    return password === confirmPassword;
  }

  function getErrorMessage(field, customValidation) {
    if (field.validity.valueMissing) {
      return (
        errorMessages[`${field.id}`]?.required ||
        errorMessages["default"]?.required ||
        field.validationMessage
      );
    } else if (field.validity.tooShort) {
      return (
        errorMessages[`${field.id}`]?.minlength ||
        errorMessages["default"]?.minlength ||
        field.validationMessage
      );
    } else if (field.validity.tooLong) {
      return (
        errorMessages[`${field.id}`]?.maxlength ||
        errorMessages["default"]?.maxlength ||
        field.validationMessage
      );
    } else if (field.validity.rangeUnderflow) {
      return (
        errorMessages[`${field.id}`]?.min ||
        errorMessages["default"]?.min ||
        field.validationMessage
      );
    } else if (field.validity.rangeOverflow) {
      return (
        errorMessages[`${field.id}`]?.max ||
        errorMessages["default"]?.max ||
        field.validationMessage
      );
    } else if (field.validity.typeMismatch) {
      return (
        errorMessages[`${field.id}`]?.type ||
        errorMessages["default"]?.type ||
        field.validationMessage
      );
    } else if (field.validity.patternMismatch) {
      return (
        errorMessages[`${field.id}`]?.pattern ||
        errorMessages["default"]?.pattern ||
        field.validationMessage
      );
    } else if (field.id === "confirmPassword" && passwordMatch) {
      return (
        errorMessages[`${field.id}`]?.passwordmismatch ||
        errorMessages["default"]?.passwordmismatch ||
        field.validationMessage
      );
    } else if (customValidation && !customValidation?.validate()) {
      console.log(customValidation?.validate());
      return (
        customValidation["error"] ||
        errorMessages["default"]?.custom ||
        "Please correct the content of this field"
      );
    }
    return field.validationMessage;
  }

  function addError(field) {
    const fieldError = doc.querySelector(`#${field.id} + span.error`);
    fieldError.textContent = getErrorMessage(field);
    if (fieldError.textContent.trim() !== "") {
      fieldError.classList.add("active");
    }
  }

  function removeError(field) {
    const errorMessage = doc.querySelector(`#${field.id} + span.error`);
    errorMessage.textContent = "";
    errorMessage.classList.remove("active");
  }

  function checkCustomValidation(field) {
    const customValidation = CustomValidations.get(field);
    if (customValidation && !customValidation?.validate()) {
      console.log("hi");
      field.setCustomValidity(customValidation["error"]);
    } else {
      field.setCustomValidity("");
    }

    return customValidation;
  }

  function validateField(event) {
    const field = event.target;
    // console.log(field.reportValidity());

    const customValidation = checkCustomValidation(field);

    if (field.checkValidity()) {
      removeError(field);
    } else {
      addError(field, customValidation);
    }
  }

  function getFormFields(form) {
    const formInput = form.querySelectorAll("input");
    const formTextarea = form.querySelectorAll("textarea");
    const formSelect = form.querySelectorAll("select");
    const formFields = [...formInput, ...formTextarea, ...formSelect];
    return formFields;
  }

  function cacheDom() {
    const forms = doc.querySelectorAll("form");
    const formInput = doc.querySelectorAll("input");
    const formTextarea = doc.querySelectorAll("textarea");
    const formSelect = doc.querySelectorAll("select");
    const formFields = [...formInput, ...formTextarea, ...formSelect];
    return { forms, formFields };
  }

  function bindEvents(forms, formFields) {
    formFields.forEach((field) => {
      if (field.willValidate) {
        field.addEventListener("input", validateField);
      }
    });
  }

  function init() {
    const { forms, formFields } = cacheDom();
    bindEvents(forms, formFields);
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(document || documentMock);
