import React, { useState, useEffect } from 'react';

const CurrencyConverter = ({ priceInRub, selectedCurrency }) => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Запрос к API для получения курсов валют
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://v6.exchangerate-api.com/v6/0f76fc4d1120a0a4a441fda9/latest/RUB');
        const data = await response.json();
        setExchangeRates(data.conversion_rates);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, [selectedCurrency]); // При изменении выбранной валюты обновляем курсы

  if (loading) {
    return <p>Загрузка курсов валют...</p>;
  }

  // Функция для конвертации из RUB в выбранную валюту
  const convertCurrency = (priceInRub, currency) => {
    if (exchangeRates[currency]) {
      return (priceInRub * exchangeRates[currency]).toFixed(2);
    }
    return priceInRub.toFixed(2); // Если нет курса, возвращаем цену в рублях
  };

  // Функция для получения символа валюты
  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'RUB':
        return '₽';
      default:
        return '';
    }
  };

  return (
    <span>
      {selectedCurrency === 'RUB' 
        ? `${priceInRub} ${getCurrencySymbol(selectedCurrency)}`
        : `${convertCurrency(priceInRub, selectedCurrency)} ${getCurrencySymbol(selectedCurrency)}`}
    </span>
  );
};

export default CurrencyConverter;
