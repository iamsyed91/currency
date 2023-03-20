import React from "react";
import {
  SwitchWrapper,
  SwitchLabel,
  SwitchInput,
  SwitchSlider
} from "./Switch.styles";

interface SwitchProps {
  currencyType: string;
  handleCurrencyTypeChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const Switch = ({
  currencyType,
  handleCurrencyTypeChange
}: SwitchProps): JSX.Element => {
  const isEUR = currencyType === "EUR";

  return (
    <SwitchWrapper>
      <SwitchLabel>
        <SwitchInput
          type="checkbox"
          checked={isEUR}
          onChange={handleCurrencyTypeChange}
        />
        <SwitchSlider />
      </SwitchLabel>
      <span>{isEUR ? "EUR" : "USD"}</span>
    </SwitchWrapper>
  );
};

export default Switch;
