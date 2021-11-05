import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UALProvider } from 'ual-reactjs-renderer'
import { Anchor } from 'ual-anchor'
import { Scatter } from 'ual-scatter'
import { Lynx } from 'ual-lynx'
import { TokenPocket } from 'ual-token-pocket'
import { Wombat } from 'ual-wombat'
import { EOSIOAuth } from 'ual-eosio-reference-authenticator'
import { Metamask } from 'ual-metamask'


const appName = "EOSETF";

const chain = {
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
  rpcEndpoints: [
    {
      protocol: "https",
      host: "eos.greymass.com",
      //https://dsp.maltablock.org
      //host: "dsp.airdropsdac.com", https://node2.blockstartdsp.com"dsp.eosphere.io",https://dsp.eosdetroit.io,https://node1.eosdsp.com
      port: "",
    },
  ],
};

const anchor = new Anchor([chain], {
  appName,
});
const scatter = new Scatter([chain], { appName })
const lynx = new Lynx([chain])
const tokenPocket = new TokenPocket([chain])
const wombat = new Wombat([chain], { appName: 'EOSETF' })
const eosioAuth = new EOSIOAuth([chain], { appName, protocol: 'eosio' })
const metamask = new Metamask([chain])


const supportedChains = [chain];
const supportedAuthenticators = [
  anchor, lynx, tokenPocket, eosioAuth, metamask //wombat, scatter removed due to development server error (works in prod)
];

ReactDOM.render(
  <React.StrictMode>
    <UALProvider
      chains={supportedChains}
      authenticators={supportedAuthenticators}
      appName={appName}
    >
      <App />
    </UALProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
