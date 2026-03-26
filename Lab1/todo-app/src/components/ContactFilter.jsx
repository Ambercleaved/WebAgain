function ContactFilter({ filterText, onFilterChange, search, clearSearch, currentState, listEmpty }) {
  
  const handleChange = (e) => {
    const value = e.target.value;
    onFilterChange(value);
  };

  return (
    <div className="filter-container">
      <label htmlFor="filter">Поиск контактов:</label>
      <input
        id="filter"
        type="text"
        placeholder="Введите имя, телефон или email..."
        value={filterText}
        onChange={handleChange}
        className="filter-input"
        disabled={listEmpty && !filterText}
      />
      {filterText && (
        <button 
          onClick={() => {
            onFilterChange('');
            clearSearch(listEmpty);
          }} 
          className="clear-filter-btn"
        >
          Очистить
        </button>
      )}
      {currentState === 'Поиск активен' && filterText && (
        <div className="search-status success">
          Найдены контакты по запросу "{filterText}"
        </div>
      )}
      {currentState === 'Результатов нет' && filterText && (
        <div className="search-status empty">
          Ничего не найдено по запросу "{filterText}"
        </div>
      )}
    </div>
  );
}

export default ContactFilter;