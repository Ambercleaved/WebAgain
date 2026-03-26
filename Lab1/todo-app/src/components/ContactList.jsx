import ContactItem from './ContactItem';

function ContactList({ contacts, onDelete, appState, search, clearSearch }) {
  const handleDelete = (id) => {
    onDelete(id);
  };

  if (contacts.length === 0) {
    if (appState === 'SEARCH_EMPTY') {
      return (
        <div className="empty-state">
          <p>Контакты не найдены</p>
          <p className="empty-sub">Попробуйте изменить параметры поиска</p>
          <button onClick={clearSearch} className="btn-clear-search">
            Очистить поиск
          </button>
        </div>
      );
    }
    
    return (
      <div className="empty-state">
        <p>Список контактов пуст</p>
        <p className="empty-sub">Добавьте первый контакт с помощью формы выше</p>
      </div>
    );
  }

  return (
    <div className="contact-list">
      <h2>Контакты ({contacts.length})</h2>
      <div className="contacts-grid">
        {contacts.map(contact => (
          <ContactItem 
            key={contact.id} 
            contact={contact} 
            onDelete={handleDelete}
            appState={appState}
          />
        ))}
      </div>
    </div>
  );
}

export default ContactList;