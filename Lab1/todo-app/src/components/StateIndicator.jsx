import { APP_STATES } from '../hooks/useAppState';

function StateIndicator({ currentState }) {
  const getStateColor = (state) => {
    switch (state) {
      case APP_STATES.IDLE:
        return '#667eea';
      case APP_STATES.FORM_EMPTY:
        return '#f39c12';
      case APP_STATES.FORM_FILLING:
        return '#3498db';
      case APP_STATES.FORM_ERROR:
        return '#e74c3c';
      case APP_STATES.CONTACT_ADDED:
        return '#2ecc71';
      case APP_STATES.CONTACT_DELETED:
        return '#e67e22';
      case APP_STATES.SEARCH_ACTIVE:
        return '#1abc9c';
      case APP_STATES.SEARCH_EMPTY:
        return '#95a5a6';
      case APP_STATES.LIST_EMPTY:
        return '#e74c3c';
      default:
        return '#667eea';
    }
  };

  const getStateIcon = (state) => {
    switch (state) {
      case APP_STATES.IDLE:
        return '⏸';
      case APP_STATES.FORM_EMPTY:
        return '📝';
      case APP_STATES.FORM_FILLING:
        return '✏️';
      case APP_STATES.FORM_ERROR:
        return '⚠️';
      case APP_STATES.CONTACT_ADDED:
        return '✅';
      case APP_STATES.CONTACT_DELETED:
        return '🗑';
      case APP_STATES.SEARCH_ACTIVE:
        return '🔍';
      case APP_STATES.SEARCH_EMPTY:
        return '❌';
      case APP_STATES.LIST_EMPTY:
        return '📭';
      default:
        return '📱';
    }
  };

  return (
    <div className="state-indicator">
      <div className="state-header">
        <h3>📊 Дискретно-событийная модель</h3>
        <p>Текущее состояние приложения:</p>
      </div>
      <div 
        className="state-badge"
        style={{ backgroundColor: getStateColor(currentState) }}
      >
        {getStateIcon(currentState)} {currentState}
      </div>
      <div className="state-description">
        {currentState === APP_STATES.IDLE && 'Приложение в режиме ожидания, готово к работе'}
        {currentState === APP_STATES.FORM_EMPTY && 'Форма добавления пуста, начните вводить данные'}
        {currentState === APP_STATES.FORM_FILLING && 'Пользователь заполняет форму добавления контакта'}
        {currentState === APP_STATES.FORM_ERROR && 'Обнаружена ошибка в заполнении формы'}
        {currentState === APP_STATES.CONTACT_ADDED && 'Контакт успешно добавлен в список'}
        {currentState === APP_STATES.CONTACT_DELETED && 'Контакт удален из списка'}
        {currentState === APP_STATES.SEARCH_ACTIVE && 'Поиск активен, найдены соответствующие контакты'}
        {currentState === APP_STATES.SEARCH_EMPTY && 'Поиск не дал результатов, попробуйте изменить запрос'}
        {currentState === APP_STATES.LIST_EMPTY && 'Список контактов пуст, добавьте первый контакт'}
      </div>
    </div>
  );
}

export default StateIndicator;