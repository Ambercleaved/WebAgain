function ContactFilter({ filterText, onFilterChange }) {
  return (
    <div className="filter-container">
      <label htmlFor="filter">Поиск контактов:</label>
      <input
        id="filter"
        type="text"
        placeholder="Введите имя, телефон или email..."
        value={filterText}
        onChange={(e) => onFilterChange(e.target.value)}
        className="filter-input"
      />
    </div>
  )
}

export default ContactFilter