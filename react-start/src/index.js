import React from 'react';
import ReactDOM from 'react-dom/client'; // Импортировать из 'react-dom/client'
import TicketList from './TicketList';

const root = ReactDOM.createRoot(document.getElementById('root')); // Используем createRoot вместо render

root.render(
  <React.StrictMode>
    <TicketList />
  </React.StrictMode>
);
