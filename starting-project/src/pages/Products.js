import { Link } from 'react-router-dom';
const Products = () => {
    return (

        <section>
            <h1> Products </h1>
            <ul>
                <li><Link to='/products/a1'>a1</Link> </li>
                <li><Link to='/products/a2'>a2</Link> </li>
                <li><Link to='/products/a3'>a3</Link> </li>
            </ul>
        </section>
    )
};


export default Products;