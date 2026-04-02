import { useState, useEffect } from 'react';
import AddContactForm from './components/AddContactForm';
import ContactFilter from './components/ContactFilter';
import StateIndicator from './components/StateIndicator';
import { useAppState } from './hooks/useAppState';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]); 
  const [filterText, setFilterText] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
  
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

  // Получение контактов с Mock API при загрузке приложения
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        
        // Преобразуем данные из API под наш формат
        const formattedData = data.map(user => ({
          id: user.id,
          name: user.name,
          phone: user.phone,
          email: user.email
        }));
        
        setContacts(formattedData);
      } catch (error) {
        console.error('Ошибка при загрузке контактов:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Имитация POST запроса для добавления контакта
  const addContact = async (newContact) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(newContact),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
      
      // Добавляем созданный контакт в локальный стейт (API вернет сгенерированный id)
      const newContacts = [...contacts, { ...newContact, id: data.id || Date.now() }];
      setContacts(newContacts);
      submitForm();
      
      setTimeout(() => {
        const listEmpty = newContacts.length === 0;
        afterAddReset(listEmpty);
        setFormData({ name: '', phone: '', email: '' });
      }, 100);
    } catch (error) {
      console.error('Ошибка при добавлении контакта:', error);
    }
  };

  // Имитация DELETE запроса для удаления контакта
  const handleDeleteContact = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });
      
      const newContacts = contacts.filter(contact => contact.id !== id);
      setContacts(newContacts);
      
      const listEmpty = newContacts.length === 0;
      const searchActive = filterText.length > 0;
      
      deleteContactAction(listEmpty, searchActive);
    } catch (error) {
      console.error('Ошибка при удалении контакта:', error);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterText.toLowerCase()) ||
    contact.phone.includes(filterText) ||
    contact.email.toLowerCase().includes(filterText.toLowerCase())
  );

  useEffect(() => {
    if (!isLoading) {
      const isEmpty = contacts.length === 0;
      checkListEmpty(isEmpty);
    }
  }, [contacts.length, isLoading]);

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
          
          {isLoading ? (
             <div className="empty-state">
               <p>Загрузка контактов с сервера...</p>
             </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;