import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import abc from './abc.jpg';
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
    const [getClothes, updateClothes] = useState([]);
    const [getArrayQuery1, updateArrayQuery1] = useState({ size: '', dir: '', material: '' });
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
        const queryMaterial = newFormData['material'];

        if (querySize != '' || querySize == undefined) {
            arrayTest.push(`size=${querySize}`);
        }
        if (queryMaterial != '' || queryMaterial == undefined) {
            arrayTest.push(`material=${queryMaterial}`);
        }
        if (queryDir != '' || queryDir == undefined) {
            arrayTest.push(`dir=${queryDir}`);
            arrayTest.push(`order=price`);
        }
        updateArrayQuery(arrayTest);
        console.log('a2 : ', arrayTest);
        console.log('a3 : ', arrayTest.join('&'));
    }


    const AxiosGetClothes = async () => {
        //console.log('/clothing?' + `${axiosGetClothes()}`);
        const res = await api.get(`/clothing?${getArrayQuery.join('&')}`);
        updateClothes(res.data.content);
        console.log('[GET] -', res.data.content);
    }

    // let query = new URLSearchParams(useLocation().search);
    // let value = query.get('size');



    useEffect(() => {
        const onLoadGetClothing = async () => {
            const res = await api.get(`/clothing?${data.join('&')}`);
            updateClothes(res.data.content);
            console.log('useEffect() get fetchcurrentGenre -', res.data.content);

            //console.log(`data:image/jpeg;base64,${property}`)


        }
        onLoadGetClothing();
    }, []);

    return (
        <div className='container'>
            <div className='notification is-primary'>

                <div className='level'>

                    <div className='level-item'>
                        <div className='field'>
                            <label className='label' for="dir">order by</label>
                            <div className="select is-small">
                                <select name="dir" id="dir" onChange={selectedValue1}>
                                    <option value="">Default</option>
                                    <option value="desc">Highest Price</option>
                                    <option value="asc">Lowest Price</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='level-item'>
                        <div className='field'>
                            <label className='label' for="size">size</label>
                            <div >
                                <div className="select is-small">
                                    <select name="size" id="size" onChange={selectedValue1}>
                                        <option value="">Default</option>
                                        <option value="s">S</option>
                                        <option value="m">M</option>
                                        <option value="l">L</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='level-item'>
                        <div className='field'>
                            <label className='label' for="material">material</label>
                            <div className="select is-small">
                                <select name="material" id="material" onChange={selectedValue1}>
                                    <option value="">Default</option>
                                    <option value="cotton">Cotton</option>
                                    <option value="silk">Silk</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='level-item'>
                        <Link className='button is-rounded' to={`/clothing?${getArrayQuery.join('&')}`} onClick={AxiosGetClothes}>Search</Link>
                    </div>

                </div>

            </div>

            <ClothesData getClothess={getClothes} />

        </div>


    )
};
//<p>{result.clothing_id}</p>
//<Child name={query.get("size")} />
const ClothesData = ({ getClothess }) => {
    return (
        <div class="container is-fluid">
            <div class="columns is-multiline">
                {getClothess.map(result => (
                    <div className='column is-one-third'>
                        <figure className='image is-1by2'>
                            <img src={`data:image/jpeg;base64,${result.images.data}`} ></img>
                        </figure>
                        <p>{result.size}</p>
                        <p>{result.name}</p>
                        <p>${result.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Clothing;