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

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "14px",
    width: '100%',
  },
  heading: {
    fontSize: "14px",
    color: "#534C80",
    fontFamily: "'Roboto', sans-serif",
    margin:0
  },
  summary: {
    padding:0,
  },
  expansion: {
    backgroundColor:"rgba( 255, 255, 255, 0 )",
    boxShadow:"none",
    borderRadius:"100px",
    marginLeft:0,
},
expansion2: {
  fontSize:"10px"
}
}));

function AccordionItem(props) {


const classes = useStyles();


  return (


                <div className={classes.root}>
                  <Accordion className={classes.expansion}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className={classes.summary}
                    >
                      <Typography className={classes.heading}>Read more about it...</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.expansion2}>
                    <Scrollbars class="mask2" style={{ width: "100%", height: "25vh"}} autoHide >
                      <Typography className={classes.heading} style={{"padding-right":"10px", "padding-bottom":"40px"}}>
                        *NB! Creation involves transfer of tokens to cet.f account, the code is unaudited and at this point there is no multisig.
                        <br/>*To create EOSETF your account must hold 13 different EOS mainnet tokens.
                        <br/>*After creation your account is issued EOSETF and CETF tokens (starting with 30k CETF per 1 EOSETF).
                        <br/> CETF will be used as a governance and fee distribution token.
                        <br/> *Each time 5m CETF are issued the issuance of CETF is halved.
                        <br/> circulation &lt;5m CETF | 1 EOSETF = 30k CETF<br/> circulation 5m to 10m (CETF) | 1 EOSETF = 15k CETF
                        <br/> circulation 10m to 15m (CETF) | 1 EOSETF = 7.5k CETF etc.
                        <br/>*At 30m CETF (21166 EOSETF / 5 halvings) no more CETF will be issued.
                        <br/>*Due to the initial CETF distribution, when redeeming tokens 10% less is returned. <br/>
                      </Typography>
                    </Scrollbars>
                    <div class="fade" />
                    </AccordionDetails>
                  </Accordion>
                </div>

  );
}

export default AccordionItem;
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
