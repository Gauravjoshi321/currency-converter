// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("USD");
  const [final, setFinal] = useState("");

  useEffect(
    function () {
      async function getConversion() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${input}&from=${from}&to=${to}`
        );

        const data = await res.json();
        setFinal(data.rates[to]);
        console.log(data.rates[to]);
      }

      if (to === from) {
        setFinal(input);
        return;
      }
      getConversion();
    },
    [input, from, to]
  );

  return (
    <div>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
      />
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{final} {to}</p>
    </div>
  );
}
