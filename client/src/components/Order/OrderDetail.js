import { useEffect } from "react";
import {
    Segment,
    Grid,
    Card,
    Header,
    Item,
    List,
    GridColumn,
    Message,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";

import { fetchOrder } from "../../actions/orderActions";
import { renderError, renderLoader } from "../basicRenderer";

const OrderDetails = () => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const history = useHistory();
    const dispatch = useDispatch();
    const orderId = useParams().id;

    if (!userInfo) {
        history.push("/login?redirect=orders");
    }
    useEffect(() => {
        dispatch(fetchOrder(orderId));
    }, [dispatch, orderId]);

    const order = useSelector((state) => state.orders[orderId]);
    const { shippingAddress } = order;
    const error = useSelector((state) => state.error);
    const loader = useSelector((state) => state.loader);
    return (
        <>
            {loader && renderLoader()}
            <Segment basic>
                {error && renderError(error)}
                <Header as="h2">Order Detail</Header>
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
                            <Card.Content extra>
                                {order.isDelivered ? (
                                    <Message success color="green">
                                        Delivered at {order.deliveredAt}
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
                                {order.isPaid ? (
                                    <Message success color="green">
                                        Paid at {order.deliveredAt}
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
                                {renderCartItems(order.orderItems)}
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
                                                ${order.itemsPrice}
                                            </List.Content>
                                            <List.Content>
                                                Items :{" "}
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content floated="right">
                                                $ {order.shippingCharge}
                                            </List.Content>
                                            <List.Content>
                                                Shipping :{" "}
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content floated="right">
                                                ${order.taxPrice}
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
                                            ${order.totalPrice}
                                        </List.Content>
                                        <List.Content>
                                            Order total :{" "}
                                        </List.Content>
                                    </List.Item>
                                </Card.Header>
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

export default OrderDetails;
