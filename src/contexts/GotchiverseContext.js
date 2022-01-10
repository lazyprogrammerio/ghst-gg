import React, {createContext, useState} from 'react';
import thegraph from '../api/thegraph';
import commonUtils from '../utils/commonUtils';

export const ClientContext = createContext({});

const ClientContextProvider = (props) => {
    const [clientActive, setClientActive] = useState(null);

    const [mythicalGotchis, setMythicalGotchis] = useState([]);
    const [mythicalGotchisFilter, ] = useState('created_at');
    const [loadingMythicalGotchis, setLoadingMythicalGotchis] = useState(true);

    const [uniqueGotchis, setUniqueGotchis] = useState([]);
    const [uniqueGotchisFilter, ] = useState('created_at');
    const [loadingUniqueGotchis, setLoadingUniqueGotchis] = useState(true);

    const [godlikeGotchis, setGodlikeGotchis] = useState([]);
    const [godlikeGotchisFilter, ] = useState('created_at');
    const [loadingGodlikeGotchis, setLoadingGodlikeGotchis] = useState(true);

    const getClientData = () => {
        getMythicalGotchis(clientActive);
        getUniqueGotchis(clientActive);
        getGodlikeGotchis(clientActive);
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
    };


    const getGodlikeGotchis = (address) => {
        setLoadingGodlikeGotchis(true);

        thegraph.getGodlikeGotchiesData(address).then((response)=> {

            let [gFilter, gDir] = getFilter(godlikeGotchisFilter);
            setGodlikeGotchis(commonUtils.basicSort(response, gFilter, gDir));
		console.log(response)
            setLoadingGodlikeGotchis(false);
        }).catch((error) => {
            console.log(error);
            setUniqueGotchis([]);
            setLoadingUniqueGotchis(false);
        });
    };

    const getUniqueGotchis = (address) => {
        setLoadingUniqueGotchis(true);

        thegraph.getUniqueGotchiesData(address).then((response)=> {

            let [gFilter, gDir] = getFilter(uniqueGotchisFilter);
            setUniqueGotchis(commonUtils.basicSort(response, gFilter, gDir));
		console.log(response)
            setLoadingUniqueGotchis(false);
        }).catch((error) => {
            console.log(error);
            setUniqueGotchis([]);
            setLoadingUniqueGotchis(false);
        });
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

            uniqueGotchis,
            uniqueGotchisFilter,
            loadingUniqueGotchis,
            setUniqueGotchis,

            godlikeGotchis,
            godlikeGotchisFilter,
            loadingGodlikeGotchis,
            setGodlikeGotchis,

            getClientData,
            sortData
        }}>
            { props.children }
        </ClientContext.Provider>
    )
}

export default ClientContextProvider;
