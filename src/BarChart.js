import './App.css';
import './Poll.css';
import { Slider } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Scrollbars } from 'react-custom-scrollbars';
import { ResponsiveBar } from '@nivo/bar'

const BarChart = React.memo(props => {
  const colors = { 'Current': 'rgb(0, 183, 255)', 'Reallocated': 'rgb(240, 107, 255)'}
  const getColor = bar => colors[bar.id]
  const data = props.data
    const MyResponsiveBar = ({ data /* see data tab */ }) => (
        <ResponsiveBar
            data={data}
            keys={[ 'Current', 'Reallocated']}
            indexBy="token"
            margin={{ top: 20, right: 130, bottom: 50, left: 70 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={getColor}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            axisTop={null}
            groupMode='grouped'
            layout="horizontal"
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Percentage of portfolio',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />
    )
    return(
            <MyResponsiveBar data = {data}/>
    )
}
)

export default BarChart;