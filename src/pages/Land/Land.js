import React, { useContext, useEffect } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { Box } from '@mui/system';
import { Helmet } from 'react-helmet';
import { Route, Switch, Redirect, useRouteMatch, useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import styles from './styles';
import commonUtils from '../../utils/commonUtils';

import { LoginContext } from '../../contexts/LoginContext';
import { ClientContext } from '../../contexts/GotchiverseContext';

import LoginNavigation from '../../components/Login/LoginNavigation';
import ClientNav from './components/ClientNav';
import ClientGotchisMythical from './routes/ClientGotchisDoubleMythicalEyes';

export default function Client() {
    const classes = styles();
    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();

    const params = queryString.parse(location.search);

    const { activeAddress } = useContext(LoginContext);
    const { clientActive, setClientActive, getClientData } = useContext(ClientContext);

    useEffect(() => {
        if(activeAddress) {
            setClientActive(activeAddress);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeAddress]);

    useEffect(() => {
        if(params.address) {
            setClientActive(params.address);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.address]);

    useEffect(() => {
        if(clientActive) {
            getClientData();
            history.push({ path: location.pathname, search: `?address=${clientActive}` });
        } else {
            history.push({ path: location.pathname });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientActive]);

    return (
        <Box className={classes.container}>
            <Helmet>
                <title>
                    {clientActive ?
                        `${commonUtils.cutAddress(activeAddress, '...')} || ${location.pathname.split('/')[2]}`
                        : 'Client'}
                </title>
            </Helmet>

            {!clientActive?.length ? (
                <Box className={classes.alertWrapper}>
                    <Box className={classes.alertInner}>
                        <Alert severity='info' className={classes.alert}>
                            <AlertTitle>Fren, provide the address!</AlertTitle>
                            You cannot use the client without a valid ETH address.
                        </Alert>

                        <LoginNavigation />
                    </Box>
                </Box>
            ) : (
                <>
                    <ClientNav />
                    <Switch>
                        <Route path={`${match.path}/mythical-gotchis`} component={ ClientGotchisMythical } />
                        <Redirect from={match.path} to={`${match.path}/mythical-gotchis`} />
                    </Switch>
                </>
            )}

        </Box>
    );
}
