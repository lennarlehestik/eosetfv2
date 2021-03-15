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
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

function App(props) {




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

  /*
    const efxmult = 2.6911
    const dadmult = 0.880282
    const iqmult = 26.233
    const vigmult = 125.0000
    const dappmult = 12.6263
    const boxmult = 0.036075
    const ogxmult = 2.13675214

    const chexmult = 56.94760820
    const pizzamult = 9.4696
    const dfsmult = 0.0361
    const emtmult = 16.3399
    const ndxmult = 338.5071
    const tptmult = 17.9856
  */



  const efxmult = 2.6911
  const dadmult = 0.880282
  const iqmult = 26.233
  const vigmult = 125.0000
  const dappmult = 12.6263
  const boxmult = 0.036075
  const ogxmult = 2.13675214

  const chexmult = 56.94760820
  const pizzamult = 5.4696
  const dfsmult = 0.0140
  const emtmult = 16.3399
  const ndxmult = 338.5071
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


  const [ogxbalance, setOgx] = useState({ rows: [] });
  const [dadbalance, setDad] = useState({ rows: [] });
  const [boxbalance, setBox] = useState({ rows: [] });
  const [vigbalance, setVig] = useState({ rows: [] });
  const [iqbalance, setIq] = useState({ rows: [] });
  const [efxbalance, setEfx] = useState({ rows: [] });
  const [dappbalance, setDapp] = useState({ rows: [] });

  const [chexbalance, setChex] = useState({ rows: [] });
  const [pizzabalance, setPizza] = useState({ rows: [] });
  const [dfsbalance, setDfs] = useState({ rows: [] });
  const [emtbalance, setEmt] = useState({ rows: [] });
  const [ndxbalance, setNdx] = useState({ rows: [] });
  const [tptbalance, setTpt] = useState({ rows: [] });

  const [govrnprice, setGovrnprice] = useState({ rows: [] });
  const [dadpriceeos, setDadprice] = useState({ rows: [] });

  const [prices, setPrices] = useState([]);

  const [eosetfbalance, setEosetf] = useState({ rows: [] });
  const [etfbalance, setEtf] = useState({ rows: [] });
  const [eosetfbalanceind, setEosetfind] = useState({ rows: [] });
  const [etfbalanceind, setEtfind] = useState({ rows: [] });

  const menuClick = (which) => {
    setView(which)
    setDrawerstate(false)
  }

  /*

    const getdata = () => {
      fetch('https://api.newdex.io/v1/price?symbol=consortiumlv-govrn-eos')
        .then(response => response.json())
        .then(data => console.log(data.data.price));

      );

    }
    '

  useEffect(() => {
    fetch('https://api.newdex.io/v1/price?symbol=consortiumlv-govrn-eos', {
    }).then((response) =>
      response.json().then((govrnprice) => setGovrnprice(govrnprice.data.price))
    );
    console.log(govrnprice);

  }, [accountname]);


  const getdata = () => {
    fetch('https://api.newdex.io/v1/price?symbol=consortiumlv-govrn-eos', {
    }).then((response) =>
      response.json().then((govrnprice) => setGovrnprice(govrnprice.data.price))
    );
    console.log(govrnprice);
  }




    useEffect(() => {
      fetch('https://api.newdex.io/v1/price?symbol=consortiumlv-govrn-eos', {
    }).then((response) =>
      response.json().then((govrnprice) => setGovrnprice(govrnprice))
    );
    console.log(govrnprice);

    }, [accountname]);



    */



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
    fetch('https://api.newdex.io/v1/price?symbol=consortiumlv-govrn-eos', {
    }).then((response) =>
      response.json().then((govrnprice) => setGovrnprice(govrnprice.data.price))
    );
    console.log(govrnprice);

  }, [accountname]);


  useEffect(() => {
    const newdexcomms = [{ community: "box", symbol: "token.defi-box-eos" }, { community: "ogx", symbol: "core.ogx-ogx-eos" }, { community: "iq", symbol: "everipediaiq-iq-eos" }
      , { community: "dapp", symbol: "dappservices-dapp-eos" }, { community: "vig", symbol: "vig111111111-vig-eos" }, { community: "efx", symbol: "effecttokens-efx-eos" }, { community: "chex", symbol: "chexchexchex-chex-eos" }, { community: "pizza", symbol: "pizzatotoken-pizza-eos" }
      , { community: "dfs", symbol: "minedfstoken-dfs-eos" }, { community: "emt", symbol: "emanateoneos-emt-eos" }, { community: "ndx", symbol: "newdexissuer-ndx-eos" }, { community: "tpt", symbol: "eosiotptoken-tpt-eos" }]
    newdexcomms.forEach((item) => {
      fetch('https://api.newdex.io/v1/price?symbol=' + item.symbol)
        .then(response => response.json())
        .then(data => {
          Object.assign(item, { price: data?.data?.price })
          setPrices([...newdexcomms]);
        }
        )
    })
    console.log(prices)
  }, [accountname]);

  const getprice = (community) => {
    if (prices) {
      const datar = prices.filter(
        function (data) { return data.community == community }
      );
      if (datar[0])
        return datar[0].price
    }
  }


  const getdadprice = () => {
    if (dadpriceeos.rows[0]) {
      return Number(dadpriceeos.rows[0].price1_last);
    }
    else {
      return 0;
    }
  };

  const getpricesum = () => {
    if (prices) {



      return getprice("box") * boxmult + getprice("ogx") * ogxmult + getprice("iq") * iqmult + getprice("dapp") * dappmult + getprice("vig") * vigmult + getprice("efx") * efxmult + getprice("chex") * chexmult
        + getprice("pizza") * pizzamult + getprice("dfs") * dfsmult + getprice("emt") * emtmult + getprice("ndx") * ndxmult + getprice("tpt") * tptmult + getdadprice() * dadmult;


    }
  }







  const data = {
    labels: ['BOX', 'OGX', 'IQ', 'DAPP', 'VIG', 'EFX', 'CHEX', 'PIZZA', 'DFS', 'EMT', 'NDX', 'TPT', 'DAD'],
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
        data: [parseFloat((getprice("box") * boxmult / getpricesum() * 100)).toFixed(2), parseFloat((getprice("ogx") * ogxmult / getpricesum() * 100)).toFixed(2), parseFloat((getprice("iq") * iqmult / getpricesum() * 100)).toFixed(2), parseFloat((getprice("dapp") * dappmult / getpricesum() * 100)).toFixed(2),
        parseFloat((getprice("vig") * vigmult / getpricesum() * 100)).toFixed(2), parseFloat((getprice("efx") * efxmult / getpricesum() * 100)).toFixed(2), parseFloat((getprice("chex") * chexmult / getpricesum() * 100)).toFixed(2), parseFloat((getprice("pizza") * pizzamult / getpricesum() * 100)).toFixed(2),
        parseFloat((getprice("dfs") * dfsmult / getpricesum() * 100)).toFixed(2), parseFloat((getprice("emt") * emtmult / getpricesum() * 100)).toFixed(2), parseFloat((getprice("ndx") * ndxmult / getpricesum() * 100)).toFixed(2), parseFloat((getprice("tpt") * tptmult / getpricesum() * 100)).toFixed(2), parseFloat((getdadprice() * dadmult / getpricesum() * 100)).toFixed(2)]
      }
    ]
  };



  //price1_last


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
        limit: 3,
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
        table: "statnew",
        scope: "ETF",
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
        table: "statnew",
        scope: "EOSETF",
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((eosetfbalance) => setEosetf(eosetfbalance))
    );
  }, [accountname]);







  useEffect(() => {
    if (accountname) {
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "core.ogx",
          table: "accounts",
          scope: displayaccountname(),
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((ogxbalance) => setOgx(ogxbalance))
      );
    }
  }, [accountname]);



  useEffect(() => {
    if (accountname) {
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "dadtoken1111",
          table: "accounts",
          scope: displayaccountname(),
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((dadbalance) => setDad(dadbalance))
      );
    }
  }, [accountname]);



  useEffect(() => {
    if (accountname) {
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "token.defi",
          table: "accounts",
          scope: displayaccountname(),
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((boxbalance) => setBox(boxbalance))
      );
    }
  }, [accountname]);



  useEffect(() => {
    if (accountname) {
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "vig111111111",
          table: "accounts",
          scope: displayaccountname(),
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((vigbalance) => setVig(vigbalance))
      );
    }
  }, [accountname]);



  useEffect(() => {
    if (accountname) {
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "everipediaiq",
          table: "accounts",
          scope: displayaccountname(),
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((iqbalance) => setIq(iqbalance))

      );
    }
  }, [accountname]);


  useEffect(() => {
    if (accountname) {
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "effecttokens",
          table: "accounts",
          scope: displayaccountname(),
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((efxbalance) => setEfx(efxbalance))
      );
    }
  }, [accountname]);




  useEffect(() => {
    if (accountname) {
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "dappservices",
          table: "accounts",
          scope: displayaccountname(),
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((dappbalance) => setDapp(dappbalance))
      );
    }
  }, [accountname]);












  useEffect(() => {
    if (accountname) {
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "chexchexchex",
          table: "accounts",
          scope: displayaccountname(),
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((chexbalance) => setChex(chexbalance))
      );
    }
  }, [accountname]);



  useEffect(() => {
    if (accountname) {
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "pizzatotoken",
          table: "accounts",
          scope: displayaccountname(),
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((pizzabalance) => setPizza(pizzabalance))
      );
    }
  }, [accountname]);



  useEffect(() => {
    if (accountname) {
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "minedfstoken",
          table: "accounts",
          scope: displayaccountname(),
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((dfsbalance) => setDfs(dfsbalance))
      );
    }
  }, [accountname]);



  useEffect(() => {
    if (accountname) {
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "emanateoneos",
          table: "accounts",
          scope: displayaccountname(),
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((emtbalance) => setEmt(emtbalance))

      );
    }
  }, [accountname]);


  useEffect(() => {
    if (accountname) {
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "newdexissuer",
          table: "accounts",
          scope: displayaccountname(),
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((ndxbalance) => setNdx(ndxbalance))
      );
    }
  }, [accountname]);




  useEffect(() => {
    if (accountname) {
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "eosiotptoken",
          table: "accounts",
          scope: displayaccountname(),
          limit: 1,
        }),
      }).then((response) =>
        response.json().then((tptbalance) => setTpt(tptbalance))
      );
    }
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
            5000000
          )
        )
      );
    }
  };




  const creationreward = () => {
    return parseInt(
      120000 /
      halvingdivider()
    );
  };


  const halvings = (totalcirc) => {
    if (totalcirc < 5000000) {
      return 0;
    } else if (totalcirc >> 5000000 && totalcirc < 10000000) {
      return 1;
    } else if (totalcirc >> 10000000 && totalcirc < 15000000) {
      return 2;
    } else if (totalcirc >> 15000000 && totalcirc < 20000000) {
      return 3;
    } else if (totalcirc >> 20000000 && totalcirc < 25000000) {
      return 4;
    } else if (totalcirc >> 25000000 && totalcirc < 30000000) {
      return 5;
    }
  };







  const send = async () => {
    const {
      ual: { login, displayError, showModal },
    } = props;
    // Via static contextType = UALContext, access to the activeUser object on this.context is now available
    const {
      ual: { activeUser },
    } = props;

    //console.log(getdapp())

    if (activeUser) {
      try {
        const transaction = {
          actions: [
            {
              account: "dappservices",
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
                quantity: parseFloat(dappmult * tokens).toFixed(4) + " DAPP",

              },
            },


            {
              account: "effecttokens",
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
                //quantity: 10.6593 * tokens + " EFX",
                memo: "EOSETF creation through eosetf.io",
                quantity: parseFloat(efxmult * tokens).toFixed(4) + " EFX",

              },
            },



            {
              account: "core.ogx",
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
                //quantity: 1.26108207 * tokens + " OGX",
                memo: "EOSETF creation through eosetf.io",
                quantity: parseFloat(ogxmult * tokens).toFixed(8) + " OGX",
              },
            },




            {
              account: "everipediaiq",
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
                //quantity: 50.082 * tokens + " IQ",
                memo: "EOSETF creation through eosetf.io",
                quantity: parseFloat(iqmult * tokens).toFixed(3) + " IQ",

              },
            },



            {
              account: "vig111111111",
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
                //quantity: 196.7187 * tokens + " VIG",
                memo: "EOSETF creation through eosetf.io",
                quantity: parseFloat(vigmult * tokens).toFixed(4) + " VIG",

              },
            },


            {
              account: "token.defi",
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
                //quantity: 0.035523 * tokens + " BOX",
                memo: "EOSETF creation through eosetf.io",
                quantity: parseFloat(boxmult * tokens).toFixed(6) + " BOX",

              },
            },


            {
              account: "dadtoken1111",
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
                //quantity: efxmult * tokens + " DAD",
                memo: "EOSETF creation through eosetf.io",
                quantity: parseFloat(dadmult * tokens).toFixed(6) + " DAD",

              },
            },





            {
              account: "pizzatotoken",
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
                //quantity: 10.6593 * tokens + " EFX",
                memo: "EOSETF creation through eosetf.io",
                quantity: parseFloat(pizzamult * tokens).toFixed(4) + " PIZZA",

              },
            },



            {
              account: "chexchexchex",
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
                //quantity: 10.6593 * tokens + " EFX",
                memo: "EOSETF creation through eosetf.io",
                quantity: parseFloat(chexmult * tokens).toFixed(8) + " CHEX",

              },
            },

            {
              account: "newdexissuer",
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
                //quantity: 10.6593 * tokens + " EFX",
                memo: "EOSETF creation through eosetf.io",
                quantity: parseFloat(ndxmult * tokens).toFixed(4) + " NDX",

              },
            },

            {
              account: "eosiotptoken",
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
                //quantity: 10.6593 * tokens + " EFX",
                memo: "EOSETF creation through eosetf.io",
                quantity: parseFloat(tptmult * tokens).toFixed(4) + " TPT",

              },
            },

            {
              account: "emanateoneos",
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
                //quantity: 10.6593 * tokens + " EFX",
                memo: "EOSETF creation through eosetf.io",
                quantity: parseFloat(emtmult * tokens).toFixed(4) + " EMT",

              },
            },


            {
              account: "minedfstoken",
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
                //quantity: 10.6593 * tokens + " EFX",
                memo: "EOSETF creation through eosetf.io",
                quantity: parseFloat(dfsmult * tokens).toFixed(4) + " DFS",

              },
            },




          ],
        };
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });



        sucessstake();

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
            },


          ],
        };
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });

        sucessredemption();
        /*
        
                ReactGA.event({
                  category: "Chain acion",
                  action: "User redeemed tokens.",
                });
        */
        //alert("GREAT SUCCESS!")
        //window.location.reload(false);

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

  const compare = () => {
    const a = parseFloat(vigmult * tokens).toFixed(4)
    const b = gettokenbalance(vigbalance)
    const c = Math.floor(a * 100) > Math.floor(b * 100)
    return c

  }


  return (

    <div className="App">
      <ReactTooltip id="all" place="bottom" type="dark"
        effect="solid"
        backgroundColor="black"
        style={{
          fontWeight: "bold",
        }} />

      <header className="App-header">
        <div class="outsidebutton githubbutton" onClick={() => window.open('https://github.com/n0umen0n/sceosetf', "_blank")}><img class="outsideimgright" src="assets/github.png" /><div class="outsidebuttontext">GIT</div></div>
        <div class="outsidebutton telegrambutton" onClick={() => window.open('https://t.me/eosetf', "_blank")}><img class="outsideimgright" src="assets/telegram.webp" /><div class="outsidebuttontext">TG</div></div>
        <div class="outsidebutton twitterbutton" onClick={() => window.open('https://twitter.com/CETF13', "_blank")}><img class="outsideimgright" src="assets/twitter.png" /><div class="outsidebuttontext">TWIT</div></div>
        <div class="outsidebutton mediumbutton" onClick={() => window.open('https://medium.com/@eosetf', "_blank")}><img class="outsideimgright" src="assets/med.png" /><div class="outsidebuttontext">MED</div></div>

        <img src="assets/burger.svg" class="menubutton" onClick={toggleDrawer(true)} />
        <div class="maincard">
          <div class="outsidebutton govrnbutton" onClick={() => window.open('https://app.consortium.vote/community/zlmdhu2blclw', "_blank")}><img class="outsideimg" src="assets/consologo.png" /><div class="outsidebuttontext">VOTE</div></div>
          <div class="outsidebutton buybutton" onClick={() => window.open('https://newdex.io/', "_blank")}><img class="outsideimg" src="assets/buylogo.png" /><div class="outsidebuttontext">BUY/SELL</div></div>
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
                    <tr onClick={() => window.open('https://newdex.io/', "_blank")}>
                      <td><img class="menuimg" src="assets/checkout.svg" /></td>
                      <td><a class="menuitemtext">Buy</a></td>
                    </tr>
                    <tr onClick={() => window.open('https://app.consortium.vote/', "_blank")}>
                      <td><img class="menuimg" src="assets/govern.svg" /></td>
                      <td><a class="menuitemtext">Govern</a></td>
                    </tr>
                    <tr onClick={() => menuClick("stats")}>
                      <td><img class="menuimg" src="assets/stats.svg" /></td>
                      <td><a class="menuitemtext">Statistics</a></td>
                    </tr>
                    <tr onClick={() => menuClick("about")}>
                      <td><img class="menuimg" src="assets/briefcase.svg" /></td>
                      <td><a class="menuitemtext">Tokens</a></td>
                    </tr>
                    <tr onClick={() => window.open('https://telegram.org/', "_blank")}>
                      <td><img class="menuimg" src="assets/telegram.svg" /></td>
                      <td><a class="menuitemtext">Telegram</a></td>
                    </tr>
                    <tr onClick={() => window.open('https://github.com/', "_blank")}>
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
                      //class="value"
                      data-html="true"
                      data-for="all"

                      data-tip={
                        "<b>   *NB! Creation involves transfer of tokens to cet.f account,<br/> the code is unaudited and at this point there is no multisig. <br/> <br/> *To create EOSETF your account must hold 13 different EOS mainnet tokens.  <br/> <br/> *After creation your account is issued EOSETF and CETF tokens <br/> (starting with 65k CETF per 1 EOSETF). <br/> <br/> *CETF will be used as a governance and fee distribution token.  <br/> <br/> *Each time 20m CETF are issued the issuance of CETF is halved. <br/> circulation 0m to 20m (CETF) | 1 EOSETF = 65k CETF<br/> circulation 20m to 40m (CETF) | 1 EOSETF = 32.5k CETF <br/> circulation 40m to 60m (CETF) | 1 EOSETF = 16.250k CETF <br/> circulation 60m to 80m (CETF) | 1 EOSETF = 8.125k CETF <br/> <br/> *At 80m CETF (4615 EOSETF / 3 halvings) no more CETF will be issued.<br/> <br/> *Due to the initial CETF distribution, redemption of tokens <br/> will be activated after the CETF distribution or latest 31.04.2021 18:00 UTC. <br/> <br/> *Redemption fee is set to 5%."


                      }
                      style={{
                        fontWeight: "bold",
                      }}
                    >

                      Create EOSETF

                    <InfoIcon

                        style={{
                          height: "20px",
                          width: "20px",
                          color: "black",
                          opacity: "0.7",
                          "margin-left": "2px",
                          "vertical-align": "top",
                          "margin-top": "-4px",

                          fontWeight: "bold",
                        }}
                      />

                    </a>
                  </div>
                </div>
                <div class="slidertext">
                  <a>You are creating <input style={{ "color": tokens > 200 ? "red" : "inherit" }} class="tokeninput" type="number" value={tokens} onChange={e => setTokens(e.target.value)}></input> EOSETF</a>
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
                  <div class="smallcard" style={{ "border": parseFloat(dappmult * tokens).toFixed(4) > gettokenbalance(dappbalance) ? "solid 2px red" : "none" }}>
                    <div class="tokenlogo">
                      <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/dapp.png" />
                    </div>
                    <div class="smallcardtext">
                      <a> {parseFloat(dappmult * tokens).toFixed(4)} DAPP tokens</a>
                    </div>
                    <div class="trxbutton">
                      {parseFloat(dappmult * tokens).toFixed(4) < gettokenbalance(dappbalance) ?
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                        :
                        <img class="trximage" onClick={() => window.open('https://defibox.io/pool-market-details/193', "_blank")} height="100%" src="assets/connection.svg" />
                      }
                    </div>
                  </div>

                  <div class="smallcard" style={{ "border": compare(vigmult, tokens, vigbalance) ? "solid 2px red" : "none" }}>
                    <div class="tokenlogo">
                      <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/vigor.png" />
                    </div>
                    <div class="smallcardtext">
                      <a> {parseFloat(vigmult * tokens).toFixed(4)} VIG tokens</a>
                    </div>
                    <div class="trxbutton">
                      {parseFloat(vigmult * tokens).toFixed(4) < gettokenbalance(vigbalance) ?
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                        :
                        <img class="trximage" onClick={() => window.open('https://defibox.io/pool-market-details/11', "_blank")} height="100%" src="assets/connection.svg" />
                      }
                    </div>
                  </div>

                  <div class="smallcard" style={{ "border": parseFloat(iqmult * tokens).toFixed(3) > gettokenbalance(iqbalance) ? "solid 2px red" : "none" }}>
                    <div class="tokenlogo">
                      <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/everipedia.png" />
                    </div>
                    <div class="smallcardtext">
                      <a> {parseFloat(iqmult * tokens).toFixed(3)} IQ tokens</a>
                    </div>
                    <div class="trxbutton">
                      {parseFloat(iqmult * tokens).toFixed(3) < gettokenbalance(iqbalance) ?
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                        :
                        <img class="trximage" onClick={() => window.open('https://defibox.io/pool-market-details/93', "_blank")} height="100%" src="assets/connection.svg" />
                      }
                    </div>
                  </div>

                  <div class="smallcard" style={{ "border": parseFloat(ogxmult * tokens).toFixed(8) > gettokenbalance(ogxbalance) ? "solid 2px red" : "none" }}>
                    <div class="tokenlogo">
                      <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/ogx.png" />
                    </div>
                    <div class="smallcardtext">
                      <a> {parseFloat(ogxmult * tokens).toFixed(8)} OGX tokens</a>
                    </div>
                    <div class="trxbutton">
                      {parseFloat(ogxmult * tokens).toFixed(8) < gettokenbalance(ogxbalance) ?
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                        :
                        <img class="trximage" onClick={() => window.open('https://defibox.io/pool-market-details/878', "_blank")} height="100%" src="assets/connection.svg" />
                      }
                    </div>
                  </div>

                  <div class="smallcard" style={{ "border": parseFloat(boxmult * tokens).toFixed(6) > gettokenbalance(boxbalance) ? "solid 2px red" : "none" }}>
                    <div class="tokenlogo">
                      <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/tokendefi.png" />
                    </div>
                    <div class="smallcardtext">
                      <a> {parseFloat(boxmult * tokens).toFixed(6)} BOX tokens</a>
                    </div>
                    <div class="trxbutton">
                      {parseFloat(boxmult * tokens).toFixed(6) < gettokenbalance(boxbalance) ?
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                        :
                        <img class="trximage" onClick={() => window.open('https://defibox.io/pool-market-details/878', "_blank")} height="100%" src="assets/connection.svg" />
                      }
                    </div>
                  </div>

                  <div class="smallcard" style={{ "border": parseFloat(efxmult * tokens).toFixed(4) > gettokenbalance(efxbalance) ? "solid 2px red" : "none" }}>
                    <div class="tokenlogo">
                      <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/efx.png" />
                    </div>
                    <div class="smallcardtext">
                      <a> {parseFloat(efxmult * tokens).toFixed(4)} EFX tokens</a>
                    </div>
                    <div class="trxbutton">
                      {parseFloat(efxmult * tokens).toFixed(4) < gettokenbalance(efxbalance) ?
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                        :
                        <img class="trximage" onClick={() => window.open('https://defibox.io/pool-market-details/191', "_blank")} height="100%" src="assets/connection.svg" />
                      }
                    </div>
                  </div>



                  <div class="smallcard" style={{ "border": parseFloat(pizzamult * tokens).toFixed(4) > gettokenbalance(pizzabalance) ? "solid 2px red" : "none" }}>
                    <div class="tokenlogo">
                      <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/pizza.png" />
                    </div>
                    <div class="smallcardtext">
                      <a> {parseFloat(pizzamult * tokens).toFixed(4)} PIZZA tokens</a>
                    </div>
                    <div class="trxbutton">
                      {parseFloat(pizzamult * tokens).toFixed(4) < gettokenbalance(pizzabalance) ?
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                        :
                        <img class="trximage" onClick={() => window.open('https://defibox.io/pool-market-details/14', "_blank")} height="100%" src="assets/connection.svg" />
                      }
                    </div>
                  </div>

                  <div class="smallcard" style={{ "border": parseFloat(chexmult * tokens).toFixed(8) > gettokenbalance(chexbalance) ? "solid 2px red" : "none" }}>
                    <div class="tokenlogo">
                      <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/chex.png" />
                    </div>
                    <div class="smallcardtext">
                      <a> {parseFloat(chexmult * tokens).toFixed(8)} CHEX tokens</a>
                    </div>
                    <div class="trxbutton">
                      {parseFloat(chexmult * tokens).toFixed(8) < gettokenbalance(chexbalance) ?
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                        :
                        <img class="trximage" onClick={() => window.open('https://defibox.io/pool-market-details/28', "_blank")} height="100%" src="assets/connection.svg" />
                      }
                    </div>
                  </div>

                  <div class="smallcard" style={{ "border": parseFloat(ndxmult * tokens).toFixed(4) > gettokenbalance(ndxbalance) ? "solid 2px red" : "none" }}>
                    <div class="tokenlogo">
                      <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/ndx.png" />
                    </div>
                    <div class="smallcardtext">
                      <a> {parseFloat(ndxmult * tokens).toFixed(4)} NDX tokens</a>
                    </div>
                    <div class="trxbutton">
                      {parseFloat(ndxmult * tokens).toFixed(4) < gettokenbalance(ndxbalance) ?
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                        :
                        <img class="trximage" onClick={() => window.open('https://defibox.io/pool-market-details/1', "_blank")} height="100%" src="assets/connection.svg" />
                      }
                    </div>
                  </div>

                  <div class="smallcard" style={{ "border": parseFloat(tptmult * tokens).toFixed(4) > gettokenbalance(tptbalance) ? "solid 2px red" : "none" }}>
                    <div class="tokenlogo">
                      <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/tpt.png" />
                    </div>
                    <div class="smallcardtext">
                      <a> {parseFloat(tptmult * tokens).toFixed(4)} TPT tokens</a>
                    </div>
                    <div class="trxbutton">
                      {parseFloat(tptmult * tokens).toFixed(4) < gettokenbalance(tptbalance) ?
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                        :
                        <img class="trximage" onClick={() => window.open('https://defibox.io/pool-market-details/4', "_blank")} height="100%" src="assets/connection.svg" />
                      }
                    </div>
                  </div>

                  <div class="smallcard" style={{ "border": parseFloat(emtmult * tokens).toFixed(4) > gettokenbalance(emtbalance) ? "solid 2px red" : "none" }}>
                    <div class="tokenlogo">
                      <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/emt.png" />
                    </div>
                    <div class="smallcardtext">
                      <a> {parseFloat(emtmult * tokens).toFixed(4)} EMT tokens</a>
                    </div>
                    <div class="trxbutton">
                      {parseFloat(emtmult * tokens).toFixed(4) < gettokenbalance(emtbalance) ?
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                        :
                        <img class="trximage" onClick={() => window.open('https://defibox.io/pool-market-details/255', "_blank")} height="100%" src="assets/connection.svg" />
                      }
                    </div>
                  </div>



                  <div class="smallcard" style={{ "border": parseFloat(dfsmult * tokens).toFixed(4) > gettokenbalance(dfsbalance) ? "solid 2px red" : "none" }}>
                    <div class="tokenlogo">
                      <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/dfs.png" />
                    </div>
                    <div class="smallcardtext">
                      <a> {parseFloat(dfsmult * tokens).toFixed(4)} DFS tokens</a>
                    </div>
                    <div class="trxbutton">
                      {parseFloat(dfsmult * tokens).toFixed(4) < gettokenbalance(dfsbalance) ?
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                        :
                        <img class="trximage" onClick={() => window.open('https://defibox.io/pool-market-details/22', "_blank")} height="100%" src="assets/connection.svg" />
                      }
                    </div>
                  </div>



                  <div class="smallcard" style={{ "border": parseFloat(dadmult * tokens).toFixed(6) > gettokenbalance(dadbalance) ? "solid 2px red" : "none" }}>
                    <div class="tokenlogo">
                      <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/dad.png" />
                    </div>
                    <div class="smallcardtext">
                      <a> {parseFloat(dadmult * tokens).toFixed(6)} DAD tokens</a>
                    </div>
                    <div class="trxbutton">
                      {parseFloat(dadmult * tokens).toFixed(6) < gettokenbalance(dadbalance) ?
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                        :
                        <img class="trximage" onClick={() => window.open('https://defibox.io/pool-market-details/588', "_blank")} height="100%" src="assets/connection.svg" />
                      }
                    </div>
                  </div>
                  <div style={{ "display": "block", "opacity": "0" }}>.<br />.<br />.</div>

                </div>
              </Scrollbars>
              <div class="fade" />
              <button onClick={() => send()} class="createbutton">Create EOSETF</button>
            </div>


            : view == "redeem" ?
              <div class="rightbar">
                <div class="rightbartopbox">
                  <div class="createetftitle">
                    <div>
                      <a
                        //class="value"
                        data-html="true"
                        data-for="all"

                        data-tip={
                          "<b>*To redeem 13 tokens your account must hold EOSETF. <br/> <br/> *Due to the initial CETF distribution, redemption of tokens <br/> will be activated after the CETF distribution or latest 31.04.2021 18:00 UTC. <br/> <br/> *Redemption fee is set to 5%."


                        }
                        style={{
                          fontWeight: "bold",
                        }}
                      >

                        Redeem tokens

                    <InfoIcon

                          style={{
                            height: "20px",
                            width: "20px",
                            color: "black",
                            opacity: "0.7",
                            "margin-left": "2px",
                            "vertical-align": "top",
                            "margin-top": "-4px",

                            fontWeight: "bold",
                          }}
                        />

                      </a>
                    </div>
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
                    <div class="smallcard">
                      <div class="tokenlogo">
                        <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/dapp.png" />
                      </div>
                      <div class="smallcardtext">
                        <a>{(redeemtokens * dappmult).toFixed(4)} DAPP tokens returned</a>
                      </div>
                      <div class="trxbutton">
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                      </div>
                    </div>

                    <div class="smallcard">
                      <div class="tokenlogo">
                        <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/vigor.png" />
                      </div>
                      <div class="smallcardtext">
                        <a>{(redeemtokens * vigmult).toFixed(4)} VIG tokens returned</a>
                      </div>
                      <div class="trxbutton">
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                      </div>
                    </div>

                    <div class="smallcard">
                      <div class="tokenlogo">
                        <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/everipedia.png" />
                      </div>
                      <div class="smallcardtext">
                        <a>{(redeemtokens * iqmult).toFixed(3)} IQ tokens returned</a>
                      </div>
                      <div class="trxbutton">
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                      </div>
                    </div>

                    <div class="smallcard">
                      <div class="tokenlogo">
                        <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/ogx.png" />
                      </div>
                      <div class="smallcardtext">
                        <a>{(redeemtokens * ogxmult).toFixed(8)} OGX tokens returned</a>
                      </div>
                      <div class="trxbutton">
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                      </div>
                    </div>

                    <div class="smallcard">
                      <div class="tokenlogo">
                        <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/tokendefi.png" />
                      </div>
                      <div class="smallcardtext">
                        <a>{(redeemtokens * boxmult).toFixed(6)} BOX tokens returned</a>
                      </div>
                      <div class="trxbutton">
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                      </div>
                    </div>

                    <div class="smallcard">
                      <div class="tokenlogo">
                        <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/efx.png" />
                      </div>
                      <div class="smallcardtext">
                        <a>{(redeemtokens * efxmult).toFixed(4)} EFX tokens returned</a>
                      </div>
                      <div class="trxbutton">
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                      </div>
                    </div>

                    <div class="smallcard">
                      <div class="tokenlogo">
                        <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/dad.png" />
                      </div>
                      <div class="smallcardtext">
                        <a>{(redeemtokens * dadmult).toFixed(6)} DAD tokens returned</a>
                      </div>
                      <div class="trxbutton">
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                      </div>
                    </div>


                    <div class="smallcard">
                      <div class="tokenlogo">
                        <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/dfs.png" />
                      </div>
                      <div class="smallcardtext">
                        <a>{(redeemtokens * dfsmult).toFixed(4)} DFS tokens returned</a>
                      </div>
                      <div class="trxbutton">
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                      </div>
                    </div>

                    <div class="smallcard">
                      <div class="tokenlogo">
                        <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/emt.png" />
                      </div>
                      <div class="smallcardtext">
                        <a>{(redeemtokens * emtmult).toFixed(4)} EMT tokens returned</a>
                      </div>
                      <div class="trxbutton">
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                      </div>
                    </div>

                    <div class="smallcard">
                      <div class="tokenlogo">
                        <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/tpt.png" />
                      </div>
                      <div class="smallcardtext">
                        <a>{(redeemtokens * tptmult).toFixed(4)} TPT tokens returned</a>
                      </div>
                      <div class="trxbutton">
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                      </div>
                    </div>

                    <div class="smallcard">
                      <div class="tokenlogo">
                        <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/ndx.png" />
                      </div>
                      <div class="smallcardtext">
                        <a>{(redeemtokens * ndxmult).toFixed(4)} NDX tokens returned</a>
                      </div>
                      <div class="trxbutton">
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                      </div>
                    </div>

                    <div class="smallcard">
                      <div class="tokenlogo">
                        <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/chex.png" />
                      </div>
                      <div class="smallcardtext">
                        <a>{(redeemtokens * chexmult).toFixed(8)} CHEX tokens returned</a>
                      </div>
                      <div class="trxbutton">
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                      </div>
                    </div>

                    <div class="smallcard">
                      <div class="tokenlogo">
                        <img class="tokenlogoimage" height="100%" src="assets/tokenlogos/pizza.png" />
                      </div>
                      <div class="smallcardtext">
                        <a>{(redeemtokens * pizzamult).toFixed(4)} PIZZA tokens returned</a>
                      </div>
                      <div class="trxbutton">
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                      </div>
                    </div>



                    <div style={{ "display": "block", "opacity": "0" }}>.<br />.<br />.</div>

                  </div>
                </Scrollbars>
                <button class="createbutton" onClick={() => sendetf()}>Redeem tokens</button>
              </div>

              : view == "stats" ?
                <div class="rightbar">
                  <div class="rightbartopbox">
                    <div class="createetftitle">
                      <div>
                        <a
                          //class="value"
                          data-html="true"
                          data-for="all"

                          data-tip={
                            "<b>*Distribution of CETF will end when 4615 EOSETF will be created. <br/> <br/> *Approximate value of 4615 EOSETF = 25k USD.</b> "
                          }
                          style={{
                            fontWeight: "bold",
                          }}
                        >

                          Statistics
                    <InfoIcon

                            style={{
                              height: "20px",
                              width: "20px",
                              color: "black",
                              opacity: "0.7",
                              "margin-left": "2px",
                              "vertical-align": "top",
                              "margin-top": "-4px",

                              fontWeight: "bold",
                            }}
                          />

                        </a>
                      </div>
                    </div>
                  </div>

                  <br /> <br />

                  <Scrollbars class="mask" style={{ width: "80%" }} autoHide >
                    <div class="statcards">
                      <div class="statcard">
                        <a class="stat">{gettokenbalancetwo(eosetfbalanceind).toLocaleString()} EOSETF</a><a class="statexplainer">My balance</a>
                      </div>

                      <div class="statcard">
                        <a class="stat">{gettokenbalanceone(eosetfbalanceind).toLocaleString()} CETF</a><a class="statexplainer">My balance</a>
                      </div>

                      <div class="statcard">
                        <a class="stat">{gettokensupply(etfbalance).toLocaleString()} CETF</a><a class="statexplainer">Circulating supply (Max 30m)</a>
                      </div>

                      <div class="statcard">
                        <a class="stat">{gettokensupply(eosetfbalance).toLocaleString()} EOSETF</a><a class="statexplainer">Circulating supply</a>
                      </div>
                      <div class="statcard">
                        <a class="stat">{creationreward().toLocaleString()} CETF</a><a class="statexplainer"> Issuance per 1 EOSTF</a>
                      </div>
                      <div class="statcard">
                        <a class="stat">{halvings(gettokensupply(etfbalance)).toLocaleString()}</a><a class="statexplainer">Halvings (Max 5)</a>
                      </div>
                      <div class="statcard">
                        <a class="stat">{parseFloat(getpricesum().toFixed(2))} EOS</a><a class="statexplainer">EOSETF price</a>
                      </div>
                      <div class="statcard">
                        <a class="stat">{parseFloat(getpricesum().toFixed(2))} EOS </a><a class="statexplainer">Price of tokens bought separately</a>
                      </div>
                    </div>
                    <div style={{ "display": "block", "opacity": "0" }}>.<br />.<br />.</div>

                  </Scrollbars>
                  <div class="fade" />
                </div>
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
                      <Doughnut data={data} legend={{ "position": "bottom" }} />
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
//                      <a> My balance: {gettokenbalance(etfbalanceind)} CETF  </a>                       <a>Total supply: {gettokensupply(etfbalance)} CETF  </a>                       <a>Total supply: {gettokensupply(eosetfbalance)} EOSETF  </a>
/*



                      <a> Current supply: {gettokensupply(etfbalance)} CETF (Distribution ends at 30m CETF, no more CETF will be issued) </a>
                      <br></br><br></br>

                      <a>Current supply: {gettokensupply(eosetfbalance)} EOSETF </a>
                      <br></br><br></br>

                      <a>Issuance per 1 EOSETF: {creationreward()} CETF   </a>

                      <br></br><br></br>

                      <a>Halvings: {halvings(gettokensupply(etfbalance))}   </a>

*/
