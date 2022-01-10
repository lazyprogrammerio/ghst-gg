import React, { useContext } from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Tooltip, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { loadRewardsStyles, routersStyles } from '../styles';

import { ClientContext } from '../../../contexts/GotchiverseContext';
import commonUtils from '../../../utils/commonUtils';

import Gotchi from '../../../components/Gotchi/GotchiSmall';
import GhostLoader from '../../../components/GhostLoader/GhostLoader';
import ghstIcon from '../../../assets/images/ghst-doubleside.gif';

export default function ClientGotchis() {
    const classes = {
        ...loadRewardsStyles(),
        ...routersStyles()
    };
    const { uniqueGotchis, loadingUniqueGotchis, sortData} = useContext(ClientContext);


    if(loadingUniqueGotchis || !uniqueGotchis.length) {
        return <Box className={classes.loaderBox}>
            <GhostLoader
                animate={loadingUniqueGotchis || !uniqueGotchis.length}
                text={!loadingUniqueGotchis && !uniqueGotchis.length ? 'No gotchis here :(' : null}
            />
        </Box>
    }

    return (
        <>
            <Box className={classes.list}>
                {
                    uniqueGotchis.map((gotchi, i)=>{
                        return <div className={classes.listItem}  key={i}>
                            <Gotchi 
                                gotchi={gotchi}
                                render={[
                                    {
                                        badges: [
                                        ]
                                    },
				    'svg',
					'numericTraits',
					'modifiedNnumericTraits',
                                    'name',
                                ]}
                            />
                        </div>
                    })
                }
            </Box>
        </>
    );
}
