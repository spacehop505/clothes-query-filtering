import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect, useParams, useLocation } from 'react-router-dom';
import Clothing from "./pages/Clothing";

function App() {
    // let { search } = useLocation();
    // const query = new URLSearchParams(search);
    return (
        <div>
            <header></header>
            <section className="hero">
                <div className="hero-body has-background-warning">
                    <div className="columns is-centered">
                        <div className="column is-three-fifths">
                            <main>
                                <BrowserRouter>
                                    <Route path="/" exact>
                                        <h1>main</h1>
                                    </Route>

                                    <Route path="/clothing" component={Clothing}></Route>
                                </BrowserRouter>
                            </main>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}




export default App;