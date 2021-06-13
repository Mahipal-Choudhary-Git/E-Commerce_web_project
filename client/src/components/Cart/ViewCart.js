import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    Button,
    Card,
    Dropdown,
    Grid,
    GridColumn,
    Header,
    Item,
    Message,
    Segment,
} from "semantic-ui-react";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";

const ViewCart = ({ location, match }) => {
    const productId = match.params.id;
    const quantity = location.search ? location.search.split("=")[1] : 1;
    const dispatch = useDispatch();
    useEffect(() => {
        if (productId) dispatch(addItemToCart(productId, quantity));
    }, [dispatch, productId, quantity]);
    const cart = useSelector((state) => state.cart);

    return (
        <Segment>
            {cart.cartItems.length === 0 ? (
                <Message>
                    Cart is empty. <Link to="/"> Go shopping</Link>
                </Message>
            ) : (
                <Grid stackable>
                    <GridColumn width={11}>
                        <Header>Shopping cart</Header>{" "}
                        <Item.Group divided>
                            {renderCartItems(cart.cartItems, dispatch)}
                        </Item.Group>
                    </GridColumn>
                    <GridColumn width={4}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>
                                    Subtotal{" "}
                                    {` (${cart.cartItems.reduce(
                                        (acc, e) => acc + e.qty,
                                        0
                                    )} items) :  $ ${cart.cartItems.reduce(
                                        (acc, e) =>
                                            acc + e.productPrice * e.qty,
                                        0
                                    )}`}
                                </Card.Header>
                            </Card.Content>
                            <Card.Content extra>
                                <Link to="/login?redirect=shipping">
                                    <Button
                                        color="yellow"
                                        fluid
                                        style={{ color: "black" }}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </Link>
                            </Card.Content>
                        </Card>
                    </GridColumn>
                </Grid>
            )}
        </Segment>
    );
};

const renderCartItems = (cartItems, dispatch) =>
    cartItems.map((item) => {
        return (
            <Item key={item.productId}>
                <Item.Image size="tiny" src={item.productImage} />
                <Item.Content verticalAlign="middle">
                    <Header>
                        <Link to={`/product/${item.productId}`}>
                            {item.productName}
                        </Link>
                    </Header>
                    <Button.Group
                        style={{ margin: "0em 2.5% 0em 2.5%" }}
                        size="tiny"
                    >
                        <Dropdown
                            className="button basic green right labeled icon"
                            floating
                            options={[
                                ...Array(
                                    item.productStock > 10
                                        ? 10
                                        : item.productStock
                                ).keys(),
                            ].map((e) => ({
                                key: e + 1,
                                text: e + 1,
                                value: e + 1,
                            }))}
                            value={item.qty}
                            onChange={(e, d) =>
                                dispatch(addItemToCart(item.productId, d.value))
                            }
                        ></Dropdown>
                    </Button.Group>
                    <Header as="h4" style={{ margin: "0em 0% 0em 2.5%" }}>
                        $ {item.productPrice * item.qty}
                    </Header>
                    <Button
                        style={{ margin: "1.5vh 3% 0em 39%" }}
                        className="youtube"
                        onClick={() =>
                            dispatch(removeItemFromCart(item.productId))
                        }
                    >
                        Delete
                    </Button>
                </Item.Content>
            </Item>
        );
    });

export default ViewCart;
