import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Products from './pages/Products';
import MainHeader from './components/MainHeader';
import ProductDetail from './pages/ProductDetail';
function App() {
  return (
    <BrowserRouter>


      <MainHeader></MainHeader>



      <main>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/welcome'></Redirect>
          </Route>
          <Route path="/welcome">
            <Welcome></Welcome>
          </Route>
          <Route path="/products" exact>
            <Products></Products>
          </Route>
          <Route path="/products/:productID">
            <ProductDetail></ProductDetail>
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
