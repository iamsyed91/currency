import "./styles.css";

import React, { useState, useEffect } from "react";
import Converter from './Convertor';
import Table from "./components/Table/Table";
import Switch from "./components/Switch/Switch";
import axios from "axios";
// const axios = require('axios')
import { AppContainer, ConverterContainer, Title } from "./App.styles";

const App = () => {
  const [conversionRate, setConversionRate] = useState<number>(1.1);
  const [amount, setAmount] = useState<number>(1);
  const [currencyType, setCurrencyType] = useState<string>("EUR");
  const [prevResults, setPrevResults] = useState<PrevResult[]>([]);
  const [overrideRate, setOverrideRate] = useState<number | null>(null);
  const [realtimeRate, setRealtimeRate] = useState<number | null>(null);

  interface PrevResult {
    rate: string;
    override: string;
    initialAmount: string;
    convertedAmount: string;
  }

  // Update conversion rate every 3 seconds with a random value between -0.05 and +0.05
  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomValue = Math.random() * 0.1 - 0.05;
      setConversionRate((prevRate) => prevRate + randomValue);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  // Fetch real-time fx rate every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get(
          "https://openexchangerates.org/api/latest.json?app_id=YOUR_APP_ID&symbols=USD,EUR"
        )
        .then((response) => {
          setRealtimeRate(response.data.rates.USD / response.data.rates.EUR);
        })
        .catch((error) => console.log(error));
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  // Convert amount when currency or conversion rate changes
  useEffect(() => {
    const convertedAmount =
      currencyType === "EUR"
        ? amount * conversionRate
        : amount / conversionRate;
    setPrevResults((prevResults) => [
      {
        rate: realtimeRate ? realtimeRate.toFixed(4) : "",
        override: overrideRate ? overrideRate.toFixed(4) : "",
        initialAmount: `${amount} ${currencyType}`,
        convertedAmount: `${convertedAmount.toFixed(2)} ${
          currencyType === "EUR" ? "USD" : "EUR"
        }`
      },
      ...prevResults.slice(0, 4)
    ]);
  }, [amount, conversionRate, currencyType, overrideRate, realtimeRate]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value, 10));
  };

  const handleCurrencyTypeChange = () => {
    setCurrencyType((prevCurrencyType) =>
      prevCurrencyType === "EUR" ? "USD" : "EUR"
    );
    setAmount(
      currencyType === "EUR" ? amount * conversionRate : amount / conversionRate
    );
  };

  const handleOverrideRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setOverrideRate(isNaN(value) ? null : value);
  };

  return (
    <AppContainer>
      <Title>EUR/USD Converter</Title>
      <Converter
        conversionRate={conversionRate}
        amount={amount}
        currencyType={currencyType}
        handleAmountChange={handleAmountChange}
        handleOverrideRateChange={handleOverrideRateChange}
        overrideRate={overrideRate}
      />
      <br />
      <ConverterContainer>
        <Switch
          currencyType={currencyType}
          handleCurrencyTypeChange={handleCurrencyTypeChange}
        />
      </ConverterContainer>
      <br />
      <ConverterContainer>
        <Table prevResults={prevResults} realtimeRate={realtimeRate} />
      </ConverterContainer>
    </AppContainer>
  );
};

export default App;
