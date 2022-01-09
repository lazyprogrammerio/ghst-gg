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
            <Box className={classes.list}>
              <div className={classes.listItem}>
                <Typography variant='subtitle1' sx={{ marginRight: '12px' }}>Gotchies estimated value: { parseInt(addressInfo.all_gotchies_estimated_price)} GHST</Typography>
               </div>
              <div className={classes.listItem}>
                    <Typography variant='subtitle1' sx={{ marginRight: '12px' }}>Items estimated value: { parseInt(addressInfo.all_items_estimated_price)} GHST</Typography>
               </div>
              <div className={classes.listItem}>
                    <Typography variant='subtitle1' sx={{ marginRight: '12px' }}>All gotchies XP: { addressInfo.gotchies_xp } ({addressInfo.gotchies_medium_xp}/gotchi)</Typography>
               </div>
              <div className={classes.listItem}>
                    <Typography variant='subtitle1' className={classes.sortText}>All gotchies Kinship: {addressInfo.gotchies_kinship } ({addressInfo.gotchies_medium_kinship}/gotchi)</Typography>
               </div>
              <div className={classes.listItem}>
                    <Typography variant='subtitle1' className={classes.sortText}>Gotchies estimated reward: {parseInt(4 * addressInfo.estimated_full_payment_first_round) } GHST</Typography>
               </div>
            </Box>

        </>
    );
}
