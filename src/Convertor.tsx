import React, { FC, ChangeEventHandler } from "react";
import { ConverterContainer } from "./App.styles";

interface ConverterProps {
  conversionRate: number;
  amount: number;
  currencyType: string;
  handleAmountChange: ChangeEventHandler<HTMLInputElement>;
  handleOverrideRateChange: ChangeEventHandler<HTMLInputElement>;
  overrideRate: number | null;
}

const Converter: FC<ConverterProps> = ({
  conversionRate,
  amount,
  currencyType,
  handleAmountChange,
  handleOverrideRateChange,
  overrideRate
}) => {
  const convertedAmount =
    currencyType === "EUR"
      ? (amount * conversionRate).toFixed(2)
      : (amount / conversionRate).toFixed(2);

  return (
    <ConverterContainer>
      <h2>{`Convert ${currencyType} to ${
        currencyType === "EUR" ? "USD" : "EUR"
      }`}</h2>
      <div>
        <label>
          {`Enter ${currencyType} amount: `}
          <input type="number" value={amount} onChange={handleAmountChange} />
        </label>
      </div>
      <div>
        <label>
          {`Override FX Rate: `}
          <input
            type="number"
            value={overrideRate ?? ""}
            onChange={handleOverrideRateChange}
          />
        </label>
      </div>
      <div>
        {`FX Rate: ${
          overrideRate ? overrideRate : conversionRate
        } (1 ${currencyType} = ${
          overrideRate ? overrideRate : conversionRate
        } ${currencyType === "EUR" ? "USD" : "EUR"})`}
      </div>
      <div>
        {`Converted Amount: ${convertedAmount} ${
          currencyType === "EUR" ? "USD" : "EUR"
        }`}
      </div>
    </ConverterContainer>
  );
};

export default Converter;
