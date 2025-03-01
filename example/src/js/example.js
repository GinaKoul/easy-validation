import "../css/example.css";
import { countryNames } from "./country-names.js";
import { documentMock } from "./document-mock.js";
import "/node_modules/@ginakoul/easy-validation/dist/easy-validation.css";
import {
  ErrorMessages,
  CustomValidations,
  Validation,
} from "/node_modules/@ginakoul/easy-validation/dist/easy-validation.js";

(function (doc) {
  let countrySelect;
  function createOption(key) {
    const countryOption = doc.createElement("option");
    countryOption.value = key;
    countryOption.textContent = countryNames[key];
    return countryOption;
  }

  function createOptions() {
    for (let key in countryNames) {
      countrySelect.append(createOption(key));
    }
  }

  function cacheDom() {
    countrySelect = doc.querySelector("#country");
  }

  function initSelect() {
    cacheDom();
    createOptions();
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", initSelect);
  } else {
    initSelect();
  }
})(document || documentMock);

function customValidationInit() {
  const confirmPassword = document.querySelector("#confirmPassword");
  CustomValidations.add(
    confirmPassword,
    function () {
      const password = document.querySelector("#password");
      const confirmPassword = document.querySelector("#confirmPassword");
      return password.value === confirmPassword.value;
    },
    "Custom error",
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
  },
};

ErrorMessages.add(validationErrors);

Validation.init();
