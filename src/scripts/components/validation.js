/**
 * Делает кнопку отправки неактивной
 */
const disableSubmitButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.setAttribute('disabled', true);
};

/**
 * Делает кнопку отправки активной
 */
const enableSubmitButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.removeAttribute('disabled');
};

/**
 * Проверяет, есть ли невалидные поля
 */
const hasInvalidInput = (inputList) =>
  inputList.some((inputItem) => !inputItem.validity.valid);

/**
 * Переключает состояние кнопки сабмита
 */
const toggleButtonState = (
  inputList,
  submitButton,
  inactiveButtonClass
) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(submitButton, inactiveButtonClass);
  } else {
    enableSubmitButton(submitButton, inactiveButtonClass);
  }
};

/**
 * Показывает ошибку у поля ввода
 */
const showInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorMessage,
  errorClass
) => {
  const errorNode = formElement.querySelector(
    `#${inputElement.id}-error`
  );

  inputElement.classList.add(inputErrorClass);
  errorNode.textContent = errorMessage;
  errorNode.classList.add(errorClass);
};

/**
 * Скрывает ошибку у поля ввода
 */
const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorNode = formElement.querySelector(
    `#${inputElement.id}-error`
  );

  inputElement.classList.remove(inputErrorClass);
  errorNode.textContent = '';
  errorNode.classList.remove(errorClass);
};

/**
 * Проверяет валидность одного поля
 */
const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(
      inputElement.dataset.errorMessage
    );
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputErrorClass,
      inputElement.validationMessage,
      errorClass
    );
    return;
  }

  hideInputError(
    formElement,
    inputElement,
    inputErrorClass,
    errorClass
  );
};

/**
 * Навешивает обработчики на поля формы
 */
const setEventListeners = (
  formElement,
  inputSelector,
  inputErrorClass,
  errorClass,
  submitButton,
  inactiveButtonClass
) => {
  const formInputs = Array.from(
    formElement.querySelectorAll(inputSelector)
  );

  toggleButtonState(
    formInputs,
    submitButton,
    inactiveButtonClass
  );

  formInputs.forEach((inputField) => {
    inputField.addEventListener('input', () => {
      checkInputValidity(
        formElement,
        inputField,
        inputErrorClass,
        errorClass
      );

      toggleButtonState(
        formInputs,
        submitButton,
        inactiveButtonClass
      );
    });
  });
};

/**
 * Инициализация валидации форм
 */
export const enableValidation = (validationSettings) => {
  const {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  } = validationSettings;

  const forms = Array.from(
    document.querySelectorAll(formSelector)
  );

  forms.forEach((formElement) => {
    const submitButton = formElement.querySelector(
      submitButtonSelector
    );

    const inputs = Array.from(
      formElement.querySelectorAll(inputSelector)
    );

    toggleButtonState(
      inputs,
      submitButton,
      inactiveButtonClass
    );

    setEventListeners(
      formElement,
      inputSelector,
      inputErrorClass,
      errorClass,
      submitButton,
      inactiveButtonClass
    );
  });
};

/**
 * Сброс состояния валидации формы
 */
export const clearValidation = (
  formElement,
  validationSettings
) => {
  const {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  } = validationSettings;

  const submitButton = formElement.querySelector(
    submitButtonSelector
  );

  const inputs = Array.from(
    formElement.querySelectorAll(inputSelector)
  );

  disableSubmitButton(
    submitButton,
    inactiveButtonClass
  );

  inputs.forEach((inputField) => {
    hideInputError(
      formElement,
      inputField,
      inputErrorClass,
      errorClass
    );
  });

  toggleButtonState(
    inputs,
    submitButton,
    inactiveButtonClass
  );
};
