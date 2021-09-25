import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect, useParams } from 'react-router-dom';
import axios from 'axios';
function App() {

  const [getSelectData, setSelectData] = useState([]);
  const [getClothesData, setClothesData] = useState([]);

  const getOrderValue = (event) => {
    const fieldName = event.target.getAttribute('name');
    const frieldValue = event.target.value;
    const newFormData = { ...getSelectData };
    newFormData[fieldName] = frieldValue;
    setSelectData(newFormData);
  }

  const api = axios.create({
    baseURL: 'http://localhost:5000/'
  });

  const AxiosGetClothes = () => {
    const queryDir = getSelectData.order;
    const arrayWHERE = [];


    const querySize = getSelectData.size;

    if (querySize) {
      arrayWHERE.push(`size=${querySize}`);
    }
    if (queryDir) {
      arrayWHERE.push(`dir=${queryDir}`);
      arrayWHERE.push(`order=price`);
    }

    // console.log(getOrderValue.size);
    console.log('clothing?' + `${arrayWHERE.join('&')}`)

    // await api.get('/clothing?' + `${arrayWHERE.join('&')}`).then(res => {
    //  console.log('[GET] -', res.data.content);
    // });
    // await api.get('/clothing', {
    //   params: {
    //     size: getSelectData.size
    //   }
    // }).then(res => {
    //   console.log('[GET] -', res.data.content);
    //  });

  };

  console.log(getSelectData);
  console.log(getSelectData.size);

  // useEffect(() => {
  //   fetch(`http://localhost:5000/clothing?` + `${arrayWHERE.join('&')}`)
  //     .then(res => {
  //      //setAuthor(res.data.content)
  //       console.log('[GET] -', res.data);
  //     });
  // });

  return (
    <BrowserRouter>
      <main>
        <Route path="/" exact>
          <h1>main</h1>
        </Route>

        <Route path="/clothing">
          <div>
            <label for="order">Order By</label>
            <select name="order" id="order" onChange={getOrderValue}>
              <option value="">Default</option>
              <option value="dec">Lowest Price</option>
              <option value="asc">Highest Price</option>
            </select>
          </div>
          <div>
            <label for="size">Size</label>
            <select name="size" id="size" onChange={getOrderValue}>
              <option value="">Default</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>
          <Link to={`/?${arrayWHERE.join('&')}`} onClick={() => AxiosGetClothes()} >Submit</Link>
        </Route>
      </main>

    </BrowserRouter>
  );
}



export default App;
