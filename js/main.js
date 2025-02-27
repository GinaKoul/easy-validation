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
