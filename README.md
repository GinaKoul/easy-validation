# Easy Validation

## Package installation

```bash
npm i @ginakoul/easy-validation
```

## Import menu-drop to project

### Import Css

```bash
import "@ginakoul/simple-carousel/dist/easy-validation.css";
```

### Import Js

```bash
import {
  ErrorMessages,
  CustomValidations,
  Validation,
} from "@ginakoul/easy-validation/dist/easy-validation.js";
```

## Use inside project

- Add **novalidate** to form element

- Add **inline** attribute to form element in order to make the error messages inline (optional).

- Add validation attributes to fields

### Custom error messages (optional)

- The **key** must be the **id** of the field

- The keys inside the inner object must be a **validation attribute name**

- Use **ErrorMessages.add()** to add custom error messages to validation

```bash
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
```

### Custom validation (optional)

- Use **CustomValidations.add()** to add custom validation

**Values added:**

1. The first value must be the field to which the validation applies

2. The second value must be the function that contains the custom validation

3. The third value must be the the custom validation error

```bash
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
```

### Validation initialization

- Use **Validation.init()** to initialize the validation

- Must be used after the custom messages and custom valiations are added (both are optional)

```bash
  Validation.init();
```
