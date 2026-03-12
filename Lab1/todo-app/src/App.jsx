import { useState } from 'react'
import ContactList from './components/ContactList'
import AddContactForm from './components/AddContactForm'
import ContactFilter from './components/ContactFilter'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([])
  
  const [filterText, setFilterText] = useState('')

  const addContact = (newContact) => {
    setContacts([...contacts, { ...newContact, id: Date.now() }])
  }

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id))
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterText.toLowerCase()) ||
    contact.phone.includes(filterText) ||
    contact.email.toLowerCase().includes(filterText.toLowerCase())
  )

  return (
    <div className="app">
      <h1>Список контактов</h1>
      
      <div className="container">
        <AddContactForm onAdd={addContact} />
        <ContactFilter filterText={filterText} onFilterChange={setFilterText} />
        <ContactList 
          contacts={filteredContacts} 
          onDelete={deleteContact}
        />
      </div>
    </div>
  )
}

export default App