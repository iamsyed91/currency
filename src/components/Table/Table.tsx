import React from "react";

interface Result {
  fxRate?: number;
  overrideRate?: number;
  initialAmount: string;
  initialCurrency?: string;
  convertedAmount?: string;
  convertedCurrency?: string;
}

interface Props {
  prevResults: Result[];
  realtimeRate: number | null;
}


const Table: React.FC<Props> = ({ prevResults, realtimeRate }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Realtime Rate</th>
          <th>Override</th>
          <th>Initial Amount</th>
          <th>Converted Amount</th>
        </tr>
      </thead>
      <tbody>
        {prevResults.map((result, index) => (
          <tr key={index}>
            <td>{result.fxRate}</td>
            <td>{result.overrideRate || "N/A"}</td>
            <td>
              {result.initialAmount} {result.initialCurrency}
            </td>
            <td>
              {result.convertedAmount} {result.convertedCurrency}
            </td>
          </tr>
        ))}
        <tr>
          <td>{realtimeRate}</td>
          <td>N/A</td>
          <td>N/A</td>
          <td>N/A</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
