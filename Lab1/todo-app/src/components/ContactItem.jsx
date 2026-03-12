function ContactItem({ contact, onDelete }) {
  // Функция для форматирования номера телефона
  const formatPhoneNumber = (phone) => {
    if (phone.startsWith('+7') && phone.length === 12) {
      return `+7 (${phone.slice(2, 5)}) ${phone.slice(5, 8)}-${phone.slice(8, 10)}-${phone.slice(10, 12)}`
    }
    return phone
  }

  return (
    <div className="contact-card">
      <div className="contact-info">
        <h3>{contact.name}</h3>
        <div className="contact-details">
          <p>Телефон: {formatPhoneNumber(contact.phone)}</p>
          <p>Email: {contact.email}</p>
        </div>
      </div>
      <button 
        onClick={() => onDelete(contact.id)}
        className="btn btn-delete"
        title="Удалить контакт"
      >
        Удалить
      </button>
    </div>
  )
}

export default ContactItem