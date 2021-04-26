import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import {Box, CircularProgress, Grid} from '@material-ui/core';
import thegraph from '../../../../api/thegraph';
import commonUtils from '../../../../utils/commonUtils';
import { portalsQuery } from './queries';
import openedPortal from '../../../../assets/images/portal-opened.gif';
import sealedPortal from '../../../../assets/images/portal-sealed.svg';

export default function Portals() {
    const classes = useStyles();
    const [dataSpinner, setDataSpinner] = useState(true);
    const [openedPortals, setOpenedPortals] = useState(0);
    const [gotchiClaimed, setGotchiClaimed] = useState(0);
    const [eegg, setEegg] = useState(false);

    useEffect(() => {
        getGraphData();
    }, []);

    const getGraphData = () => {
        setDataSpinner(true);
        thegraph.getData(portalsQuery)
            .then((response) => {
                setOpenedPortals(response.data.statistic.portalsOpened);
                setGotchiClaimed(response.data.statistic.aavegotchisClaimed);
                setDataSpinner(false);
            });
    };
    
    const getSealedPortals = () => {
        return commonUtils.formatNumber(10000 - openedPortals);
    };
    
    const getOpenedPortalsPercentage = () => {
        return (openedPortals / 10000 * 100).toFixed(2);
    };

    function onPortalClick() {
        setEegg(!eegg);
    }

    return (
        <Grid
            container
            alignItems='center'
            justify='center'
        >
            <Grid className={classes.portalsColumn} item xs={12} md={4}>
                <Box align='center' className={classes.portalsDescr}>
                    {dataSpinner ? (
                        <CircularProgress component='span' className={classes.highlight} color="inherit" size={22}/>
                    ) : (
                        <Box component='span' className={classes.highlight}>
                            { eegg ? getSealedPortals() : `${getOpenedPortalsPercentage()}%` }
                        </Box>
                    )}
                    <Box component='span'>
                        { eegg ? `/${commonUtils.formatNumber(10000)} are sealed!` : ' portals are opened!' }
                    </Box>
                </Box>
            </Grid>
            <Grid className={classes.portalsColumn} container item justify='center' xs={12} md={2}>
                <img
                  src={eegg ? sealedPortal : openedPortal }
                  className={classes.portalsImage}
                  onClick={onPortalClick}
                  alt='Portal'
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <Box align='center' className={classes.portalsDescr}>
                    {dataSpinner ? (
                        <CircularProgress component='span' className={classes.highlight} color="inherit" size={22}/>
                    ) : (
                        <Box component='span' className={classes.highlight}>
                            {commonUtils.formatNumber(gotchiClaimed)}
                        </Box>
                    )}
                    <Box component='span'> gotchis are sumonned </Box>
                    <Link className={classes.explorerLink} to='/explorer'>Aavegotchi Explorer</Link>
                </Box>
            </Grid>
        </Grid>
    );
}