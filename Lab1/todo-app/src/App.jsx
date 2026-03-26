import { useState, useEffect } from 'react';
import AddContactForm from './components/AddContactForm';
import ContactFilter from './components/ContactFilter';
import StateIndicator from './components/StateIndicator';
import { useAppState } from './hooks/useAppState';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]); // Начинаем с пустого списка для теста
  
  const [filterText, setFilterText] = useState('');
  
  const {
    currentState,
    formData,
    setFormData,
    errorMessage,
    showSuccess,
    showDeleteMessage,
    startTyping,
    validateError,
    clearError,
    submitForm,
    afterAddReset,
    deleteContact: deleteContactAction,
    search,
    clearSearch,
    resetForm,
    checkFormEmpty,
    checkListEmpty
  } = useAppState();

  const addContact = (newContact) => {
    const newContacts = [...contacts, { ...newContact, id: Date.now() }];
    setContacts(newContacts);
    submitForm();
    
    // После добавления контакта, через 1.5 секунды сбрасываем форму
    // и проверяем, стал ли список не пустым
    setTimeout(() => {
      const listEmpty = newContacts.length === 0;
      afterAddReset(listEmpty);
      // Очищаем форму
      setFormData({ name: '', phone: '', email: '' });
    }, 100);
  };

  const handleDeleteContact = (id) => {
    const newContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newContacts);
    
    // Проверяем, пуст ли список после удаления
    const listEmpty = newContacts.length === 0;
    // Проверяем, активен ли поиск
    const searchActive = filterText.length > 0;
    
    deleteContactAction(listEmpty, searchActive);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterText.toLowerCase()) ||
    contact.phone.includes(filterText) ||
    contact.email.toLowerCase().includes(filterText.toLowerCase())
  );

  // Проверяем, пуст ли список контактов
  useEffect(() => {
    const isEmpty = contacts.length === 0;
    checkListEmpty(isEmpty);
  }, [contacts.length]);

  // Обновляем состояние поиска при изменении текста поиска
  const handleSearch = (text) => {
    setFilterText(text);
    const listEmpty = contacts.length === 0;
    
    if (text.length === 0) {
      clearSearch(listEmpty);
    } else {
      const hasResults = contacts.some(contact =>
        contact.name.toLowerCase().includes(text.toLowerCase()) ||
        contact.phone.includes(text) ||
        contact.email.toLowerCase().includes(text.toLowerCase())
      );
      search(hasResults, text, listEmpty);
    }
  };

  // Обновляем состояние поиска при изменении списка контактов (удаление/добавление)
  useEffect(() => {
    if (filterText.length > 0) {
      const hasResults = contacts.some(contact =>
        contact.name.toLowerCase().includes(filterText.toLowerCase()) ||
        contact.phone.includes(filterText) ||
        contact.email.toLowerCase().includes(filterText.toLowerCase())
      );
      const listEmpty = contacts.length === 0;
      search(hasResults, filterText, listEmpty);
    }
  }, [contacts]);

  return (
    <div className="app">
      <h1>Список контактов</h1>
      
      <div className="container">
        <StateIndicator currentState={currentState} />
        
        {showDeleteMessage && (
          <div className="delete-message">🗑 Контакт удален</div>
        )}
        
        <AddContactForm 
          onAdd={addContact}
          formData={formData}
          setFormData={setFormData}
          errorMessage={errorMessage}
          startTyping={startTyping}
          validateError={validateError}
          clearError={clearError}
          submitForm={submitForm}
          resetForm={resetForm}
          currentState={currentState}
          showSuccess={showSuccess}
          checkFormEmpty={checkFormEmpty}
          listEmpty={contacts.length === 0}
        />
        
        <ContactFilter 
          filterText={filterText}
          onFilterChange={handleSearch}
          search={search}
          clearSearch={clearSearch}
          currentState={currentState}
          listEmpty={contacts.length === 0}
        />
        
        <div className="contact-list">
          <h2>Контакты ({filteredContacts.length})</h2>
          <div className="contacts-grid">
            {filteredContacts.map(contact => (
              <div key={contact.id} className="contact-card">
                <div className="contact-info">
                  <h3>{contact.name}</h3>
                  <p>Телефон: {contact.phone}</p>
                  <p>Email: {contact.email}</p>
                </div>
                <button 
                  onClick={() => handleDeleteContact(contact.id)}
                  className="btn-delete"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
          {filteredContacts.length === 0 && filterText && (
            <div className="empty-state search-empty">
              <p>По запросу "{filterText}" ничего не найдено</p>
              <p className="empty-sub">Попробуйте изменить параметры поиска</p>
            </div>
          )}
          {filteredContacts.length === 0 && !filterText && contacts.length === 0 && (
            <div className="empty-state">
              <p>Список контактов пуст</p>
              <p className="empty-sub">Добавьте первый контакт с помощью формы выше</p>
            </div>
          )}
          {filteredContacts.length === 0 && !filterText && contacts.length > 0 && (
            <div className="empty-state">
              <p>Контакты не отображаются</p>
              <p className="empty-sub">Все контакты скрыты поиском</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;