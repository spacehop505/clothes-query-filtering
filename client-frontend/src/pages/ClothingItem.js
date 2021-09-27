import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
const ClothingItem = () => {
    const clothing_id = useParams().productID
    const api = axios.create({
        baseURL: 'http://localhost:5000/'
    });

    const [getClothes, setClothes] = useState([]);

    useEffect(() => {
        const onLoadGetClothing = async () => {
            const res = await api.get(`/clothing/product/${clothing_id}`);
            setClothes(res.data.content);
            console.log('\nCLIENT FRONTEND \n[GET] useEffect():', res.data.content);
        }
        onLoadGetClothing();
    }, []);


    return (
        <ClothesData1 arrayOfClothes={getClothes}>hello</ClothesData1>
    )
};



const ClothesData1 = ({ arrayOfClothes }) => {
    return (
        <div className="columns">
            {arrayOfClothes.map(result => (
                <div key={result.clothing_id} className='column '>

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



export default ClothingItem;