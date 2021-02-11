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

  const efxmult = 10.6593
  const dadmult = 1.439439
  const iqmult = 50.082
  const vigmult = 196.7187
  const dappmult = 19.2562
  const boxmult = 0.035523
  const ogxmult = 1.26108207

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
      title: "CETF and EOSETF successfully created!",
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
  const [eosetfbalance, setEosetf] = useState({ rows: [] });
  const [etfbalance, setEtf] = useState({ rows: [] });
  const [eosetfbalanceind, setEosetfind] = useState({ rows: [] });
  const [etfbalanceind, setEtfind] = useState({ rows: [] });

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
                memo: "EOSETF creation",
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
                memo: "EOSETF creation",
                quantity: parseFloat(10.6593 * tokens).toFixed(4) + " EFX",

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
                memo: "EOSETF creation",
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
                memo: "EOSETF creation",
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
                memo: "EOSETF creation",
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
                memo: "EOSETF creation",
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
                memo: "EOSETF creation",
                quantity: parseFloat(dadmult * tokens).toFixed(6) + " DAD",

              },
            },
          ],
        };
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });


        ReactGA.event({
          category: "Chain acion",
          action: "User created EOSETF.",
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


    var eosetf = redeemtokens.toFixed(4);


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
                memo: "EOSETF redemption",
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


        ReactGA.event({
          category: "Chain acion",
          action: "User redeemed tokens.",
        });

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
        <img src="assets/burger.svg" class="menubutton" onClick={toggleDrawer(true)} />
        <div class="maincard">
          <div class="outsidebutton govrnbutton" onClick={() => window.open('https://app.consortium.vote/community/zlmdhu2blclw', "_blank")}><img class="outsideimg" src="assets/consologo.png" /><div class="outsidebuttontext">VOTE</div></div>
          <div class="outsidebutton buybutton" onClick={() => window.open('https://newdex.io/', "_blank")}><img class="outsideimg" src="assets/newdex.png" /><div class="outsidebuttontext">BUY/SELL</div></div>
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
                        "<b>*To create EOSETF your account must hold 7 different tokens:  <br/> DAPP, VIG, IQ, OGX, BOX, EFX and DAD. <br/> <br/> *Creation of each EOSETF issues you CETF tokens (starting with 30k CETF<br/>per 1 EOSETF)  that will be used as a governance and fee distribution token.  <br/> <br/> *Each time 5m CETF are issued the issuance of CETF is halved. <br/> circulation <5m CETF | 1 EOSETF = 30k CETF<br/> circulation <10m CETF | 1 EOSETF = 15k CETF etc. <br/> <br/> *At 30m CETF (21166 EOSETF / 5 halvings) no more CETF will be issued.<br/> <br/> *Due to the initial CETF distribution, when <br/> redeeming tokens 10% less is returned. <br/> <br/>  *NB! Creation involves transfer of tokens to cet.f account,<br/> the code is unaudited, please remember that risk.</b> "


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
                  <a>You are creating <input style={{ "color": tokens > 70 ? "red" : "inherit" }} class="tokeninput" type="number" value={tokens} onChange={e => setTokens(e.target.value)}></input> EOSETF</a>
                </div>
                <div class="slider">
                  <CustomSlider
                    defaultValue={0.0000}
                    value={tokens}
                    aria-label="custom thumb label"
                    step={1.0000}
                    min={0}
                    max={70.0000}
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
                      <a> {parseFloat(10.6593 * tokens).toFixed(4)} EFX tokens</a>
                    </div>
                    <div class="trxbutton">
                      {parseFloat(efxmult * tokens).toFixed(4) < gettokenbalance(efxbalance) ?
                        <img class="trximage" height="100%" src="assets/tick.svg" />
                        :
                        <img class="trximage" onClick={() => window.open('https://defibox.io/pool-market-details/191', "_blank")} height="100%" src="assets/connection.svg" />
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
                  <div style={{ "display": "block" }}>.</div>


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
                          "<b>*To redeem DAPP, VIG, IQ, OGX, BOX, EFX and DAD tokens your account must hold EOSETF. <br/> <br/>*Due to the initial CETF distribution, when <br/> redeeming tokens 10% less is returned.</b> "


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
                      max={70.0000}
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
                    <div style={{ "display": "block" }}>.</div>

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
                            "<b>*It should be fairly quick distribution of CETF <br/> since when aprox. 25k USD worth of EOSETF is created the circulation will be 30m CETF, <br/> meaning the issusance will end.</b> "
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
                    </div>

                  </Scrollbars>
                  <div class="fade" />
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
