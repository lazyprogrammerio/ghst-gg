import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';

import { routersStyles } from '../styles';

import { ClientContext } from '../../../contexts/ClientContext';

import GhostLoader from '../../../components/GhostLoader/GhostLoader';

export default function ClientRealm() {
    const classes = routersStyles();
    const { addressInfo, loadingAddressInfo } = useContext(ClientContext);
   
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
                <Typography variant='subtitle1' sx={{ marginRight: '12px' }}>Gotchies estimated value: { parseInt(addressInfo.all_gotchies_estimated_price / 1000)}k GHST</Typography>
               </div>
              <div className={classes.listItem}>
                    <Typography variant='subtitle1' sx={{ marginRight: '12px' }}>Items estimated value: { parseInt(addressInfo.all_items_estimated_price / 1000)}k GHST</Typography>
               </div>
              <div className={classes.listItem}>
                    <Typography variant='subtitle1' sx={{ marginRight: '12px' }}>All gotchies XP: { addressInfo.gotchies_xp / 1000}k ({addressInfo.gotchies_medium_xp}/gotchi)</Typography>
               </div>
              <div className={classes.listItem}>
                    <Typography variant='subtitle1' className={classes.sortText}>All gotchies Kinship: {addressInfo.gotchies_kinship / 1000}k ({addressInfo.gotchies_medium_kinship}/gotchi)</Typography>
               </div>
              <div className={classes.listItem}>
                    <Typography variant='subtitle1' className={classes.sortText}>Gotchies estimated reward: {parseInt(4 * addressInfo.estimated_full_payment_first_round / 1000) }k GHST</Typography>
               </div>
            </Box>

        </>
    );
}
