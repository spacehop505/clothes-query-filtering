
import { useParams } from "react-router-dom";

const Products = () => {
    const params = useParams();
    console.log(params);

    return (
        <section>
            <h1>Product Details</h1>
            <p>{params.productID}</p>
        </section>
    )
};


export default Products;