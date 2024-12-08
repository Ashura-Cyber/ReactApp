import React, { useState } from 'react';
import ticketsData from './tickets.json';
import CurrencyConverter from './CurrencyConverter';
import './TicketList.css';

const TicketList = () => {
  const [selectedStops, setSelectedStops] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('RUB');

  // Фильтрация билетов
  const filteredTickets = ticketsData.tickets.filter((ticket) => {
    const stops = Number(ticket.stops);
    if (selectedStops.length === 0 || selectedStops.includes("all")) return true;
    return selectedStops.includes(stops);
  });

  // Форматирование даты
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate(); // Число
    const month = date.toLocaleString('ru-RU', { month: 'short' }); // Месяц (сокращение)
    const year = date.getFullYear(); // Год
    const weekday = date.toLocaleString('ru-RU', { weekday: 'short' }); // День недели (сокращение)

    // Делаем первую букву дня недели заглавной
    const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

    return `${day} ${month} ${year}, ${capitalizedWeekday}`; // Форматируем в нужный порядок
  };

  // Функция склонения "пересадок"
  const getStopsText = (stops) => {
    if (stops === 0) return 'Без пересадок';
    if (stops === 1) return '1 пересадка';
    if (stops > 1 && stops < 5) return `${stops} пересадки`;
    return `${stops} пересадок`;
  };

  // Обработка фильтра пересадок
  const handleStopsChange = (e) => {
    const value = e.target.value;
    if (value === "all") {
      setSelectedStops(e.target.checked ? ["all"] : []);
    } else {
      const stops = parseInt(value, 10);
      setSelectedStops((prev) =>
        e.target.checked ? [...prev.filter((f) => f !== "all"), stops] : prev.filter((f) => f !== stops)
      );
    }
  };

  // Обработка переключения валют
  const handleCurrencyChange = (currency) => setSelectedCurrency(currency);

  return (
    <div className="ticket-list">
      <div className="sidebar">
        <h3>Валюта</h3>
        <div className="currency-buttons">
          {["RUB", "USD", "EUR"].map((currency) => (
            <button
              key={currency}
              className={selectedCurrency === currency ? "active" : ""}
              onClick={() => handleCurrencyChange(currency)}
            >
              {currency}
            </button>
          ))}
        </div>

        <h3>Количество пересадок</h3>
        <div className="stops-filter">
          <label>
            <input
              type="checkbox"
              value="all"
              checked={selectedStops.includes("all")}
              onChange={handleStopsChange}
            />
            Все
          </label>
          <label>
            <input
              type="checkbox"
              value="0"
              checked={selectedStops.includes(0)}
              onChange={handleStopsChange}
            />
            Без пересадок
          </label>
          <label>
            <input
              type="checkbox"
              value="1"
              checked={selectedStops.includes(1)}
              onChange={handleStopsChange}
            />
            1 пересадка
          </label>
          <label>
            <input
              type="checkbox"
              value="2"
              checked={selectedStops.includes(2)}
              onChange={handleStopsChange}
            />
            2 пересадки
          </label>
          <label>
            <input
              type="checkbox"
              value="3"
              checked={selectedStops.includes(3)}
              onChange={handleStopsChange}
            />
            3 пересадки
          </label>
        </div>
      </div>

      <div className="tickets">
        {filteredTickets.length === 0 ? (
          <p>Нет билетов для отображения по выбранному фильтру.</p>
        ) : (
          filteredTickets.map((ticket) => (
            <div
              className="ticket"
              key={`${ticket.departure_time}-${ticket.arrival_time}-${ticket.stops}`}
            >
              <div className="ticket-left">
                <img src="airline-logo.png" alt="airline logo" />
                <button>
                  Купить <br /> за{" "}
                  <CurrencyConverter priceInRub={ticket.price} selectedCurrency={selectedCurrency} />
                </button>
              </div>


              <div className="ticket-right">
                <div className="ticket-time">
                  <p>{ticket.departure_time}</p>
                  <div className='ticket-right-block'>
                    <p>{getStopsText(ticket.stops)}</p>
                    <img src="plane.png" alt="airline logo" />
                  </div>
                  <p>{ticket.arrival_time}</p>
                </div>
                <div className="ticket-info-way">
                  <p>{ticket.origin}, {ticket.origin_name}</p>
                  <p>{ticket.destination_name}, {ticket.destination}</p>
                </div>
                <div className="ticket-info-date">
                  <p>{formatDate(ticket.departure_date)}</p>
                  <p>{formatDate(ticket.arrival_date)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TicketList;
