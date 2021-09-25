import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect, useParams, useLocation } from 'react-router-dom';
import Clothing from "./pages/Clothing";

function App() {
    const test123 = () => {
        console.log('hello');
    }
    // let { search } = useLocation();
    // const query = new URLSearchParams(search);
    return (
        <BrowserRouter>
            <Route path="/" exact>
                <h1>main</h1>
            </Route>

            <Route path="/clothing" component={Clothing}></Route>
        </BrowserRouter>
    );
}




export default App;