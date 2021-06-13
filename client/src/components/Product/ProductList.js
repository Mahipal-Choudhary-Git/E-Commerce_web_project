import { useEffect } from "react";
import { Card } from "semantic-ui-react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import ProductCard from "./ProductCard";
import { fetchProducts } from "../../actions/productActions";
import { deactivateLoader, removeErrorMessage } from "../../actions";
import { renderError, renderLoader } from "../basicRenderer";

const renderProducts = (products) => {
    return products.map((product) => {
        return <ProductCard key={product._id} product={product} />;
    });
};

const ProductList = () => {
    const products = useSelector(
        (state) => Object.values(state.products),
        shallowEqual
    );
    const error = useSelector((state) => state.error);
    const loader = useSelector((state) => state.loader);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
        return () => {
            dispatch(deactivateLoader());
            dispatch(removeErrorMessage());
        };
    }, [dispatch]);
    return (
        <>
            {loader && renderLoader()}
            {error && renderError(error)}
            <Card.Group
                centered
                itemsPerRow={4}
                stackable
                style={{ padding: "2em 2em 5em 2em", marginBottom: "5em" }}
            >
                {products && renderProducts(products)}
            </Card.Group>
        </>
    );
};

export default ProductList;
