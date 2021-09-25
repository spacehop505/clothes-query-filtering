import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

const Clothing = () => {
    const api = axios.create({
        baseURL: 'http://localhost:5000/'
    });

    const values = queryString.parse(useLocation().search);
    // console.log('query-string:', values);
    //const params = useParams();
    // console.log('useParams() :', params);
    let data = []
    for (const property in values) {
        //console.log(`${property}: ${values[property]}`);
        data.push(`${property}=${values[property]}`)
    }
    // console.log(data.join('&'));
    //console.log('url ', window.location.href);

    const [getArrayQuery, updateArrayQuery] = useState([]);
    const [getArrayQuery1, updateArrayQuery1] = useState({ size: '', dir: '' });
    const selectedValue1 = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        console.log(fieldName, fieldValue);
        const newFormData = { ...getArrayQuery1 };
        newFormData[fieldName] = fieldValue
        updateArrayQuery1(newFormData);
        let arrayTest = [];
        const queryDir = newFormData['dir'];
        const querySize = newFormData['size'];

        if (querySize != '' || querySize == undefined) {
            arrayTest.push(`size=${querySize}`);
        }
        if (queryDir != '' || queryDir == undefined) {
            arrayTest.push(`dir=${queryDir}`);
            arrayTest.push(`order=price`);
        }
        updateArrayQuery(arrayTest);
        console.log('a2 : ', arrayTest);
        console.log('a3 : ', arrayTest.join('&'));
    }


    /* const aAxiosGetClothes = async () => {
         console.log('/clothing?' + `${axiosGetClothes()}`);
         await api.get('/clothing?' + `${axiosGetClothes()}`).then(res => {
             console.log('[GET] -', res.data.content);
         });
     }; */
    // let query = new URLSearchParams(useLocation().search);
    // let value = query.get('size');



    useEffect(() => {
        const onLoadGetClothing = async () => {
            const res = await api.get(`/clothing?${data.join('&')}`);
            //setAuthor(res.data.content)
            console.log('useEffect() get fetchcurrentGenre -', res.data.content);
        }
        onLoadGetClothing();
    }, []);



    return (
        <div>
            <div>
                <label for="dir">Order By</label>
                <select name="dir" id="dir" onChange={selectedValue1}>
                    <option value="">Default</option>
                    <option value="dec">Lowest Price</option>
                    <option value="asc">Highest Price</option>
                </select>
            </div>

            <div>
                <label for="size">Size</label>
                <select name="size" id="size" onChange={selectedValue1}>
                    <option value="">Default</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                </select>
            </div>

            <ul>


                <li >
                    <Link to={`/clothing?${getArrayQuery.join('&')}`}>Modus Create</Link>
                </li>
            </ul>
        </div>
    )
};
//<Child name={query.get("size")} />
const Child = ({ name }) => {
    return (
        <div>
            {name ? (
                <h3>
                    The <code>name</code> in the query string is &quot;{name}
                    &quot;
                </h3>
            ) : (
                <h3>There is no name in the query string</h3>
            )}
        </div>
    );
}


export default Clothing;