import { useState, useReducer } from 'react';


export const APP_STATES = {
  IDLE: 'Ожидание',
  FORM_EMPTY: 'Форма пуста',
  FORM_FILLING: 'Заполнение формы',
  FORM_ERROR: 'Ошибка валидации',
  CONTACT_ADDED: 'Контакт добавлен',
  CONTACT_DELETED: 'Контакт удален',
  SEARCH_ACTIVE: 'Поиск активен',
  SEARCH_EMPTY: 'Результатов нет',
  LIST_EMPTY: 'Список контактов пуст'
};


const EVENTS = {
  START_TYPING: 'START_TYPING',
  VALIDATE_ERROR: 'VALIDATE_ERROR',
  SUBMIT_FORM: 'SUBMIT_FORM',
  DELETE_CONTACT: 'DELETE_CONTACT',
  SEARCH: 'SEARCH',
  CLEAR_SEARCH: 'CLEAR_SEARCH',
  RESET_FORM: 'RESET_FORM',
  CLEAR_ERROR: 'CLEAR_ERROR',
  FORM_EMPTY: 'FORM_EMPTY',
  RESET_DELETE: 'RESET_DELETE',
  CHECK_LIST_EMPTY: 'CHECK_LIST_EMPTY',
  AFTER_ADD_RESET: 'AFTER_ADD_RESET'
};


const reducer = (state, action) => {
  console.log('Current state:', state, 'Action:', action.type, action.payload);
  
  switch (state) {
    case APP_STATES.IDLE:
      if (action.type === EVENTS.START_TYPING) return APP_STATES.FORM_FILLING;
      if (action.type === EVENTS.SEARCH) {
        return action.payload?.hasResults ? APP_STATES.SEARCH_ACTIVE : APP_STATES.SEARCH_EMPTY;
      }
      if (action.type === EVENTS.DELETE_CONTACT) return APP_STATES.CONTACT_DELETED;
      if (action.type === EVENTS.CHECK_LIST_EMPTY && action.payload?.isEmpty) {
        return APP_STATES.LIST_EMPTY;
      }
      return state;

    case APP_STATES.FORM_EMPTY:
      if (action.type === EVENTS.START_TYPING) return APP_STATES.FORM_FILLING;
      if (action.type === EVENTS.SEARCH) {
        return action.payload?.hasResults ? APP_STATES.SEARCH_ACTIVE : APP_STATES.SEARCH_EMPTY;
      }
      if (action.type === EVENTS.DELETE_CONTACT) return APP_STATES.CONTACT_DELETED;
      if (action.type === EVENTS.CHECK_LIST_EMPTY && action.payload?.isEmpty) {
        return APP_STATES.LIST_EMPTY;
      }
      return state;

    case APP_STATES.FORM_FILLING:
      if (action.type === EVENTS.VALIDATE_ERROR) return APP_STATES.FORM_ERROR;
      if (action.type === EVENTS.SUBMIT_FORM) return APP_STATES.CONTACT_ADDED;
      if (action.type === EVENTS.FORM_EMPTY) return APP_STATES.FORM_EMPTY;
      if (action.type === EVENTS.SEARCH) {
        return action.payload?.hasResults ? APP_STATES.SEARCH_ACTIVE : APP_STATES.SEARCH_EMPTY;
      }
      if (action.type === EVENTS.DELETE_CONTACT) return APP_STATES.CONTACT_DELETED;
      if (action.type === EVENTS.CHECK_LIST_EMPTY && action.payload?.isEmpty) {
        return APP_STATES.LIST_EMPTY;
      }
      return state;

    case APP_STATES.FORM_ERROR:
      if (action.type === EVENTS.CLEAR_ERROR) return APP_STATES.FORM_FILLING;
      if (action.type === EVENTS.RESET_FORM) return APP_STATES.FORM_EMPTY;
      if (action.type === EVENTS.START_TYPING) return APP_STATES.FORM_FILLING;
      if (action.type === EVENTS.SEARCH) {
        return action.payload?.hasResults ? APP_STATES.SEARCH_ACTIVE : APP_STATES.SEARCH_EMPTY;
      }
      if (action.type === EVENTS.DELETE_CONTACT) return APP_STATES.CONTACT_DELETED;
      if (action.type === EVENTS.CHECK_LIST_EMPTY && action.payload?.isEmpty) {
        return APP_STATES.LIST_EMPTY;
      }
      return state;

    case APP_STATES.CONTACT_ADDED:
      if (action.type === EVENTS.AFTER_ADD_RESET) {
        if (action.payload?.listEmpty) {
          return APP_STATES.LIST_EMPTY;
        }
        return APP_STATES.FORM_EMPTY;
      }
      if (action.type === EVENTS.SEARCH) {
        return action.payload?.hasResults ? APP_STATES.SEARCH_ACTIVE : APP_STATES.SEARCH_EMPTY;
      }
      if (action.type === EVENTS.DELETE_CONTACT) return APP_STATES.CONTACT_DELETED;
      if (action.type === EVENTS.CHECK_LIST_EMPTY && action.payload?.isEmpty) {
        return APP_STATES.LIST_EMPTY;
      }
      return state;

    case APP_STATES.CONTACT_DELETED:
      if (action.type === EVENTS.RESET_DELETE) {
        if (action.payload?.listEmpty) {
          return APP_STATES.LIST_EMPTY;
        }
        if (action.payload?.searchActive) {
          return APP_STATES.SEARCH_ACTIVE;
        }
        return APP_STATES.IDLE;
      }
      if (action.type === EVENTS.SEARCH) {
        return action.payload?.hasResults ? APP_STATES.SEARCH_ACTIVE : APP_STATES.SEARCH_EMPTY;
      }
      if (action.type === EVENTS.START_TYPING) return APP_STATES.FORM_FILLING;
      if (action.type === EVENTS.CHECK_LIST_EMPTY && action.payload?.isEmpty) {
        return APP_STATES.LIST_EMPTY;
      }
      return state;

    case APP_STATES.SEARCH_ACTIVE:
      if (action.type === EVENTS.CLEAR_SEARCH) {
        if (action.payload?.listEmpty) {
          return APP_STATES.LIST_EMPTY;
        }
        return APP_STATES.IDLE;
      }
      if (action.type === EVENTS.SEARCH) {
        return action.payload?.hasResults ? APP_STATES.SEARCH_ACTIVE : APP_STATES.SEARCH_EMPTY;
      }
      if (action.type === EVENTS.START_TYPING) return APP_STATES.FORM_FILLING;
      if (action.type === EVENTS.DELETE_CONTACT) return APP_STATES.CONTACT_DELETED;
      if (action.type === EVENTS.CHECK_LIST_EMPTY && action.payload?.isEmpty) {
        return APP_STATES.LIST_EMPTY;
      }
      return state;

    case APP_STATES.SEARCH_EMPTY:
      if (action.type === EVENTS.CLEAR_SEARCH) {
        if (action.payload?.listEmpty) {
          return APP_STATES.LIST_EMPTY;
        }
        return APP_STATES.IDLE;
      }
      if (action.type === EVENTS.SEARCH) {
        return action.payload?.hasResults ? APP_STATES.SEARCH_ACTIVE : APP_STATES.SEARCH_EMPTY;
      }
      if (action.type === EVENTS.START_TYPING) return APP_STATES.FORM_FILLING;
      if (action.type === EVENTS.DELETE_CONTACT) return APP_STATES.CONTACT_DELETED;
      if (action.type === EVENTS.CHECK_LIST_EMPTY && action.payload?.isEmpty) {
        return APP_STATES.LIST_EMPTY;
      }
      return state;

    case APP_STATES.LIST_EMPTY:
      if (action.type === EVENTS.START_TYPING) return APP_STATES.FORM_FILLING;
      if (action.type === EVENTS.SUBMIT_FORM) return APP_STATES.CONTACT_ADDED;
      if (action.type === EVENTS.AFTER_ADD_RESET) return APP_STATES.FORM_EMPTY;
      if (action.type === EVENTS.SEARCH) {
        return action.payload?.hasResults ? APP_STATES.SEARCH_ACTIVE : APP_STATES.SEARCH_EMPTY;
      }
      return state;

    default:
      return state;
  }
};

