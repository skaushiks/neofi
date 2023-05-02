import { useEffect, useState } from "react";
import "../style/App.css";
import Navbar from "./Navbar.js";
import btc from "../images/btc.png";
import eth from "../images/eth.png";
import bnb from "../images/bnb.png";
import xrp from "../images/xrp.png";
import ada from "../images/ada.png";
import doge from "../images/doge.png";
import matic from "../images/matic.png";
import sol from "../images/sol.png";
import dot from "../images/dot.png";
import ltc from "../images/ltc.png";
import trx from "../images/trx.png";
import shib from "../images/shib.png";
import avax from "../images/avax.png";
import dai from "../images/dai.png";
import link from "../images/link.png";
import atom from "../images/atom.png";
import uni from "../images/uni.png";
import xmr from "../images/xmr.png";
import tusd from "../images/tusd.png";
import fil from "../images/fil.png";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import {
  InputAdornment,
  TextField
} from "@mui/material";
import axios from "axios";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 410,
  p: 4,
  height: 410,
};

const baseSocketURL = "wss://stream.binance.com:9443/ws/";

function App() {
  const [open, setOpen] = useState(false);
  const [coins, setCoins] = useState(
    [
      {
        ticker: "btcusdt",
        name: "Bitcoin",
        symbol: "BTC",
        logo: btc,
        selected: true
      },
      {
        ticker: "ethusdt",
        name: "Ethereum",
        symbol: "ETH",
        logo: eth,
        selected: false
      },
      {
        ticker: "bnbusdt",
        name: "BNB",
        symbol: "BNB",
        logo: bnb,
        selected: false
      },
      {
        ticker: "xrpusdt",
        name: "Ripple",
        symbol: "XRP",
        logo: xrp,
        selected: false
      },
      {
        ticker: "adausdt",
        name: "Cardano",
        symbol: "ADA",
        logo: ada,
        selected: false
      },
      {
        ticker: "dogeusdt",
        name: "Dogecoin",
        symbol: "DOGE",
        logo: doge,
        selected: false
      },
      {
        ticker: "maticusdt",
        name: "Polygon",
        symbol: "MATIC",
        logo: matic,
        selected: false
      },
      {
        ticker: "solusdt",
        name: "Solana",
        symbol: "SOL",
        logo: sol,
        selected: false
      },
      {
        ticker: "dotusdt",
        name: "Polkadot",
        symbol: "DOT",
        logo: dot,
        selected: false
      },
      {
        ticker: "ltcusdt",
        name: "Litecoin",
        symbol: "LTC",
        logo: ltc,
        selected: false
      },
      {
        ticker: "trxusdt",
        name: "TRON",
        symbol: "TRX",
        logo: trx,
        selected: false
      },
      {
        ticker: "shibusdt",
        name: "SHIBA INU",
        symbol: "SHIB",
        logo: shib,
        selected: false
      },
      {
        ticker: "avaxusdt",
        name: "Avalanche",
        symbol: "AVAX",
        logo: avax,
        selected: false
      },
      {
        ticker: "daiusdt",
        name: "Dai",
        symbol: "DAI",
        logo: dai,
        selected: false
      },
      {
        ticker: "linkusdt",
        name: "ChainLink",
        symbol: "LINK",
        logo: link,
        selected: false
      },
      {
        ticker: "atomusdt",
        name: "Cosmos",
        symbol: "ATOM",
        logo: atom,
        selected: false
      },
      {
        ticker: "uniusdt",
        name: "Uniswap",
        symbol: "UNI",
        logo: uni,
        selected: false
      },
      {
        ticker: "xmrusdt",
        name: "Monero",
        symbol: "XMR",
        logo: xmr,
        selected: false
      },
      {
        ticker: "tusdusdt",
        name: "TrueUSD",
        symbol: "TUSD",
        logo: tusd,
        selected: false
      },
      {
        ticker: "filusdt",
        name: "Filecoin",
        symbol: "FIL",
        logo: fil,
        selected: false
      }
    ]
  );
  const [token, setToken] = useState(coins[0]);
  const [ticker, setTicker] = useState(coins[0].ticker);
  const [usdinr, setUsdinr] = useState(81.8);
  const [tickerPrice, setTickerPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [tokenEstimate, setTokenEstimate] = useState("");

  const handleClose = () => {
    setTokenEstimate("");
    setAmount("");
    setOpen(false);
  };

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=inr')
      .then(function (response) {
        setUsdinr(response.data.tether.inr);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  
  useEffect(() => {
    let ws = new WebSocket(`${baseSocketURL}${ticker}@trade`);

    ws.onopen = () => {
      console.log("WebSocket Connected.");
    };

    ws.onmessage = (event) => {
      let res = JSON.parse(event.data);
      let price = (res.p * usdinr).toFixed(5);
      setTickerPrice(price);
    };

    ws.onclose = () => {
      console.log("Connection Closed.");
    };

    ws.onerror = () => {
      console.log("WebSocket Error.");
    };

    return () => {
      ws.close();
    };
  }, [ticker]);

  const handleAmountChange = (e) => {
    if (e.target.value) {
      setAmount(e.target.value);
      setTokenEstimate(((1 / tickerPrice) * e.target.value).toFixed(9));
    } else {
      setAmount("");
      setTokenEstimate("");
    }
  };

  const handleToken = (coin) => {
    let updatedArray = coins.map((itm) => {
      return itm === coin ? { ...itm, selected: true } : { ...itm, selected: false };
    });
    setCoins(updatedArray);
    setToken(coin);
    setTicker(coin.ticker);
    handleClose();
  };

  return (
    <>
      <Navbar />

      <main id="app">
        <div className="union">
          <div className="rectangle">
            <div className="ellipse" style={{ backgroundImage: `url(${token.logo})` }}></div>
          </div>

          <form className="content_container">
            <div>
              <p>Current value</p>
              <p>&#8377; {tickerPrice}</p>
            </div>

            <div className="input-box tokenInput" onClick={() => setOpen(true)}>
              <img src={token.logo} alt={token.name} />
              <input id="token" type="text" value={token.name} disabled />
              <ArrowDropDownIcon className="arrowDropDownIcon" />
            </div>

            <div className="input-box amountInput">
              <label htmlFor="amount">Amount you want to invest</label>
              <input id="amount" type="text" placeholder="0.00" value={amount} onChange={handleAmountChange} />
            </div>

            <div className="input-box tokenEstimateInput">
              <label htmlFor="tokenEstimate">Estimate Number of {token.symbol} You will Get</label>
              <input id="tokenEstimate" type="text" placeholder="0.00" value={tokenEstimate} disabled />
            </div>

            <button>Buy</button>
          </form>
        </div>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style} className="box">
            <CloseRoundedIcon className="closeRounded" onClick={handleClose} />

            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search chains"
              className="searchField"
              sx={{
                marginTop: 5,
              }}
              // onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon style={{ color: "#d2d2d2" }} />
                  </InputAdornment>
                )
              }}
            />

            <div className="tokensContainer">
            {
              coins.map((coin) => (
                <div
                  key={coin.ticker}
                  className={`searchToken ${coin.selected ? "searchTokenBackground" : ""}`}
                  onClick={() => handleToken(coin)}
                >
                  <div>
                    <img src={coin.logo} alt={coin.name} />
                    <p>{coin.name}</p>
                  </div>
                  {coin.selected ? <CheckRoundedIcon className="checkRoundedIcon" /> : null}
                </div>
              ))
            }
            </div>
          </Box>
        </Modal>
      </main>
    </>
  );
}

export default App;
