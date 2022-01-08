import React, { useContext } from 'react';
import { Box, Toolbar, Snackbar, Alert, Button, Link } from '@mui/material';

import { SnackbarContext } from '../../contexts/SnackbarContext';
import MusicButton from '../../components/MusicButton/MusicButton';

import styles from './styles';

function FooterAlert(props) {
    return <Alert elevation={6} variant='filled' {...props} />;
}

export default function Footer() {
    const classes = styles(),
        { isOpen, type, message, onSnackbarClose } = useContext(SnackbarContext);

    return (
        <Box className={classes.footerWrapper}>
            <Toolbar className={classes.toolbar}>
                <div>
                    <span className={classes.highlight}>v0.31</span>
                    <span className={classes.footerCopyright}>
                        aavegotchi.land is the <a href='https://github.com/lazyprogrammerio/ghst-gg' rel='noreferrer' target='_blank'>open-source</a>, <a href='https://www.aavegotchi.com/' rel='noreferrer' target='_blank'>gotchiverse</a> unicorn friendly client. Developed by <a href='https://twitter.com/orden_gg' rel='noreferrer' target='_blank'>ordenGG</a>, lazyprogrammer {'&'} contributors.
                    </span>
                </div>
                <div className={classes.buttons}>
                </div>
            </Toolbar>
            <Snackbar open={isOpen} autoHideDuration={3000} onClose={() => onSnackbarClose()}>
                <FooterAlert onClose={() => onSnackbarClose()} severity={type}>
                    {message}
                </FooterAlert>
            </Snackbar>
        </Box>
    )
}
