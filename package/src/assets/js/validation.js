import "../css/styles.css";
import { documentMock } from "./document-mock.js";
import { ErrorMessages } from "./error-messages.js";
import { CustomValidations } from "./custom-validations.js";
export { ErrorMessages } from "./error-messages.js";
export { CustomValidations } from "./custom-validations.js";

export const Validation = (function (doc) {
  const errorMessages = ErrorMessages.get();

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
    } else if (field.validity.stepMismatch) {
      return (
        errorMessages[`${field.id}`]?.step ||
        errorMessages["default"]?.step ||
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
    } else if (customValidation && !customValidation?.validate()) {
      return (
        customValidation["message"] ||
        errorMessages["default"]?.custom ||
        "Please correct the content of this field"
      );
    }
    return field.validationMessage;
  }

  function validationIsInline(field) {
    const formInline = field.closest("form").hasAttribute("inline");
    if (!formInline) {
      field.reportValidity();
    }
    return formInline;
  }

  function createError() {
    const error = doc.createElement("span");
    error.classList.add("error");
    error.setAttribute("aria-live", "polite");
    return error;
  }

  function addError(field, customValidation) {
    const errorMessage = getErrorMessage(field, customValidation);
    if (validationIsInline(field)) {
      let fieldError = doc.querySelector(`#${field.id} + span.error`);
      if (!fieldError) {
        fieldError = createError();
        field.parentNode.insertBefore(fieldError, field.nextSibling);
      }
      fieldError.textContent = getErrorMessage(field);
      if (fieldError.textContent.trim() !== "") {
        fieldError.classList.add("active");
      }
    } else {
      field.setCustomValidity(errorMessage);
    }
  }

  function removeError(field) {
    if (validationIsInline(field)) {
      const errorMessage = doc.querySelector(`#${field.id} + span.error`);
      errorMessage.textContent = "";
      errorMessage.classList.remove("active");
    } else {
      field.setCustomValidity("");
    }
  }

  function checkCustomValidation(field) {
    const customValidation = CustomValidations.get(field);
    if (customValidation && !customValidation?.validate()) {
      field.setCustomValidity(customValidation["message"]);
    } else {
      field.setCustomValidity("");
    }
    return customValidation;
  }

  function validate(field) {
    const customValidation = checkCustomValidation(field);

    if (field.checkValidity()) {
      removeError(field);
      return true;
    } else {
      addError(field, customValidation);
      return false;
    }
  }

  function validateField(event) {
    const field = event.target;
    return validate(field);
  }

  function getFormFields(form) {
    const formInput = form.querySelectorAll("input");
    const formTextarea = form.querySelectorAll("textarea");
    const formSelect = form.querySelectorAll("select");
    const formFields = [...formInput, ...formTextarea, ...formSelect];
    return formFields;
  }

  function validateForm(event) {
    const formFields = getFormFields(event.target);
    formFields.forEach((field) => {
      const fieldValid = validate(field);
      if (!fieldValid) {
        event.preventDefault();
      }
    });
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
    forms.forEach((form) => {
      form.addEventListener("submit", validateForm);
    });
  }

  function initValidation() {
    const { forms, formFields } = cacheDom();
    bindEvents(forms, formFields);
  }

  function init() {
    if (doc.readyState === "loading") {
      doc.addEventListener("DOMContentLoaded", initValidation);
    } else {
      initValidation();
    }
  }

  return {
    init,
  };
})(document || documentMock);
