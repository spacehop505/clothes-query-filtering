import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect, useParams, useLocation } from 'react-router-dom';
import Clothing from "./pages/Clothing";

function App() {
    return (
        <BrowserRouter>
            <div className='hero is-light  '>
                <div className='notification is-info  '>
                    <header>
                        <Link className='button  is-small  ' to='/clothing'>Home</Link>
                    </header>
                </div>
                <section className=" ">
                    <div className="">
                        <div className="columns is-centered mb-5 ">
                            <div className="column is-three-fifths">
                                <main>
                                    <Route path="/" exact>
                                        <Redirect to='/clothing' exact></Redirect>
                                    </Route>

                                    <Route path="/clothing" component={Clothing} exact></Route>
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
        </BrowserRouter>
    );
}




export default App;