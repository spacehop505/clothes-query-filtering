import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import './index.css';
const Clothing = () => {
    //console.log('useLocation() :', useLocation());
    //console.log('useParams() :', useParams());

    const api = axios.create({
        baseURL: 'http://localhost:5000/'
    });

    let onLoadQueryParameters = [];
    const values = queryString.parse(useLocation().search);
    for (const property in values) {
        onLoadQueryParameters.push(`${property}=${values[property]}`)
    }


    const [getBranding, setBranding] = useState([]);
    const [getCategory, setCategory] = useState([]);

    const [getClothes, setClothes] = useState([]);

    const [getQueryParameters, setQueryParameters] = useState([]);
    const [getCopyQueryParameter, setCopyQueryParameters] = useState({ size: '', dir: '', material: '', category: '', brand: '' });

    const selectValue = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newCopyQueryParameter = { ...getCopyQueryParameter };
        newCopyQueryParameter[fieldName] = fieldValue
        setCopyQueryParameters(newCopyQueryParameter);

        let queryParameters = [];
        const queryDir = newCopyQueryParameter['dir'];
        const querySize = newCopyQueryParameter['size'];
        const queryMaterial = newCopyQueryParameter['material'];
        const queryCategory = newCopyQueryParameter['category'];
        const queryBrand = newCopyQueryParameter['brand'];
        if (querySize != '') {
            queryParameters.push(`size=${querySize}`);
        }
        if (queryMaterial != '') {
            queryParameters.push(`material=${queryMaterial}`);
        }
        if (queryDir != '') {
            queryParameters.push(`dir=${queryDir}`);
            queryParameters.push(`order=price`);
        }
        if (queryCategory != '') {
            queryParameters.push(`category=${queryCategory}`);
        }
        if (queryBrand != '') {
            queryParameters.push(`brand=${queryBrand}`);
        }
        setQueryParameters(queryParameters);
        console.log('queryParameters:', queryParameters, ' ,join():', queryParameters.join('&'));
    }


    const AxiosGetClothes = async () => {
        const res = await api.get(`/clothing?${getQueryParameters.join('&')}`);
        setClothes(res.data.content);
        console.log('[GET] -', res.data.content);
    }

    useEffect(() => {
        const onLoadGetClothing = async () => {
            const res = await api.get(`/clothing?${onLoadQueryParameters.join('&')}`);
            setClothes(res.data.content);
            console.log('\nCLIENT FRONTEND \n[GET] useEffect():', res.data.content);
        }
        onLoadGetClothing();


        const onLoadGetBranding = async () => {
            const res = await api.get(`/clothing/branding`);
            setBranding(res.data.content);
            console.log('\nCLIENT FRONTEND \n[GET] useEffect():', res.data.content);
        }
        onLoadGetBranding();

        const onLoadGetCategory = async () => {
            const res = await api.get(`/clothing/category`);
            setCategory(res.data.content);
            console.log('\nCLIENT FRONTEND \n[GET] useEffect():', res.data.content);
        }
        onLoadGetCategory();

    }, []);
    // is-gapless
    return (
        <div className='container'>

            <div className='columns is-multiline  has-background-grey-lighter '>

                <div className='column is-one-quarter  p-2 '>
                    <label className='label is-italic m-0 '>order by</label>
                    <div className="select is-small">
                        <select name="dir" onChange={selectValue}>
                            <option value="">Default</option>
                            <option value="desc">Highest Price</option>
                            <option value="asc">Lowest Price</option>
                        </select>
                    </div>
                </div>

                <div className='column is-one-quarter  p-2 '>
                    <label className='label is-italic m-0'>size</label>
                    <div >
                        <div className="select is-small">
                            <select name="size" onChange={selectValue}>
                                <option value="">Default</option>
                                <option value="s">S</option>
                                <option value="m">M</option>
                                <option value="l">L</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='column is-one-quarter   p-2'>
                    <label className='label is-italic m-0' >material</label>
                    <div className="select is-small">
                        <select name="material" onChange={selectValue}>
                            <option value="">Default</option>
                            <option value="cotton">Cotton</option>
                            <option value="silk">Silk</option>
                        </select>
                    </div>
                </div>

                <div className='column is-one-quarter  p-2'>
                    <label className='label is-italic m-0' >category</label>
                    <div className="select is-small">
                        <select name="category" onChange={selectValue}>
                            <option value="">Default</option>
                            {getCategory.map(category => (
                                <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='column is-one-quarter  p-2'>
                    <label className='label is-italic m-0' >brand</label>
                    <div className="select is-small">
                        <select name="brand" onChange={selectValue}>
                            <option value="">Default</option>
                            {getBranding.map(brand => (
                                <option key={brand.branding_id} value={brand.branding_id}>{brand.branding_name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='column is-one-quarter pt-5  '>
                    <Link className='button  is-small is-fullwidth is-rounded' to={`/clothing?${getQueryParameters.join('&')}`} onClick={AxiosGetClothes}>Filter</Link>
                </div>
            </div>

            <ClothesData arrayOfClothes={getClothes} />

        </div>
    )
};

const ClothesData = ({ arrayOfClothes }) => {
    return (
        <div className="columns is-multiline  ">
            {arrayOfClothes.map(result => (
                <div key={result.clothing_id} className='column is-one-third  '>
                    <figure className='image is-4by5 '>
                        <img alt={result.image_name} src={result.image_hyperlink}></img>
                    </figure>
                    <p >{result.size}</p>
                    <p className="column p-0 is-italic has-text-weight-semibold">{result.branding_name}</p>
                    <p className='a1'>{result.name}</p>
                    <p className="column p-0  has-text-weight-semibold">€{result.price}</p>
                </div>
            ))}
        </div>
    );
}


export default Clothing;