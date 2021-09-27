import React, {useContext} from "react";
import Grid from "@material-ui/core/Grid";
import {Button, TextField} from "@material-ui/core";
import { BaazaarContext } from "../../../../../../contexts/BaazaarContext";
import useStyles from "./styles";

export default function Filters({handleFindClick}) {
    const classes = useStyles();
    const {setNRG, setAGG, setSPK, setBRN, setEYS, setEYC} = useContext(BaazaarContext);

    const onNRGChange = (event) => {
        setNRG(event.target.value);
    };

    const onAGGChange = (event) => {
        setAGG(event.target.value);
    };

    const onSPKChange = (event) => {
        setSPK(event.target.value);
    };

    const onBRNChange = (event) => {
        setBRN(event.target.value);
    };

    const onEYSChange = (event) => {
        setEYS(event.target.value);
    };

    const onEYCChange = (event) => {
        setEYC(event.target.value);
    };

    const onFindClick = () => {
        handleFindClick();
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={10}>
                <Grid container spacing={2} className={classes.container}>
                    <Grid item xs={2}>
                        <TextField
                            type='text'
                            variant='outlined'
                            fullWidth
                            size={'small'}
                            label={'NRG'}
                            onChange={onNRGChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            type='text'
                            variant='outlined'
                            fullWidth
                            size={'small'}
                            label={'AGG'}
                            onChange={onAGGChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            type='text'
                            variant='outlined'
                            fullWidth
                            size={'small'}
                            label={'SPK'}
                            onChange={onSPKChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            type='text'
                            variant='outlined'
                            fullWidth
                            size={'small'}
                            label={'BRN'}
                            onChange={onBRNChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            type='text'
                            variant='outlined'
                            fullWidth
                            size={'small'}
                            label={'EYS'}
                            onChange={onEYSChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            type='text'
                            variant='outlined'
                            fullWidth
                            size={'small'}
                            label={'EYC'}
                            onChange={onEYCChange}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={2}>
                <Button
                    variant={'outlined'}
                    color={'primary'}
                    fullWidth
                    onClick={() => onFindClick()}
                >Find</Button>
            </Grid>
        </Grid>
    );
}
