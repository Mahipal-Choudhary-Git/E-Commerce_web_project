import { useDispatch, useSelector } from "react-redux";
import {
    Segment,
    Step,
    Icon,
    Grid,
    Card,
    Header,
    Item,
    List,
    GridColumn,
    Message,
} from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { fetchOrder, updateOrder } from "../../actions/orderActions";
import { renderError, renderLoader } from "../basicRenderer";
import { PAYMENT_SUCCESS, PAYMENT_SUCCESS_RESET } from "../../actions/types";
import { removeErrorMessage } from "../../actions";

const Billing = () => {
    const dispatch = useDispatch();
    const orderId = useParams().id;
    const activeOrder = useSelector((state) => state.orders[orderId]);
    const { shippingAddress } = activeOrder;
    const error = useSelector((state) => state.error);
    const loader = useSelector((state) => state.loader);

    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrder(orderId));
        }
    }, [dispatch, orderId]);

    const paidOrder = useSelector((state) => state.cart.newPaymentSuccess);
    const successPaymentHnadler = (paymentResult) => {
        dispatch(updateOrder(activeOrder, paymentResult));
        dispatch({ type: PAYMENT_SUCCESS, payload: activeOrder._id });
    };
    dispatch(() => {
        return () => {
            dispatch({ type: PAYMENT_SUCCESS_RESET });
            dispatch(removeErrorMessage());
        };
    });
    return (
        <>
            {loader && renderLoader()}
            <Segment basic>
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

                    <Step completed>
                        <Icon name="info" />
                        <Step.Content>
                            <Step.Title>Confirm Order</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active>
                        <Icon name="credit card" />
                        <Step.Content>
                            <Step.Title>Billing</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                {error && renderError(error)}
                {paidOrder && (
                    <Message success color="green">
                        <Header>Payment SuccesFull</Header>
                    </Message>
                )}
                {activeOrder && (
                    <Grid stackable>
                        <GridColumn width={11}>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>Shipping Address</Card.Header>
                                    <Card.Description>
                                        <b>Name : </b>{" "}
                                        {shippingAddress.fullName}
                                    </Card.Description>
                                    <Card.Description>
                                        <b>Address : </b>{" "}
                                        {`${shippingAddress.address} , ${shippingAddress.city} , ${shippingAddress.postalCode} , ${shippingAddress.state}`}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    {activeOrder.isDelivered ? (
                                        <Message success color="green">
                                            Delivered at{" "}
                                            {activeOrder.deliveredAt}
                                        </Message>
                                    ) : (
                                        <Message error color="red">
                                            Not Delivered
                                        </Message>
                                    )}
                                </Card.Content>
                            </Card>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>Payment</Card.Header>
                                    <Card.Description>
                                        <b>Method : </b> PayPal
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    {activeOrder.isPaid ? (
                                        <Message success color="green">
                                            Paid at {activeOrder.deliveredAt}
                                        </Message>
                                    ) : (
                                        <Message error color="red">
                                            Not Paid
                                        </Message>
                                    )}
                                </Card.Content>
                            </Card>
                            <Segment>
                                <Header>Ordered Items </Header>
                                <Item.Group divided>
                                    {renderCartItems(activeOrder.orderItems)}
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
                                                    ${activeOrder.itemsPrice}
                                                </List.Content>
                                                <List.Content>
                                                    Items :{" "}
                                                </List.Content>
                                            </List.Item>
                                            <List.Item>
                                                <List.Content floated="right">
                                                    ${" "}
                                                    {activeOrder.shippingCharge}
                                                </List.Content>
                                                <List.Content>
                                                    Shipping :{" "}
                                                </List.Content>
                                            </List.Item>
                                            <List.Item>
                                                <List.Content floated="right">
                                                    ${activeOrder.taxPrice}
                                                </List.Content>
                                                <List.Content>
                                                    Tax :{" "}
                                                </List.Content>
                                            </List.Item>
                                        </List>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Card.Header>
                                        <List.Item>
                                            <List.Content floated="right">
                                                ${activeOrder.totalPrice}
                                            </List.Content>
                                            <List.Content>
                                                Order total :{" "}
                                            </List.Content>
                                        </List.Item>
                                    </Card.Header>
                                    <Card.Description
                                        style={{ marginTop: "2vh" }}
                                    >
                                        <PayPalScriptProvider
                                            options={{
                                                "client-id":
                                                    "AbAzaqf72TMvTcSeITDmnuFFspqAIV7mMVI4iNj1yK21fXkkaVrS-x5CNCESzdVvgd4EJde7HDVYXqBC",
                                                currency: "INR",
                                                intent: "capture",
                                            }}
                                        >
                                            <PayPalButtons
                                                onApprove={
                                                    successPaymentHnadler
                                                }
                                            />
                                        </PayPalScriptProvider>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </GridColumn>
                    </Grid>
                )}
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

export default Billing;
