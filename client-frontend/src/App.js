import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect, useParams, useLocation } from 'react-router-dom';
import Clothing from "./pages/Clothing";
import ClothingItem from "./pages/ClothingItem";
function App() {
    return (
        <div className='hero is-light  '>
            <div className='notification is-info  '>
                <header></header>

            </div>
            <section className="hero">
                <div className="hero-body ">
                    <div className="columns is-centered">
                        <div className="column is-three-fifths">
                            <main>
                                <BrowserRouter>
                                    <Route path="/" exact>
                                        <Redirect to='/clothing' exact></Redirect>
                                    </Route>

                                    <Route path="/clothing" component={Clothing} exact></Route>

                                    <Route path="/clothing/product/:productID" component={ClothingItem} exact></Route>

                                </BrowserRouter>
                            </main>
                        </div>
                    </div>
                </div>
            </section>


            <div className='notification is-info  '>
                <div className="content has-text-centered ">
                    <p>2021</p>
                </div>
            </div>

        </div>
    );
}




export default App;