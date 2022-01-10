import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useRouteMatch } from 'react-router';

import { NavLink } from 'react-router-dom';

import { ClientContext } from '../../../contexts/ClientContext';

import gotchiPlaceholder from '../../../assets/images/gotchi-placeholder.svg';
import warehousePlaceholder from '../../../assets/wearables/15.svg';
import infoPlaceholder from '../../../assets/wearables/traits.svg';
import ticketsPlaceholder from '../../../assets/tickets/rare.svg';
import realmPlaceholder from '../../../assets/images/icons/kek.png';
import ContentLoader from 'react-content-loader';

import { clientNavStyles } from '../styles';

export default function ClientNav() {
    const match = useRouteMatch();
    const classes = clientNavStyles();
    const theme = useTheme();

    const { 
        clientActive,
        gotchis, loadingGotchis,
        mythicalGotchis, loadingMythicalGotchis,
        warehouse, loadingWarehouse,
        tickets, loadingTickets,
        realm, loadingRealm,
	addressInfo, loadingAddressInfo
     } = useContext(ClientContext);

    return (
        <div className={classes.container}>
	    <Button
                disabled={!mythicalGotchis.length}
                startIcon={
                    <img src={gotchiPlaceholder} alt='gotchi' width={24} height={24} />
                }
                component={NavLink}
                className={classes.button}
                activeClassName='active'
                to={{ pathname: `${match.url}/mythical-gotchis`, search: `?address=${clientActive}` }}
            >
                Myth Eyes
                {
                    loadingMythicalGotchis ? (
                        <ContentLoader
                            speed={2}
                            viewBox='0 0 28 14'
                            backgroundColor={theme.palette.secondary.main}
                            foregroundColor={theme.palette.primary.dark}
                            className={classes.buttonLoader}
                        >
                            <rect x='0' y='0' width='28' height='14' />
                        </ContentLoader>
                    ) : (
                        <span className={classes.label}>[{mythicalGotchis.length}]</span>
                    )
                }
            </Button>
        </div>
    );
}
