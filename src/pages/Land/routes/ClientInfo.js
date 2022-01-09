import React, { useContext } from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton, Tooltip  } from '@mui/material';

import { routersStyles } from '../styles';

import { ClientContext } from '../../../contexts/ClientContext';

import Parcel from '../../../components/Items/Parcel/Parcel';

import fud from '../../../assets/images/icons/fud.png';
import fomo from '../../../assets/images/icons/fomo.png';
import alpha from '../../../assets/images/icons/alpha.png';
import kek from '../../../assets/images/icons/kek.png';
import GhostLoader from '../../../components/GhostLoader/GhostLoader';

export default function ClientRealm() {
    const classes = routersStyles();
    const { addressInfo, addressInfoFilter, loadingAddressInfo, sortData } = useContext(ClientContext);
   
    if(loadingAddressInfo || !addressInfo) {
        return <Box  className={classes.loaderBox}>
            <GhostLoader
                animate={loadingAddressInfo || !addressInfo}
                text={!loadingAddressInfo && !addressInfo ? 'No info here :(' : null}
            />
        </Box>
    }

    return (
        <>
            <Box className={classes.sortWrapper}>
                <Box className={classes.sortInner}>
                    <Typography variant='subtitle1' sx={{ marginRight: '12px' }}>Aggregated Gotchies XP: { addressInfo.gotchies_xp } </Typography>
                </Box>

                <Box className={classes.sortInner}>
                    <Typography variant='subtitle1' className={classes.sortText}>Average Gotchies XP: {addressInfo.gotchies_medium_xp } </Typography>
                </Box>

                <Box className={classes.sortInner}>
                    <Typography variant='subtitle1' className={classes.sortText}>Aggregated Gotchies Kinship: {addressInfo.gotchies_kinship } </Typography>
                </Box>

                <Box className={classes.sortInner}>
                    <Typography variant='subtitle1' className={classes.sortText}>Average Gotchies Kinship: {addressInfo.gotchies_medium_kinship } </Typography>
                </Box>
            </Box>

        </>
    );
}
