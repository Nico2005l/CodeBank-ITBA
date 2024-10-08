import React, { useState, useEffect } from 'react';
import './Convertidor.css';

function Converter() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [conversionResult, setConversionResult] = useState(null);
  const API_KEY = '3f9ea4845c9d4c4f5540323c';
  const BASE_URL = 'https://v6.exchangerate-api.com/v6/' + API_KEY;

  useEffect(() => {

    async function fetchData() {
    let response = await fetch(BASE_URL+'/latest/USD')

    let data = await response.json();

    setCurrencies(Object.keys(data.conversion_rates))
    }
    fetchData();

  }, []);

  const handleConvert = () => {
    async function fetchData() {
      let response = await fetch(BASE_URL+'/pair/'+fromCurrency+'/'+toCurrency+'/'+amount)
  
      let data = await response.json();
  
      setConversionResult(data.conversion_result)
      }
      fetchData();
  };

  return (
    <div className="converter-container">
      <h2>Convierte tu saldo</h2>
      <hr />

      <div className="form-group">
        <label>Ingrese el monto:</label>
        <input className='menu'
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Seleccione moneda a convertir:</label>
        <select className='menu'
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>


      <div className="form-group">
        <label>A:</label>
        <select className='menu'
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <button className='boton' onClick={handleConvert}>Convertir</button>

      {conversionResult && (<>
        <hr />
        <h3 className='titulo'>{`${amount} ${fromCurrency} = ${conversionResult} ${toCurrency}`}</h3></>
      )}
    </div>

  );
}

export default Converter;
