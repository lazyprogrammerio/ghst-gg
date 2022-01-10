import React, {createContext, useState} from 'react';
import thegraph from '../api/thegraph';
import web3 from '../api/web3';
import commonUtils from '../utils/commonUtils';
import graphUtils from '../utils/graphUtils';
import itemUtils from '../utils/itemUtils';

export const ClientContext = createContext({});

const ClientContextProvider = (props) => {
    const [clientActive, setClientActive] = useState(null);

    const [mythicalGotchis, setMythicalGotchis] = useState([]);
    const [mythicalGotchisFilter, setMythicalGotchisFilter] = useState('created_at');
    const [loadingMythicalGotchis, setLoadingMythicalGotchis] = useState(true);

    const getClientData = () => {
        getMythicalGotchis(clientActive);
    };

    const getFilter = (filter) => {
        let asc = filter?.includes('Asce');
        let desc = filter?.includes('Desc');
        let dir = 'desc';
        let modified = filter;

        if(asc || desc) {
            modified = filter.slice(0, -4);
            asc ? dir = 'asc' : dir = 'desc';
        }

        return [modified, dir];
    }

    const sortData = (event, newFilter, setter) => {
        let [filter, dir] = getFilter(newFilter);

    };

    const getMythicalGotchis = (address) => {
        setLoadingMythicalGotchis(true);

        thegraph.getDoubleMythGotchiesData(address).then((response)=> {

            let [gFilter, gDir] = getFilter(mythicalGotchisFilter);
            setMythicalGotchis(commonUtils.basicSort(response, gFilter, gDir));
		console.log(response)
            setLoadingMythicalGotchis(false);
        }).catch((error) => {
            console.log(error);
            setMythicalGotchis([]);
            setLoadingMythicalGotchis(false);
        });
    };

    return (
        <ClientContext.Provider value={{
            clientActive,
            setClientActive,

            mythicalGotchis,
            mythicalGotchisFilter,
            loadingMythicalGotchis,
            setMythicalGotchis,

            getClientData,
            sortData
        }}>
            { props.children }
        </ClientContext.Provider>
    )
}

export default ClientContextProvider;
