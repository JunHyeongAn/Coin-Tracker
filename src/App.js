import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [btc, setBtc] = useState(0);
  const onChange = (event) => {
    setMoney(event.target.value);
  }

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then(resp => resp.json())
    .then(json => {
      setCoins(json);
      
      json.forEach(element => {
        if(element.id === "btc-bitcoin") {
          setBtc(element.quotes.USD.price);
          return;
        }
      });
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
        <h1>The Coins!</h1>
        {loading ? <strong>loading...</strong> : 
          <select>
            {coins.map(coin => 
              <option key={coin.id}>
                {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
              </option>
            )}
          </select>
        }
        
        <h3>how many BTC you can buy!!</h3>
        <input onChange={onChange} value={money} type="number" placeholder="how much can you spend"/>
        $
        <div>You can buy {money / btc} BTC</div>
    </div>
  );
}

export default App;
