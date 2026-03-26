import { useEffect } from 'react';

function AddContactForm({ 
  onAdd, 
  formData, 
  setFormData, 
  errorMessage, 
  startTyping, 
  validateError, 
  clearError,
  submitForm, 
  resetForm, 
  currentState,
  showSuccess,
  checkFormEmpty,
  listEmpty
}) {
  
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9+]*$/;
    
    if (regex.test(value)) {
      setFormData({ ...formData, phone: value });
      if (errorMessage) {
        clearError();
      }
      startTyping();
    } else {
      validateError('Телефон может содержать только цифры и символ "+"');
    }
  };

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
    if (errorMessage && e.target.value) {
      clearError();
    }
    startTyping();
  };

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
    if (errorMessage && e.target.value) {
      clearError();
    }
    startTyping();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      validateError('Пожалуйста, заполните все поля');
      return;
    }

    onAdd({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim()
    });
  };

  useEffect(() => {
    if (!formData.name && !formData.phone && !formData.email && currentState !== 'Контакт добавлен') {
      checkFormEmpty();
    }
  }, [formData]);

  return (
    <div className="form-container">
      <h2>Добавить новый контакт</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Имя:</label>
          <input
            id="name"
            type="text"
            placeholder="Введите имя"
            value={formData.name}
            onChange={handleNameChange}
            className="form-input"
            disabled={currentState === 'Контакт добавлен'}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Телефон:</label>
          <input
            id="phone"
            type="tel"
            placeholder="+79991234567"
            value={formData.phone}
            onChange={handlePhoneChange}
            className={`form-input ${errorMessage ? 'error' : ''}`}
            disabled={currentState === 'Контакт добавлен'}
          />
          {errorMessage && <span className="error-message">{errorMessage}</span>}
          <small className="input-hint">Формат: + и цифры (например: +79991234567)</small>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="example@mail.com"
            value={formData.email}
            onChange={handleEmailChange}
            className="form-input"
            disabled={currentState === 'Контакт добавлен'}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-add"
          disabled={!!errorMessage || currentState === 'Контакт добавлен'}
        >
          Добавить контакт
        </button>
      </form>
      {showSuccess && (
        <div className="success-message">✓ Контакт успешно добавлен!</div>
      )}
    </div>
  );
}

export default AddContactForm;