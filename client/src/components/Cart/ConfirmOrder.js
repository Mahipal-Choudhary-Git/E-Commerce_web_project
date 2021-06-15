import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
    Segment,
    Step,
    Icon,
    Grid,
    GridColumn,
    Card,
    Button,
    List,
    Header,
    Item,
} from "semantic-ui-react";
import { removeErrorMessage } from "../../actions";
import { createOrder } from "../../actions/orderActions";
import { ADD_ORDER_RESET } from "../../actions/types";
import { renderError, renderLoader } from "../basicRenderer";

const ConfirmOrder = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const userInfo = useSelector((state) => state.auth.userInfo);
    const createdOrderId = useSelector((state) => state.cart.newOrderCreated);
    const shippingAddress = useSelector((state) => state.cart.shippingAddress);
    const error = useSelector((state) => state.error);
    const loader = useSelector((state) => state.loader);

    if (!userInfo && !shippingAddress.address) {
        history.push("/shipping");
    }
    if (cartItems.length < 1 && !createdOrderId) {
        history.push("/cart");
    }
    const tax = 0.15;
    const shippingCharge = 10;
    const cartItemsPrice = cartItems.reduce(
        (acc, e) => acc + e.productPrice * e.qty,
        0
    );
    const taxPrice = tax * cartItemsPrice;
    const totalPrice = cartItemsPrice + shippingCharge + taxPrice;

    const onPlaceOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cartItems,
                shippingAddress,
                paymentMethod: "PayPal",
                itemsPrice: cartItemsPrice,
                shippingPrice: shippingCharge,
                taxPrice,
                totalPrice,
                userInfo,
            })
        );
    };

    useEffect(() => {
        if (createdOrderId) {
            history.push(`/billing/${createdOrderId}`);
        }
    }, [dispatch, createdOrderId, history]);

    useEffect(() => {
        return () => {
            dispatch(removeErrorMessage());
            dispatch({ type: ADD_ORDER_RESET });
        };
    }, [dispatch]);

    return (
        <>
            {loader && renderLoader()}

            <Segment basic>
                {error && renderError(error)}
                <Step.Group
                    attached="top"
                    unstackable
                    size="mini"
                    style={{ marginBottom: "5vh" }}
                >
                    <Step completed>
                        <Icon name="truck" />
                        <Step.Content>
                            <Step.Title>Shipping</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step active>
                        <Icon name="info" />
                        <Step.Content>
                            <Step.Title>Confirm Order</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled>
                        <Icon name="credit card" />
                        <Step.Content>
                            <Step.Title>Billing</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <Grid stackable>
                    <GridColumn width={11}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>Shipping Address</Card.Header>
                                <Card.Description>
                                    <b>Name : </b> {shippingAddress.fullName}
                                </Card.Description>
                                <Card.Description>
                                    <b>Address : </b>{" "}
                                    {`${shippingAddress.address} , ${shippingAddress.city} , ${shippingAddress.postalCode} , ${shippingAddress.state}`}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>Payment</Card.Header>
                                <Card.Description>
                                    <b>Method : </b> PayPal
                                </Card.Description>
                            </Card.Content>
                        </Card>
                        <Segment>
                            <Header>Ordered Items </Header>
                            <Item.Group divided>
                                {renderCartItems(cartItems)}
                            </Item.Group>
                        </Segment>
                    </GridColumn>
                    <GridColumn width={5}>
                        <Card fluid color="yellow">
                            <Card.Content>
                                <Card.Header>Order Summary</Card.Header>
                                <Card.Description>
                                    <List verticalAlign="middle">
                                        <List.Item>
                                            <List.Content floated="right">
                                                ${cartItemsPrice}
                                            </List.Content>
                                            <List.Content>
                                                Items :{" "}
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content floated="right">
                                                $ {shippingCharge}
                                            </List.Content>
                                            <List.Content>
                                                Shipping :{" "}
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content floated="right">
                                                ${taxPrice}
                                            </List.Content>
                                            <List.Content>Tax : </List.Content>
                                        </List.Item>
                                    </List>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Card.Header>
                                    <List.Item>
                                        <List.Content floated="right">
                                            ${totalPrice}
                                        </List.Content>
                                        <List.Content>
                                            Order total :{" "}
                                        </List.Content>
                                    </List.Item>
                                </Card.Header>
                                <Card.Description style={{ marginTop: "2vh" }}>
                                    <Button
                                        color="yellow"
                                        fluid
                                        onClick={onPlaceOrderHandler}
                                    >
                                        Place Order
                                    </Button>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </GridColumn>
                </Grid>
            </Segment>
        </>
    );
};

const renderCartItems = (items) =>
    items.map((item, index) => {
        return (
            <Item key={index}>
                <Item.Image size="tiny" src={item.productImage} />
                <Item.Content verticalAlign="middle">
                    <Header as="h4">
                        <Link to={`/product/${item.productId}`}>
                            {item.productName}
                        </Link>
                    </Header>
                    <Item.Description>
                        {item.qty} &nbsp; &nbsp; X &nbsp; &nbsp; $
                        {item.productPrice} &nbsp; = &nbsp; $
                        {item.qty * item.productPrice}
                    </Item.Description>
                </Item.Content>
            </Item>
        );
    });

export default ConfirmOrder;
