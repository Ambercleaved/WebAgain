import { useState } from 'react'

function AddContactForm({ onAdd }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const handlePhoneChange = (e) => {
    const value = e.target.value
    // Разрешаем только цифры и символ '+'
    const regex = /^[0-9+]*$/
    
    if (regex.test(value)) {
      setPhone(value)
      setPhoneError('')
    } else {
      setPhoneError('Телефон может содержать только цифры и символ "+"')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!name.trim() || !phone.trim() || !email.trim()) {
      alert('Пожалуйста, заполните все поля')
      return
    }

    if (phoneError) {
      alert('Исправьте ошибку в номере телефона')
      return
    }

    onAdd({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim()
    })

    setName('')
    setPhone('')
    setEmail('')
    setPhoneError('')
  }

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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Телефон:</label>
          <input
            id="phone"
            type="tel"
            placeholder="+79991234567"
            value={phone}
            onChange={handlePhoneChange}
            className={`form-input ${phoneError ? 'error' : ''}`}
            required
          />
          {phoneError && <span className="error-message">{phoneError}</span>}
          <small className="input-hint">Формат: + и цифры (например: +79991234567)</small>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-add"
          disabled={!!phoneError}
        >
          Добавить контакт
        </button>
      </form>
    </div>
  )
}

export default AddContactForm