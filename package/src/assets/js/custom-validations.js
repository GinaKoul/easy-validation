export const CustomValidations = (function () {
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
