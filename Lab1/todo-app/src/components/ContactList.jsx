import ContactItem from './ContactItem'

function ContactList({ contacts, onDelete }) {
  if (contacts.length === 0) {
    return (
      <div className="empty-state">
        <p>Контакты не найдены</p>
        <p className="empty-sub">Добавьте новый контакт или измените параметры поиска</p>
      </div>
    )
  }

  return (
    <div className="contact-list">
      <h2>Контакты ({contacts.length})</h2>
      <div className="contacts-grid">
        {contacts.map(contact => (
          <ContactItem 
            key={contact.id} 
            contact={contact} 
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default ContactList