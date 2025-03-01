export const ErrorMessages = (function () {
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
