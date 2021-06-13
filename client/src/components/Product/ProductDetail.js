import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Card,
    Dropdown,
    Grid,
    Header,
    Icon,
    Image,
    Message,
    Rating,
    Segment,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import { renderLoader, renderError } from "../basicRenderer";
import { fetchProduct } from "../../actions/productActions";
import { deactivateLoader, removeErrorMessage } from "../../actions";

const renderProductInfo = (product, quantity, setQuantity) => {
    const availability = product.countInStock > 0 ? true : false;
    return (
        <>
            <Link to="/">back to result</Link>
            <Segment>
                <Grid stackable>
                    <Grid.Column width={8}>
                        <Image src={product.image} />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Header as="h2">{product.name}</Header>
                        <Rating
                            icon="star"
                            defaultRating={product.rating}
                            maxRating={5}
                        />
                        {product.numReviews} Reviews <br />
                        <Header style={{ margin: "1rem 0rem 0rem 0rem" }}>
                            Price : ${product.price}
                        </Header>
                        <p>Description: {product.description}</p>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Card>
                            <Card.Content>
                                <Card.Header>
                                    Price : ${product.price * quantity}
                                </Card.Header>

                                {availability && (
                                    <Card.Meta style={{ color: "#21ba45" }}>
                                        In Stock
                                    </Card.Meta>
                                )}
                                {!availability && (
                                    <Card.Meta style={{ color: "#ff0000" }}>
                                        out of Stock
                                    </Card.Meta>
                                )}
                                <Card.Description>
                                    {availability ? (
                                        <>
                                            <Button.Group
                                                style={{ marginBottom: "1rem" }}
                                            >
                                                <Button
                                                    animated="vertical"
                                                    color="blue"
                                                >
                                                    <Button.Content hidden>
                                                        Qty
                                                    </Button.Content>
                                                    <Button.Content visible>
                                                        <Icon name="shop" />
                                                    </Button.Content>
                                                </Button>
                                                <Dropdown
                                                    className="button basic blue right labeled icon"
                                                    floating
                                                    options={[
                                                        ...Array(
                                                            product.countInStock >
                                                                10
                                                                ? 10
                                                                : product.countInStock
                                                        ).keys(),
                                                    ].map((e) => ({
                                                        key: e + 1,
                                                        text: e + 1,
                                                        value: e + 1,
                                                    }))}
                                                    value={quantity}
                                                    onChange={(e, d) =>
                                                        setQuantity(d.value)
                                                    }
                                                ></Dropdown>
                                            </Button.Group>
                                            <Link
                                                to={`/cart/${product._id}?qty=${quantity}`}
                                            >
                                                <Button color="yellow" fluid>
                                                    Add to Cart
                                                </Button>
                                            </Link>
                                        </>
                                    ) : (
                                        <Button
                                            color="yellow"
                                            fluid
                                            disabled={!availability}
                                        >
                                            Add to Cart
                                        </Button>
                                    )}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </Segment>
        </>
    );
};

const ProductDetails = ({ match }) => {
    const [quantity, setQuantity] = useState(1);

    const product = useSelector((state) => state.products[match.params.id]);
    const error = useSelector((state) => state.error);
    const loader = useSelector((state) => state.loader);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProduct(match.params.id));
        return () => {
            dispatch(deactivateLoader());
            dispatch(removeErrorMessage());
        };
    }, [dispatch, match.params.id]);

    return (
        <>
            {loader && renderLoader()}
            {error && renderError(error)}
            {product && renderProductInfo(product, quantity, setQuantity)}
            {!loader && !error && !product && (
                <Message>
                    Product Doesn't exists. <Link to="/"> Go Back</Link>
                </Message>
            )}
        </>
    );
};

export default ProductDetails;
