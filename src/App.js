import logo from './logo.svg';
import './App.css';
import { Slider } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { withUAL } from "ual-reactjs-renderer";
import Swal from "sweetalert2";
import ReactTooltip from "react-tooltip";
import InfoIcon from '@material-ui/icons/Info';
import { Scrollbars } from 'react-custom-scrollbars';
import Drawer from '@material-ui/core/Drawer';
import ReactGA from "react-ga";
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Promise } from "bluebird";
import Poll from './Poll'
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CachedIcon from '@material-ui/icons/Cached';

const CustomSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "14px",
    width: '100%',
  },
  heading: {
    fontSize: "14px",
    color: "#534C80",
    fontFamily: "'Roboto', sans-serif",
    margin: 0
  },
  summary: {
    padding: 0,
  },
  expansion: {
    backgroundColor: "rgba( 255, 255, 255, 0 )",
    boxShadow: "none",
    borderRadius: "100px",
    marginLeft: 0,
  },
  expansion2: {
    fontSize: "10px"
  }
}));

function App(props) {


  const classes = useStyles();

  const {
    ual: { showModal, hideModal, activeUser, login, logout },
  } = props;
  if (activeUser) {
    const accountName = activeUser.getAccountName();
    accountName.then(function (result) {
      setAccountName(result);
    });
  }
  const displayaccountname = () => {
    if (accountname) {
      return accountname;
    }
  };
  const [drawerstate, setDrawerstate] = useState(false)
  const [tokens, setTokens] = useState(0)
  const [redeemtokens, setRedeemtokens] = useState(0)
  const [view, setView] = useState("create")
  const [accountname, setAccountName] = useState("")

  const logmeout = () => {
    logout()
    setAccountName("")
  }


  const redemptionfee = 0.95
  const efxmult = 2.6911
  const dadmult = 0.880282
  const iqmult = 26.233
  const vigmult = 125.0000
  const dappmult = 12.6263
  const boxmult = 0.036075
  const ogxmult = 2.13675214

  const chexmult = 56.94760820
  const pizzamult = 4.4696
  const dfsmult = 0.0140
  const emtmult = 16.3399
  const dexmult = 3.3850
  const tptmult = 17.9856


  const sucessstake = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 6000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: "CETF and EOSETF successfully issued!",
    });
  };

  const sucessredemption = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 6000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: "Tokens successfully redeemed!",
    });
  };



  const actionpuccis = (err) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "error",
      title: err,
    });
  };

  const [govrnprice, setGovrnprice] = useState({ rows: [] });
  const [dadpriceeos, setDadprice] = useState({ rows: [] });
  const [eosetfprice, setEosetfprice] = useState({ rows: [] });
  const [etfprice, setEtfprice] = useState();

  const [prices, setPrices] = useState([]);
  const [chartprices, setChartPrices] = useState([]);

  const [eosetfbalance, setEosetf] = useState({ rows: [] });
  const [etfbalance, setEtf] = useState({ rows: [] });
  const [eosetfbalanceind, setEosetfind] = useState({ rows: [] });
  const [etfbalanceind, setEtfind] = useState({ rows: [] });

  const [fulldata, setFulldata] = useState([])
  const [fulldataprices, setFulldataprices] = useState()

  const refresher = () => {
    setAccountName("")
    setTimeout(() => {
      if (activeUser) {
        const accountName = activeUser.getAccountName();
        accountName.then(function (result) {
          setAccountName(result);
        });
      }
    }, 100)
  }

  const menuClick = (which) => {
    setView(which)
    setDrawerstate(false)
  }

  useEffect(() => {
    fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "swap.defi",
        table: "pairs",
        scope: "swap.defi",
        lower_bound: 588,
        upper_bound: 588,
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((dadpriceeos) => setDadprice(dadpriceeos))
    );
  }, [accountname]);




  useEffect(() => {
    fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "swap.defi",
        table: "pairs",
        scope: "swap.defi",
        lower_bound: 1232,
        upper_bound: 1232,
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((eosetfprice) => setEosetfprice(eosetfprice))
    );
  }, [accountname]);



  useEffect(() => {
    fetch('https://api.newdex.io/v1/price?symbol=consortiumlv-govrn-eos', {
    }).then((response) =>
      response.json().then((govrnprice) => setGovrnprice(govrnprice.data.price))
    );


  }, [accountname]);


  const getdadprice = () => {
    if (dadpriceeos.rows[0]) {
      return Number(dadpriceeos.rows[0].price1_last);
    }
    else {
      return 0;
    }
  };



  const geteosetfprice = () => {
    if (eosetfprice.rows[0]) {
      return Number(eosetfprice.rows[0].price1_last);
    }
    else {
      return 0;
    }
  };



  const getpricesum = () => {
    if (prices) {
      return getprice("box") * boxmult + getprice("ogx") * ogxmult + getprice("iq") * iqmult + getprice("dapp") * dappmult + getprice("vig") * vigmult + getprice("efx") * efxmult + getprice("chex") * chexmult
        + getprice("pizza") * pizzamult + getprice("dfs") * dfsmult + getprice("emt") * emtmult + getprice("dex") * dexmult + getprice("tpt") * tptmult + getdadprice() * dadmult;
    }
  }


  useEffect(() => {
    const newdexcomms = [{ community: "box", symbol: "token.defi-box-eos" }, { community: "ogx", symbol: "core.ogx-ogx-eos" }, { community: "iq", symbol: "everipediaiq-iq-eos" }
      , { community: "dapp", symbol: "dappservices-dapp-eos" }, { community: "vig", symbol: "vig111111111-vig-eos" }, { community: "efx", symbol: "effecttokens-efx-eos" }, { community: "chex", symbol: "chexchexchex-chex-eos" }, { community: "pizza", symbol: "pizzatotoken-pizza-eos" }
      , { community: "dfs", symbol: "minedfstoken-dfs-eos" }, { community: "emt", symbol: "emanateoneos-emt-eos" }, { community: "dex", symbol: "token.newdex-dex-eos" }, { community: "tpt", symbol: "eosiotptoken-tpt-eos" }]
    newdexcomms.forEach((item) => {
      fetch('https://api.newdex.io/v1/price?symbol=' + item.symbol)
        .then(response => response.json())
        .then(data => {
          Object.assign(item, { price: data?.data?.price })
          setPrices([...newdexcomms]);
        }
        )
    })
  }, []);

  const getprice = (community) => {
    if (prices) {
      const datar = prices.filter(
        function (data) { return data.community == community }
      );
      if (datar[0])
        return datar[0].price
    }
  }


  const labelarray = (data) => {
    const arr = []
    data?.forEach((i)=>{
      arr.push(i?.token?.split(",")[1])
    })
    return arr
  }
  

  useEffect(()=>{
    if(fulldata){
      console.log(fulldata)
      const datar = fulldata
      datar.forEach((element, index, array) => {
        fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "swap.defi",
          table: "pairs",
          scope: "swap.defi",
          lower_bound: datar[index].pairid,
          upper_bound: datar[index].pairid,
          limit: 1,
        }),
      }).then(resp => resp.json())
        .then(data => {
          console.log(data)
          if(data?.rows[0].reserve0.split(" ")[1] == "EOS"){
            datar[index].price = Number(data?.rows[0].price1_last)
          }
          else{
            datar[index].price = Number(data?.rows[0].price0_last)
          }
        }
        )
        .then(() => {
          const arr = []
          const eosetfpricearray = []
          const pricesum = datar.map(p => p.price * Number(p.minamount.split(" ").[0])).reduce((a,b) => a + b)
          console.log("PRICESUM:" + pricesum)
          datar.forEach((i)=>{
            //make result here (price * multiplier)/price_sum
            const result = (((Number(i.price) * Number(i.minamount.split(" ").[0]))*100) / pricesum).toFixed(2)
            arr.push(result)
          })
          setChartPrices(arr)
          setEtfprice(pricesum)
        })
        .then(()=>{
          const prices = []
          datar.map((value, index)=>{
            prices.push(value?.price)
            console.log("price"+value?.price)
          })
          const pricesum = prices.reduce((a, b) => a + b, 0)
          console.log("PRICESUM" + pricesum)
        })

      })
    }
  },[fulldata])


  const data1 = {
    labels: labelarray(fulldata),
    datasets: [
      {
        label: 'ETF weight',
        fill: true,
        lineTension: 0.1,
        backgroundColor: ["#f17ae9", "#f9a9f1", "#fdd5f8", "#ffffff", "#7aa6e3", "#8fe1ff", "#21d2ff", "#f9a9f1", "#fdd5f8", "#fffff5", "#cbf0ff", "#fbaaeb", "#21d2f8"],
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        data: chartprices
      }
    ]
  };


  //price1_last
  const getbalance = (row) => {
    if(row.balance){
    return Number(row?.balance.split(" ")[0])
    }
  }
  
  useEffect(()=>{
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "consortiumtt",
          table: "rebalon",
          scope: "consortiumtt",
          limit: 100,
        }),
      }).then((response) =>
        response.json().then((res) => fetcher(res))
      );
    //fetch main table
    //for each row in main table, fetch more => append to items in main state
    //outside of this function, start replacing hardcoded state with dynamic
    const fetcher = (fetchdata) => {
      setFulldata(fetchdata.rows)
      if(fetchdata.rows){
      let data = fetchdata.rows
      data.forEach((element, index, array) => {
        if(accountname){
          fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              json: true,
              code: element.contract,
              table: "accounts",
              scope: displayaccountname(),
              limit: 1,
            }),
          }).then((response) =>
            response.json().then((balance) => attachbalance(balance.rows[0].balance))
          );
        }
        //FETCH HERE
        //THEN data[index].newvalue = fetched_value
        const attachbalance = (balance) => {
          data[index].balance = balance
        }
    });
    setFulldata(data)
    console.log(data)

    //TODO RIGHT NOW FOR PRICE SUM. NEED TO ADD MULTIPLIERS.
    }
  }
  },[accountname])

  useEffect(() => {
    fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "consortiumtt",
        table: "accounts",
        scope: displayaccountname(),
        limit: 3,
      }),
    }).then((response) =>
      response.json().then((etfbalanceind) => setEtfind(etfbalanceind))
    );
  }, [accountname]);

  useEffect(() => {
    fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "consortiumtt",
        table: "accounts",
        scope: displayaccountname(),
        lower_bound: "CETF",
        upper_bound: "CETF",
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((etfbalanceind) => setEtfind(etfbalanceind))
    );
  }, [accountname]);


  useEffect(() => {
    fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "consortiumtt",
        table: "accounts",
        scope: displayaccountname(),
        lower_bound: "EOSETF",
        upper_bound: "EOSETF",
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((eosetfbalanceind) => setEosetfind(eosetfbalanceind))
    );
  }, [accountname]);




  useEffect(() => {
    fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "consortiumtt",
        table: "stat",
        scope: "CETF",
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((etfbalance) => setEtf(etfbalance))
    );
  }, [accountname]);




  useEffect(() => {
    fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "consortiumtt",
        table: "stat",
        scope: "EOSETF",
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((eosetfbalance) => setEosetf(eosetfbalance))
    );
  }, [accountname]);


  const gettokenbalance = (token) => {
    if (token.rows[0]) {
      return Number(token.rows[0].balance.split(" ")[0]);
    }
    else {
      return 0;
    }
  };

  const gettokenbalanceone = (token) => {
    if (token.rows[0]) {
      return Math.floor(Number(token.rows[0].balance.split(" ")[0]));
      //return (token.rows[0].balance);
    }
    else {
      return 0;
    }
  };

  const gettokenbalancetwo = (token) => {
    if (token.rows[1]) {
      return Math.floor(Number(token.rows[1].balance.split(" ")[0]));
    }
    else {
      return 0;
    }
  };


  const gettokensupply = (token) => {
    if (token.rows[0]) {
      return Math.floor(Number(token.rows[0].supply.split(" ")[0]));
    }
    else {
      return 0;
    }
  };



  const halvingdivider = () => {
    if (etfbalance.rows[0]) {
      return parseInt(
        Math.pow(
          2,
          parseInt(
            Math.floor(Number(etfbalance.rows[0].supply.split(" ")[0])) /
            20000000
          )
        )
      );
    }
  };




  const creationreward = () => {
    return parseInt(
      80 /
      halvingdivider()
    );
  };


  const halvings = (totalcirc) => {
    if (totalcirc < 20000000) {
      return 0;
    } else if (totalcirc >> 20000000 && totalcirc < 40000000) {
      return 1;
    } else if (totalcirc >> 40000000 && totalcirc < 60000000) {
      return 2;
    } else if (totalcirc >> 60000000 && totalcirc < 80000000) {
      return 3;
    }
  };

  const dynamicsend = (buy) => {
    const fulldatacopy = fulldata.filter(item => item.ratio > 0);
    let alldata = [];
    if(fulldatacopy){
      Promise.all(fulldatacopy.map((value,index) =>{
        return new Promise((resolve) => {
        fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "swap.defi",
          table: "pairs",
          scope: "swap.defi",
          lower_bound: fulldatacopy[index].pairid,
          upper_bound: fulldatacopy[index].pairid,
          limit: 1,
        }),
      }).then(resp => resp.json()).then(data => {
        fulldatacopy[index].defibox = data
      }).then(()=>{
        fulldatacopy.forEach((element, index, array) => {
          if(accountname){
            fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                json: true,
                code: element.contract,
                table: "accounts",
                scope: displayaccountname(),
                limit: 1,
              }),
            }).then((response) =>
              response.json().then((balance) => attachbalance(balance.rows[0].balance))
            );
          }
          //FETCH HERE
          //THEN data[index].newvalue = fetched_value
          const attachbalance = (balance) => {
            fulldatacopy[index].balance = balance
          }
          resolve()
      });
      })
      })}
      )).then(() => {
          sender(fulldatacopy)
      })
    }

    const sender = async(totaldata)=>{
      console.log("DID IT")
      console.log(totaldata)
      console.log(chartprices)
      var slippagetoohigh = false;
      var slippagelist = []
      const multparse = (mult, nr, bal) => {
        if(bal){
          if(buy == true){
            return Number(parseFloat(mult * tokens).toFixed(nr)) - parseFloat(bal?.split(" ")[0])
          }
          else{
            return Number(parseFloat(mult * tokens).toFixed(nr))
          }
            
        }
      }
      const reserveparse = (token, reserve) => {
        return Number(parseFloat(token?.rows[0][reserve]))
      }
      const slippageparseflip = (token, mult, nr, balance) => {
        const slippage = ((reserveparse(token, "reserve1") / reserveparse(token, "reserve0")) / ((reserveparse(token, "reserve1") / (reserveparse(token, "reserve0") + multparse(mult, nr, balance)))))
        if ((slippage - 1) * 100 > 3) {
          slippagelist.push({ token: token?.rows[0].reserve0.split(" ")[1], amount: ((slippage - 1) * 100).toFixed(2) })
          slippagetoohigh = true
        }
        return slippage
      }
      const slippageparse = (token, mult, nr, balance) => {
        const slippage = ((reserveparse(token, "reserve0") / reserveparse(token, "reserve1")) / ((reserveparse(token, "reserve0") / (reserveparse(token, "reserve1") + multparse(mult, nr, balance)))))
        if ((slippage - 1) * 100 > 3) {
          slippagelist.push({ token: token?.rows[0].reserve1.split(" ")[1], amount: ((slippage - 1) * 100).toFixed(2) })
          slippagetoohigh = true
        }
        return slippage
      }
      totaldata.map((value, index)=>{
        let buyamount;
        console.log(value.balance)
        if(value.defibox.rows[0].reserve0.split(" ")[1] == "EOS"){
          buyamount = (((reserveparse(value.defibox, "reserve0") / reserveparse(value.defibox, "reserve1")) * 1.003 * multparse(Number(value.minamount.split(" ")[0]), value.token.split(",")[0], value.balance) * slippageparse(value.defibox, Number(value.minamount.split(" ")[0]), value.token.split(",")[0], value.balance)) + 0.004).toFixed(4)
        }else{
          buyamount = (((reserveparse(value.defibox, "reserve1") / reserveparse(value.defibox, "reserve0")) * 1.003 * multparse(Number(value.minamount.split(" ")[0]), value.token.split(",")[0], value.balance) * slippageparseflip(value.defibox, Number(value.minamount.split(" ")[0]), value.token.split(",")[0], value.balance)) + 0.004).toFixed(4)
        }
        totaldata[index].buyamount = buyamount
      })

      if (activeUser) {
        try {
          const transaction = {
            actions: []
          };
          totaldata.map((value, index)=>{
            transaction.actions.push(
              {
                account: value.contract,
                name: "transfer",
                authorization: [
                  {
                    actor: displayaccountname(), // use account that was logged in
                    permission: "active",
                  },
                ],
                data: {
                  from: displayaccountname(),
                  to: "consortiumtt",
                  //quantity: 19.2562 * tokens + " DAPP",
                  memo: "EOSETF creation through eosetf.io",
                  quantity: parseFloat(value.minamount.split(" ")[0] * tokens).toFixed(value.token.split(",")[0]) + " " + value.token.split(",")[1],

                },
              }
            )
          })

            totaldata.map((value, index)=>{
              if (multparse(value.minamount.split(" ")[0], value.token.split(",")[0], value.balance) > 0) {
                transaction.actions.unshift(
                  {
                    account: 'eosio.token',
                    name: 'transfer',
                    authorization: [
                      {
                        actor: displayaccountname(), // use account that was logged in
                        permission: 'active',
                      },
                    ],
                    data: {
                      from: displayaccountname(),
                      to: 'swap.defi',
                      //quantity: 19.2562 * tokens + ' DAPP',
                      memo: 'swap,0,' + value.strpairid,
                      quantity: value.buyamount + ' EOS'
  
                    },
                  }
                )
              }
            })

          
          // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator

          if (buy == true && slippagetoohigh == false) {
            await activeUser.signTransaction(transaction, {
              broadcast: true,
              expireSeconds: 300,
            })
            sucessstake()
          }
          else if (buy == false && slippagetoohigh == false) {
            await activeUser.signTransaction(transaction, {
              broadcast: true,
              expireSeconds: 300,
            })
            sucessstake()
          }
          else {
            var slippagemessage = "";
            if (Object.keys(slippagelist).length > 1) {
              slippagelist.forEach((item) => {
                slippagemessage = slippagemessage.concat(item.token, "(", item.amount, "%), ")
              })
            }
            else {
              slippagemessage = slippagemessage.concat(slippagelist[0].token, "(", slippagelist[0].amount, "%), ")
            }

            const message = "Slippage was higher than 3% for: " + slippagemessage.slice(0, -2) + "."

            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-end",
              showConfirmButton: false,
              timer: 6000,
              timerProgressBar: true,
              onOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "error",
              title: message,
            });
          }
        }
        catch (error) {
          console.log(error.message);
          actionpuccis(
            error.message
          );
        }
      } else {
        showModal();
      }
      
    }

  }


  const sendetf = async () => {
    const {
      ual: { login, displayError, showModal },
    } = props;
    // Via static contextType = UALContext, access to the activeUser object on this.context is now available
    const {
      ual: { activeUser },
    } = props;


    var eosetf = Number(redeemtokens).toFixed(4);


    if (activeUser) {
      try {
        const transaction = {
          actions: [
            {
              account: "consortiumtt",
              name: "transfer",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                from: displayaccountname(),
                to: "consortiumtt",
                quantity: eosetf + " EOSETF",
                memo: "EOSETF redemption through eosetf.io",
              },
            }

          ],
        };
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });

        sucessredemption();

      } catch (error) {
        console.log(error.message);
        actionpuccis(
          error.message
        );
      }
    } else {
      showModal();
    }
  };

  const toggleDrawer = (open) => (event) => {
    setDrawerstate(open);
  };


  return (

    <div className="App">

      <header className="App-header">
        <div class="outsidebutton githubbutton" onClick={() => window.open('https://github.com/n0umen0n/sceosetf', "_blank")}><img class="outsideimgright" src="assets/github.png" /><div class="outsidebuttontext">GIT</div></div>
        <div class="outsidebutton telegrambutton" onClick={() => window.open('https://t.me/eosetf', "_blank")}><img class="outsideimgright" src="assets/telegram.webp" /><div class="outsidebuttontext">TG</div></div>
        <div class="outsidebutton twitterbutton" onClick={() => window.open('https://twitter.com/CETF13', "_blank")}><img class="outsideimgright" src="assets/twitter.png" /><div class="outsidebuttontext">TWIT</div></div>
        <div class="outsidebutton mediumbutton" onClick={() => window.open('https://medium.com/@eosetf', "_blank")}><img class="outsideimgright" src="assets/med.png" /><div class="outsidebuttontext">MED</div></div>

        <img src="assets/burger.svg" class="menubutton" onClick={() => toggleDrawer(true)} />
        <div class="maincard">
          <div class="outsidebutton govrnbutton" onClick={() => window.open('https://app.consortium.vote/community/zlmdhu2blclw', "_blank")}><img class="outsideimg" src="assets/consologo.png" /><div class="outsidebuttontext">VOTE</div></div>
          <div class="outsidebutton buybutton" onClick={() => window.open('https://defibox.io/pool-market-details/1232', "_blank")}><img class="outsideimg" src="assets/buylogo.png" /><div class="outsidebuttontext">BUY/SELL</div></div>
          <Drawer
            anchor="right"
            open={drawerstate}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            opacity="0.5"
          >
            <div class="sidemenu">
              <div class="mobilemenu">
                <div class="logo">
                  <img width="64px" src="assets/logo.svg" />
                </div>
                <div class="appname">
                  <a>CETF</a>
                </div>
                <div class="accountname">
                  {accountname == "" ? <a>not logged in</a> : accountname}
                </div>
                <div class="menuitemswrapper">
                  <table class="menuitems">
                    <tr onClick={() => menuClick("create")}>
                      <td><img class="menuimg" src="assets/productbox1.svg" /></td>
                      <td><a class="menuitemtext">Create</a></td>
                    </tr>
                    <tr onClick={() => menuClick("redeem")}>
                      <td><img class="menuimg" src="assets/productbox2.svg" /></td>
                      <td><a class="menuitemtext">Redeem</a></td>
                    </tr>
                    <tr onClick={() => window.open('https://defibox.io/pool-market-details/1232', "_blank")}>
                      <td><img class="menuimg" src="assets/checkout.svg" /></td>
                      <td><a class="menuitemtext">Buy</a></td>
                    </tr>
                    <tr onClick={() => window.open('https://app.consortium.vote/community/zlmdhu2blclw', "_blank")}>
                      <td><img class="menuimg" src="assets/govern.svg" /></td>
                      <td><a class="menuitemtext">Govern</a></td>
                    </tr>
                    <tr onClick={() => window.location='https://polling.eosetf.io'}>
                      <td><img class="menuimg" src="assets/question.svg" /></td>
                      <td><a class="menuitemtext">Poll</a></td>
                    </tr>
                    <tr onClick={() => menuClick("stats")}>
                      <td><img class="menuimg" src="assets/stats.svg" /></td>
                      <td><a class="menuitemtext">Statistics</a></td>
                    </tr>
                    <tr onClick={() => menuClick("about")}>
                      <td><img class="menuimg" src="assets/briefcase.svg" /></td>
                      <td><a class="menuitemtext">Tokens</a></td>
                    </tr>
                    <tr onClick={() => window.open('https://t.me/eosetf', "_blank")}>
                      <td><img class="menuimg" src="assets/telegram.svg" /></td>
                      <td><a class="menuitemtext">Telegram</a></td>
                    </tr>
                    <tr onClick={() => window.open('https://github.com/n0umen0n/sceosetf', "_blank")}>
                      <td><img class="menuimg" src="assets/github.svg" /></td>
                      <td><a class="menuitemtext">Github</a></td>
                    </tr>
                    {accountname == "" ?
                      <tr onClick={() => showModal()}>
                        <td><img class="menuimg" src="assets/login.svg" /></td>
                        <td><a class="menuitemtext">Login</a></td>
                      </tr>
                      :
                      <tr onClick={() => logmeout()}>
                        <td><img class="menuimg" src="assets/logout.svg" /></td>
                        <td><a class="menuitemtext">Logout</a></td>
                      </tr>
                    }
                  </table>
                </div>
              </div>
            </div>
          </Drawer>
          <div class="leftbar">
            <div class="logo">
              <img width="64px" src="assets/logo.svg" />
            </div>
            <div class="appname">
              <a>CETF</a>
            </div>
            <div class="accountname">
              {accountname == "" ? <a>Not logged in</a> : accountname}
            </div>
            <div class="menuitemswrapper">
              <table class="menuitems">
                <tr onClick={() => setView("create")}>
                  <td><img class="menuimg" src="assets/productbox1.svg" /></td>
                  <td><a class="menuitemtext">Create</a></td>
                </tr>
                <tr onClick={() => setView("redeem")}>
                  <td><img class="menuimg" src="assets/productbox2.svg" /></td>
                  <td><a class="menuitemtext">Redeem</a></td>
                </tr>
                <tr onClick={() => window.location='https://polling.eosetf.io'}>
                  <td><img class="menuimg" src="assets/question.svg" /></td>
                  <td><a class="menuitemtext">Poll</a></td>
                </tr>
                <tr onClick={() => setView("stats")}>
                  <td><img class="menuimg" src="assets/stats.svg" /></td>
                  <td><a class="menuitemtext">Statistics</a></td>
                </tr>
                <tr onClick={() => setView("about")}>
                  <td><img class="menuimg" src="assets/briefcase.svg" /></td>
                  <td><a class="menuitemtext">Tokens</a></td>
                </tr>
                {accountname == "" ?
                  <tr onClick={() => showModal()}>
                    <td><img class="menuimg" src="assets/login.svg" /></td>
                    <td><a class="menuitemtext">Login</a></td>
                  </tr>
                  :
                  <tr onClick={() => logmeout()}>
                    <td><img class="menuimg" src="assets/logout.svg" /></td>
                    <td><a class="menuitemtext">Logout</a></td>
                  </tr>
                }
              </table>
            </div>
          </div>
          {view == "create" ?
            <div class="rightbar">
              <div class="rightbartopbox">
                <div class="createetftitle">
                  <div>
                    <a
                    >

                      Create EOSETF


                    </a>
                  </div>
                </div>
                <div className={classes.root}>
                  <Accordion className={classes.expansion}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className={classes.summary}
                    >
                      <Typography className={classes.heading}>Click here for more information</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.expansion2}>
                      <Scrollbars class="mask2" style={{ width: "100%", height: "25vh" }} >
                        <Typography className={classes.heading} style={{ "padding-right": "10px", "padding-bottom": "34px" }}>
                          Creation involves transfer of tokens to cet.f account, the code is unaudited but there is multisig.
                                        <br /> <br />To create EOSETF you have to own 13 different EOS mainnet tokens.
                                        <br /> <br />BUY ALL AND CREATE - buys all the displayed tokens from Defibox and creates EOSETF.
                                        <br /> <br />BUY MISSING AND CREATE - buys only the tokens you are missing from Defibox and creates EOSETF.
                                        <br /> <br />Due to slippage, the displayed valuation of tokens might differ from autobuy purchase price, slippage protection is set to 3%, but please double-check the EOS being transferred before signing the transaction.
                                        <br /> <br />After creation your account is issued EOSETF and CETF tokens (10 CETF per 1 EOSETF).
                                        <br /> <br />CETF will be used as a governance and fee distribution token.
                                      <br />  <br />At 80m CETF (4615 EOSETF / 3 halvings) no more CETF will be issued.
                                      <br /> <br />Redemption fee is set to 5%
                                          </Typography>
                        <div style={{ "display": "block", "opacity": "0" }}>.<br />.<br />.</div>

                      </Scrollbars>
                      <div class="fade" />
                    </AccordionDetails>
                  </Accordion>
                </div>
                <div class="slidertext">
                  <a>Creating <input style={{ "color": tokens > 200 ? "red" : "inherit" }} class="tokeninput" type="number" value={tokens} onChange={e => setTokens(e.target.value)}></input> EOSETF, consisting of tokens valued at <input class="eosvalue" type="number" value={parseFloat(tokens * etfprice).toFixed(2)}></input> EOS </a>
                </div>
                <div class="slider">
                  <CustomSlider
                    defaultValue={0.0000}
                    value={tokens}
                    aria-label="custom thumb label"
                    step={1.0000}
                    min={0}
                    max={200.0000}
                    onChangeCommitted={(e, val) => setTokens(val)}
                    style={{
                      marginBottom: "10px",
                      "margin-top": "10px",
                      color: "white",
                    }}
                  />
                </div>
              </div>
              <Scrollbars class="mask" style={{ width: "100%", height: "90%" }} autoHide >
                <div class="rightbar">
                  {fulldata ? 
                  fulldata.map(row => {
                    if(Number(row.tokeninfund)!==0){
                    return(
                    <div class="smallcard" style={{ "border": (parseFloat(row.minamount.split(" ")[0]) * tokens).toFixed(String(row.decimals).length-1) > getbalance(row) ? "solid 2px red" : "none" }}>
                      <div class="tokenlogo">
                        <img class="tokenlogoimage" height="100%" src={row.image} />
                      </div>
                      <div class="smallcardtext">
                        <a>{(parseFloat(row.minamount.split(" ")[0]) * tokens).toFixed(String(row.decimals).length-1)} {row.minamount.split(" ")[1]} tokens</a>
                      </div>
                      <div class="trxbutton">
                      {(parseFloat(row.minamount.split(" ")[0]) * tokens).toFixed(String(row.decimals).length-1) < getbalance(row) ?
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                        :
                        <img class="trximage" onClick={() => window.open(`https://defibox.io/pool-market-details/${row.pairid}`, "_blank")} height="100%" src="assets/connection.svg" />
                      }
                    </div>
                    </div>
                    )}
                  })
                  :
                  <></>
                  }
                  <div style={{ "display": "block", "opacity": "0" }}>.<br />.<br />.</div>
                </div>
              </Scrollbars>
              <div class="fade" />
              <div class="createbuttonwrapper">
                <button onClick={() => dynamicsend(true)} class="createbutton">Buy missing and Create</button>
                <button onClick={() => dynamicsend(false)} class="createbutton">Buy all and Create</button>
              </div>
            </div>


            : view == "redeem" ?
              <div class="rightbar">
                <div class="rightbartopbox">
                  <div class="createetftitle">
                    <div>
                      <a
                      >

                        Redeem tokens


                      </a>
                    </div>
                  </div>
                  <div className={classes.root}>
                    <Accordion className={classes.expansion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={classes.summary}
                      >
                        <Typography className={classes.heading}>Click here for more information</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={classes.expansion2}>
                        <Typography className={classes.heading} style={{ "padding-right": "10px", "padding-bottom": "46px" }}>
                          To redeem 13 tokens, EOSETF must be sent to cet.f account. <br /><br />
                          Sent EOSETF tokens get burned.<br /><br />
                        Redemption fee is set to 5%.
                      </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  <div class="slidertext">
                    <a>You are redeeming <input class="tokeninput" type="number" value={redeemtokens} onChange={e => setRedeemtokens(e.target.value)}></input> EOSETF</a>
                  </div>
                  <div class="slider">
                    <CustomSlider
                      defaultValue={0.0000}
                      aria-label="custom thumb label"
                      step={1.0000}
                      value={redeemtokens}
                      min={0}
                      max={200.0000}
                      onChangeCommitted={(e, val) => setRedeemtokens(val)}
                      style={{
                        marginBottom: "10px",
                        "margin-top": "10px",
                        color: "white",
                      }}
                    />
                  </div>
                </div>
                <Scrollbars class="mask" style={{ width: "100%", height: "90%" }} autoHide >
                  <div class="rightbar">
                  {fulldata ? 
                  fulldata.map(row => {
                    if(Number(row.tokeninfund)!==0){
                      return(
                    <div class="smallcard">
                      <div class="tokenlogo">
                        <img class="tokenlogoimage" height="100%" src={row.image} />
                      </div>
                      <div class="smallcardtext">
                        <a>{(redeemtokens * row.minamount.split(" ")[0] * redemptionfee).toFixed(String(row.decimals).length-1)} {row.minamount.split(" ")[1]} tokens returned</a>
                      </div>
                      <div class="trxbutton">
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                      </div>
                    </div>
                      )}
                  })
                  :
                  <></>
                  }

                    <div style={{ "display": "block", "opacity": "0" }}>.<br />.<br />.</div>

                  </div>
                </Scrollbars>
                <div class="createbuttonwrapper">
                  <button class="createbutton" onClick={() => sendetf()}>Redeem tokens</button>
                </div>
              </div>

              : view == "stats" ?
                <div class="rightbar">
                  <div class="rightbartopbox">
                    <div class="createetftitle">
                      <div>
                        <a
                        >

                          Statistics
                          <CachedIcon style={{ "margin-left": "5px", "width": "24px", "height": "auto", "vertical-align": "middle" }} onClick={() => refresher()} />
                        </a>

                      </div>
                    </div>
                    <div className={classes.root}>
                      <Accordion className={classes.expansion}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          className={classes.summary}
                        >
                          <Typography className={classes.heading}>Click here for more information</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.expansion2}>
                          <Typography className={classes.heading}>
                            Distribution of CETF will end when circulating supply of EOSETF will be 4615. <br />  <br />
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </div>

                  <Scrollbars class="mask" style={{ width: "80%" }} autoHide >
                    <div class="statcards">
                      <div class="statcard">
                        <a class="stat">{gettokenbalanceone(eosetfbalanceind).toLocaleString()} EOSETF</a><a class="statexplainer">My balance</a>
                      </div>

                      <div class="statcard">
                        <a class="stat">{gettokenbalanceone(etfbalanceind).toLocaleString()} CETF</a><a class="statexplainer">My balance</a>
                      </div>

                      <div class="statcard">
                        <a class="stat">{gettokensupply(eosetfbalance).toLocaleString()} EOSETF</a><a class="statexplainer">Circulating supply</a>
                      </div>

                      <div class="statcard">
                        <a class="stat">{gettokensupply(etfbalance).toLocaleString()} CETF</a><a class="statexplainer">Circulating supply (Max 80m)</a>
                      </div>


                      <div class="statcard">
                        <a class="stat">{creationreward().toLocaleString()} CETF</a><a class="statexplainer"> Issuance per 1 EOSTF</a>
                      </div>
                      <div class="statcard">
                        <a class="stat">{halvings(gettokensupply(etfbalance)).toLocaleString()}</a><a class="statexplainer">Halvings (Max 3)</a>
                      </div>
                      <div class="statcard">
                        <a class="stat">{parseFloat(geteosetfprice().toFixed(2))} EOS</a><a class="statexplainer">EOSETF price</a>
                      </div>
                      <div class="statcard">
                        <a class="stat">{etfprice.toFixed(2)} EOS </a><a class="statexplainer">Price of tokens bought separately</a>
                      </div>
                    </div>
                    <div style={{ "display": "block", "opacity": "0" }}>.<br />.<br />.</div>

                  </Scrollbars>
                  <div class="fade" />
                </div>
                : view == "poll" ?
                  <Poll fulldata={fulldata}/>
                  : view == "about" ?
                    <div class="rightbar">
                      <div class="rightbartopbox">

                        <div class="createetftitle">
                          EOSETF token allocation
                    </div>
                        <div class="slidertext">
                          <a>Chart shows % (in USD) of each token in the fund</a>
                        </div>
                      </div>
                      <div class="chartwrapper">
                        <Doughnut options={{ maintainAspectRatio: false, maxWidth: 300, height: "auto" }} responsive="true" data={data1} legend={{ "position": "bottom" }} />
                      </div>
                    </div>

                    : <a>Error</a>
          }
        </div>
      </header>
    </div>
  );
}

export default withUAL(App);
