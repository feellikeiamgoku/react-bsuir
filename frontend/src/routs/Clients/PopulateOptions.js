import {useEffect} from 'react';
import {apiUrl} from '../../Constanst'


const PopulateOptions = (endpoint, setter) => {

    useEffect(() => {
        async function fetchOptions () {
        const resp = await fetch(apiUrl + endpoint);
        const data = await resp.json();
        const options = createOptions(data);
        setter(options);
        }
        fetchOptions();
    }, [])

    const createOptions = (data) => {
        const options = [];
        data.map(item => {
            const key = Object.keys(item)[1]
            options.push(<option key={item.id} value={item.id}>{item[key]}</option>)
        })
        return options;
    }
}


export default PopulateOptions;