import './App.css';
import './Poll.css';
import { Slider } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Scrollbars } from 'react-custom-scrollbars';
import BarChart from './BarChart'
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withUAL } from "ual-reactjs-renderer";
import Swal from "sweetalert2";




const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "14px",
    width: '100%',
  },
  progress: {
    width: '100%',
    fontSize: '10px'
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

const CustomSlider = withStyles({
  root: {
    color: 'rgb(182, 188, 226)',
    height: 8,
  },
  thumb: {
    height: 12,
    width: 12,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -4,
    marginLeft: -4,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
  },
})(Slider);

function Poll(props) {
  const classes = useStyles();
  const [data, setData] = useState();
  const [polldata, setpollData] = useState();
  const [prices, setPrices] = useState();
  const [percentages, setPercentages] = useState([]);
  const [percentagesum, setPercentagesum] = useState();
  const [allocationstate, setAllocationstate] = useState();
  const [counter, setCounter] = useState();
  const [chartdatastate, setChartdatastate] = useState();


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

  const [accountname, setAccountName] = useState("")


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
      title: "Sucessfully voted!",
    });
  };

  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
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
        code: "cet.f",
        table: "etfinfo",
        scope: "cet.f",
        limit: 100,
      }),
    }).then((response) =>
      response.json().then((data) => setData(data.rows))
    );
  }, []);

  useEffect(() => {
    fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "consortiumlv",
        table: "kysimused",
        scope: "zlmdhu2blclw",
        lower_bound: 1111,
        upper_bound: 1111,
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((polldata) => setpollData(polldata.rows))
    );
  }, []);



  useEffect(() => {
    const newdexcomms = [{ community: "box", symbol: "token.defi-box-eos" }, { community: "ogx", symbol: "core.ogx-ogx-eos" }, { community: "iq", symbol: "everipediaiq-iq-eos" }
      , { community: "dapp", symbol: "dappservices-dapp-eos" }, { community: "vig", symbol: "vig111111111-vig-eos" }, { community: "efx", symbol: "effecttokens-efx-eos" }, { community: "chex", symbol: "chexchexchex-chex-eos" }, { community: "pizza", symbol: "pizzatotoken-pizza-eos" }
      , { community: "dfs", symbol: "minedfstoken-dfs-eos" }, { community: "emt", symbol: "emanateoneos-emt-eos" }, { community: "ndx", symbol: "newdexissuer-ndx-eos" }, { community: "tpt", symbol: "eosiotptoken-tpt-eos" }, { community: "dad", symbol: "dadtoken1111-dad-eos" }]
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



  const sumValues = (obj) => Object.keys(obj).reduce((acc, value) => acc + Number(obj[value]), 0);

  const sumpercentages = () => {
    const sum = sumValues(percentages)
    setPercentagesum(sum)
  }


  const cetfvote = async () => {
    const {
      ual: { login, displayError, showModal },
    } = props;
    // Via static contextType = UALContext, access to the activeUser object on this.context is now available
    const {
      ual: { activeUser },
    } = props;


    //var eosetf = Number(redeemtokens).toFixed(4);


    if (activeUser) {
      try {
        const transaction = {
          actions: [
            {
              account: "consortiumlv",
              name: "cetfvote",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                usersvote: [100, 130, 200, 300, 400, 44, 500, 200, 333, 500, 900, 1000, 300],
                pollkey: 1111,
                community: "zlmdhu2blclw",
                voter: displayaccountname(),
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

  const getmult = (token) => {
    if (data) {
      var result = data.filter(obj => {
        return obj.token.split(" ")[1].toLowerCase() == token.toLowerCase()
      })
      var minamountdivider = Math.pow(10, result[0].token.match((/0/g) || []).length)
      var multiplier = result[0].minamount / minamountdivider
      return multiplier
    }
  }

  const getallocation = (token) => {
    const alloc = (getmult(token) * getprice(token) * 100 / getpricesum()).toFixed(4)
    return alloc;
  }

  useEffect(() => {
    if (data && prices) {
      const chartdata = []
      for (let i in data) {
        const token = data[i].token.split(" ")[1]
        chartdata.push({ "token": token, "Current": allocationstate[token], "Reallocated": Math.floor(Math.random() * 10 + 3) })
      }
      setChartdatastate(chartdata)
    }
  }, [allocationstate])

  useEffect(() => {
    const allocations = []
    for (let i in data) {
      const token = data[i].token.split(" ")[1]
      const allocation = getallocation(token)
      allocations[token] = allocation
      if (allocation != "NaN") {
        allocationchange(token, allocation)
      }

    }
    setAllocationstate(allocations)
    setCounter(counter + 1)
  }, [data, prices])

  const getprice = (token) => {
    if (prices) {
      var result = prices.filter(obj => {
        return obj.community.toLowerCase() == token.toLowerCase()
      })
      if (result[0]) {
        return result[0].price
      }
    }
  }

  const getpricesum = () => {
    let sum = 0;
    if (prices && data) {
      for (let i in prices) {
        const multiplication = Number(prices[i].price) * Number(getmult(prices[i].community))
        sum += multiplication
      }
    }
    return sum;
  }

  const allocationchange = (token, percentage) => {
    const changedpercentages = percentages
    changedpercentages[token] = Number(percentage)
    setPercentages(...[changedpercentages])
    sumpercentages()
  }

  const getpercentagesum = () => {
    if (percentagesum) {
      if (percentagesum <= 100 && percentagesum > 0) {
        return <a style={{ "color": "green" }}>{`${percentagesum.toFixed(2)}%`}</a>
      }
      else return <a style={{ "color": "red" }}>{`${percentagesum.toFixed(2)}%`}</a>
    }
  }

  const rendercards = () => {
    const cards = data?.map((d) =>
      <div class="small-card">
        <a class="tokenname">{d.token.split(" ")[1]}</a>
        <div class="input-wrapper"><input key={counter} defaultValue={allocationstate[d.token.split(" ")[1]]} class="tokenamount spinner" onChange={event => allocationchange(d.token.split(" ")[1], event.target.value)}></input></div>
      </div>
    );
    return cards;
  }

  //ONCLICK VOTE 

  return (
    <div class="right-bar">
      <div class="vote-titlearea">
        <div>
          <a class="vote-title">
            Allocation voting
                    </a>
          <div class="totalnumber">Your allocation total: {getpercentagesum()}</div>
        </div>
        <div class="votebutton" onClick={() => cetfvote()}>Vote</div>

      </div>

      <Scrollbars class="mask2" style={{ width: "100%", height: "90%" }} >
        <div class="chartarea">{chartdatastate ? <BarChart data={chartdatastate} /> : <CircularProgress />}</div>
        <div class="card-wrapper">
          {rendercards()}
        </div>
        <div style={{ "display": "block", "opacity": "0" }}>.<br />.<br />.</div>
      </Scrollbars>
      <div class="fade" />
    </div>
  )
}

export default withUAL(Poll);