export const useAppState = () => {
  const [currentState, dispatch] = useReducer(reducer, APP_STATES.IDLE);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  const startTyping = () => {
    dispatch({ type: EVENTS.START_TYPING });
  };

  const validateError = (message) => {
    setErrorMessage(message);
    dispatch({ type: EVENTS.VALIDATE_ERROR });
  };

  const clearError = () => {
    setErrorMessage('');
    dispatch({ type: EVENTS.CLEAR_ERROR });
  };

  const submitForm = () => {
    setShowSuccess(true);
    dispatch({ type: EVENTS.SUBMIT_FORM });
  };

  const afterAddReset = (listEmpty = false) => {
    setTimeout(() => {
      setShowSuccess(false);
      dispatch({ type: EVENTS.AFTER_ADD_RESET, payload: { listEmpty } });
    }, 1500);
  };

  const deleteContact = (listEmpty = false, searchActive = false) => {
    setShowDeleteMessage(true);
    dispatch({ type: EVENTS.DELETE_CONTACT });
    setTimeout(() => {
      setShowDeleteMessage(false);
      dispatch({ type: EVENTS.RESET_DELETE, payload: { listEmpty, searchActive } });
    }, 1500);
  };

  const search = (hasResults, searchText, listEmpty = false) => {
    if (searchText === '') {
      clearSearch(listEmpty);
    } else {
      dispatch({ type: EVENTS.SEARCH, payload: { hasResults, searchText } });
    }
  };

  const clearSearch = (listEmpty = false) => {
    dispatch({ type: EVENTS.CLEAR_SEARCH, payload: { listEmpty } });
  };

  const resetForm = (listEmpty = false) => {
    setFormData({ name: '', phone: '', email: '' });
    setErrorMessage('');
    dispatch({ type: EVENTS.RESET_FORM, payload: { listEmpty } });
  };

  const checkFormEmpty = () => {
    if (!formData.name && !formData.phone && !formData.email) {
      dispatch({ type: EVENTS.FORM_EMPTY });
    }
  };

  const checkListEmpty = (isEmpty) => {
    dispatch({ type: EVENTS.CHECK_LIST_EMPTY, payload: { isEmpty } });
  };

  return {
    currentState,
    formData,
    setFormData,
    errorMessage,
    setErrorMessage,
    showSuccess,
    showDeleteMessage,
    startTyping,
    validateError,
    clearError,
    submitForm,
    afterAddReset,
    deleteContact,
    search,
    clearSearch,
    resetForm,
    checkFormEmpty,
    checkListEmpty
  };
};