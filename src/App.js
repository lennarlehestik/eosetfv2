import logo from './logo.svg';
import './App.css';
import { Slider } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { withUAL } from "ual-reactjs-renderer";
import { Scrollbars } from 'react-custom-scrollbars';
import Drawer from '@material-ui/core/Drawer';

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
  const [tokens, setTokens] = useState(1)
  const [view, setView] = useState("create")
  const [accountname, setAccountName] = useState("")

  const logmeout = () => {
    logout()
    setAccountName("")
  }
  


  const send = async () => {
    const {
      ual: { login, displayError, showModal },
    } = props;
    // Via static contextType = UALContext, access to the activeUser object on this.context is now available
    const {
      ual: { activeUser },
    } = props;

    var efx = tokens.toFixed(4);

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
                quantity: 2.1563 * tokens + " DAPP",
                memo: "test",

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
                quantity: efx + " EFX",
                memo: "test2",

              },
            },


          ],
        };
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });
        //alert("GREAT SUCCESS!")
        window.location.reload(false);

      } catch (error) {
        //if (error.message.startsWith("TypeError: Cannot") == true) {

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


    var eosetf = tokens.toFixed(4);


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
                memo: "test",

              },
            },


          ],
        };
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });
        //alert("GREAT SUCCESS!")
        window.location.reload(false);

      } catch (error) {
        //if (error.message.startsWith("TypeError: Cannot") == true) {

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
        <img src="assets/burger.svg" class="menubutton" onClick={toggleDrawer(true)} />
        <div class="maincard">
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
            <a>EOSETF</a>
          </div>
          <div class="accountname">
            {accountname == "" ? <a>not signed in</a> : accountname}
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
              <tr onClick={() => window.open('https://newdex.io/', "_blank")}>
                <td><img class="menuimg" src="assets/checkout.svg" /></td>
                <td><a class="menuitemtext">Buy</a></td>
              </tr>
              <tr onClick={() => window.open('https://app.consortium.vote/', "_blank")}>
                <td><img class="menuimg" src="assets/govern.svg" /></td>
                <td><a class="menuitemtext">Govern</a></td>
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
              <a>EOSETF</a>
            </div>
            <div class="accountname">
              {accountname == "" ? <a>not signed in</a> : accountname}
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
                <tr onClick={() => window.open('https://newdex.io/', "_blank")}>
                  <td><img class="menuimg" src="assets/checkout.svg" /></td>
                  <td><a class="menuitemtext">Buy</a></td>
                </tr>
                <tr onClick={() => window.open('https://app.consortium.vote/', "_blank")}>
                  <td><img class="menuimg" src="assets/govern.svg" /></td>
                  <td><a class="menuitemtext">Govern</a></td>
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
                <a>Create EOSETF</a>
              </div>
              <div class="slidertext">
                <a>You are creating <a class="highlighttext">{tokens}</a> EOSETF.</a>
              </div>
              <div class="slider">
                <CustomSlider
                  defaultValue={1.0000}
                  aria-label="custom thumb label"
                  step={1.0000}
                  min={0}
                  max={10.0000}
                  onChangeCommitted={(e, val) => setTokens(val)}
                  style={{
                    marginBottom: "10px",
                    "margin-top": "10px",
                    color: "white",
                  }}
                />
              </div>
            </div>
            <Scrollbars style={{ width: "100%", height: "90%" }} autoHide >
            <div class="rightbar">
            <div class="smallcard">
              <div class="tokenlogo">
                <img class="tokenlogoimage" height="100%" src="https://assets.coingecko.com/coins/images/8116/large/dapp-logo.jpg?1554996565" />
              </div>
              <div class="smallcardtext">
                <a>Send: 100 DAPP tokens</a>
              </div>
              <div class="trxbutton">
                <img class="trximage" height="100%" src="assets/connection.svg" />
              </div>
            </div>

            <div class="smallcard">
              <div class="tokenlogo">
                <img class="tokenlogoimage" height="100%" src="https://assets.coingecko.com/coins/images/8116/large/dapp-logo.jpg?1554996565" />
              </div>
              <div class="smallcardtext">
                <a>Send: 100 DAPP tokens</a>
              </div>
              <div class="trxbutton">
                <img class="trximage" height="100%" src="assets/connection.svg" />
              </div>
            </div>

            <div class="smallcard">
              <div class="tokenlogo">
                <img class="tokenlogoimage" height="100%" src="https://assets.coingecko.com/coins/images/8116/large/dapp-logo.jpg?1554996565" />
              </div>
              <div class="smallcardtext">
                <a>Send: 100 DAPP tokens</a>
              </div>
              <div class="trxbutton">
                <img class="trximage" height="100%" src="assets/connection.svg" />
              </div>
            </div>

            <div class="smallcard">
              <div class="tokenlogo">
                <img class="tokenlogoimage" height="100%" src="https://assets.coingecko.com/coins/images/8116/large/dapp-logo.jpg?1554996565" />
              </div>
              <div class="smallcardtext">
                <a>Send: 100 DAPP tokens</a>
              </div>
              <div class="trxbutton">
                <img class="trximage" height="100%" src="assets/connection.svg" />
              </div>
            </div>

            <div class="smallcard">
              <div class="tokenlogo">
                <img class="tokenlogoimage" height="100%" src="https://assets.coingecko.com/coins/images/8116/large/dapp-logo.jpg?1554996565" />
              </div>
              <div class="smallcardtext">
                <a>Send: 100 DAPP tokens</a>
              </div>
              <div class="trxbutton">
                <img class="trximage" height="100%" src="assets/connection.svg" />
              </div>
            </div>

            <div class="smallcard">
              <div class="tokenlogo">
                <img class="tokenlogoimage" height="100%" src="https://assets.coingecko.com/coins/images/8116/large/dapp-logo.jpg?1554996565" />
              </div>
              <div class="smallcardtext">
                <a>Send: 100 DAPP tokens</a>
              </div>
              <div class="trxbutton">
                <img class="trximage" height="100%" src="assets/connection.svg" />
              </div>
            </div>

            <div class="smallcard">
              <div class="tokenlogo">
                <img class="tokenlogoimage" height="100%" src="https://assets.coingecko.com/coins/images/8116/large/dapp-logo.jpg?1554996565" />
              </div>
              <div class="smallcardtext">
                <a>Send: 100 DAPP tokens</a>
              </div>
              <div class="trxbutton">
                <img class="trximage" height="100%" src="assets/connection.svg" />
              </div>
            </div>
            </div>
            </Scrollbars>
            <div class="fade" />
            <button onClick={() => send()} class="createbutton">Create EOSETF</button>
          </div>
          : view == "redeem" ?
          <div class="rightbar">
            <div class="rightbartopbox">
              <div class="createetftitle">
                <a>Redeem EOSETF</a>
              </div>
              <div class="slidertext">
                <a>You are redeeming <a class="highlighttext">{tokens}</a> EOSETF.</a>
              </div>
              <div class="slider">
                <CustomSlider
                  defaultValue={1.0000}
                  aria-label="custom thumb label"
                  step={1.0000}
                  min={0}
                  max={10.0000}
                  onChangeCommitted={(e, val) => setTokens(val)}
                  style={{
                    marginBottom: "10px",
                    "margin-top": "10px",
                    color: "white",
                  }}
                />
              </div>
            </div>
            <Scrollbars style={{ width: "100%", height: "90%" }} autoHide >
            <div class="rightbar">
            <div class="smallcard">
              <div class="tokenlogo">
                <img class="tokenlogoimage" height="100%" src="https://assets.coingecko.com/coins/images/8116/large/dapp-logo.jpg?1554996565" />
              </div>
              <div class="smallcardtext">
                <a>You will get: 100 DAPP tokens</a>
              </div>
              <div class="trxbutton">
                <img class="trximage" height="100%" src="assets/connection.svg" />
              </div>
            </div>

            <div class="smallcard">
              <div class="tokenlogo">
                <img class="tokenlogoimage" height="100%" src="https://assets.coingecko.com/coins/images/8116/large/dapp-logo.jpg?1554996565" />
              </div>
              <div class="smallcardtext">
                <a>You will get: 100 DAPP tokens</a>
              </div>
              <div class="trxbutton">
                <img class="trximage" height="100%" src="assets/connection.svg" />
              </div>
            </div>

            <div class="smallcard">
              <div class="tokenlogo">
                <img class="tokenlogoimage" height="100%" src="https://assets.coingecko.com/coins/images/8116/large/dapp-logo.jpg?1554996565" />
              </div>
              <div class="smallcardtext">
                <a>You will get: 100 DAPP tokens</a>
              </div>
              <div class="trxbutton">
                <img class="trximage" height="100%" src="assets/connection.svg" />
              </div>
            </div>

            <div class="smallcard">
              <div class="tokenlogo">
                <img class="tokenlogoimage" height="100%" src="https://assets.coingecko.com/coins/images/8116/large/dapp-logo.jpg?1554996565" />
              </div>
              <div class="smallcardtext">
                <a>You will get: 100 DAPP tokens</a>
              </div>
              <div class="trxbutton">
                <img class="trximage" height="100%" src="assets/connection.svg" />
              </div>
            </div>
            </div>
            </Scrollbars>
            <button class="createbutton" onClick={() => sendetf()}>Redeem EOSETF</button>
          </div>
          : <a>Error</a>
          }
        </div>
      </header>
    </div>
  );
}

export default withUAL(App);
