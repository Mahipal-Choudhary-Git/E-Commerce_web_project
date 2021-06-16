import {
    Table,
    Segment,
    Button,
    Header,
    Message,
    Icon,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchOrders } from "../../actions/orderActions";
import { removeErrorMessage } from "../../actions";
import { renderError, renderLoader } from "../basicRenderer";

const OrderList = () => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const dispatch = useDispatch();
    const history = useHistory();
    const error = useSelector((state) => state.error);
    const loader = useSelector((state) => state.loader);
    if (!userInfo) {
        history.push("/login?redirect=orders");
    }
    useEffect(() => {
        dispatch(fetchOrders(userInfo));
    }, [userInfo, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(removeErrorMessage());
        };
    }, [dispatch]);
    const ordersData = useSelector((state) => Object.values(state.orders));
    return (
        <>
            {loader && renderLoader()}
            <Segment>
                {error && renderError(error)}
                <Header as="h2">Order Summery</Header>
                {ordersData.length > 0 ? (
                    <Table
                        sortable
                        celled
                        fixed
                        selectable
                        color="purple"
                        striped
                        structured
                    >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan="2">
                                    Order-Id
                                </Table.HeaderCell>
                                <Table.HeaderCell>Date</Table.HeaderCell>
                                <Table.HeaderCell>Total</Table.HeaderCell>
                                <Table.HeaderCell>Paid</Table.HeaderCell>
                                <Table.HeaderCell>Delivered</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {ordersData.map((order, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell colSpan="2">
                                            {order._id}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {order.createdAt.substring(0, 10)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {order.totalPrice}
                                        </Table.Cell>
                                        <Table.Cell
                                            positive={order.isPaid}
                                            negative={!order.isPaid}
                                        >
                                            {order.isPaid ? (
                                                order.paidAt.substring(
                                                    0,
                                                    10
                                                )(
                                                    <Icon
                                                        color="green"
                                                        name="checkmark"
                                                        size="large"
                                                    />
                                                )
                                            ) : (
                                                <Icon
                                                    color="red"
                                                    name="close"
                                                    size="large"
                                                />
                                            )}
                                        </Table.Cell>
                                        <Table.Cell
                                            positive={order.isDelivered}
                                            negative={!order.isDelivered}
                                        >
                                            {order.isDelivered ? (
                                                order.deliveredAt.substring(
                                                    0,
                                                    10
                                                )(
                                                    <Icon
                                                        color="green"
                                                        name="checkmark"
                                                        size="large"
                                                    />
                                                )
                                            ) : (
                                                <Icon
                                                    color="red"
                                                    name="close"
                                                    size="large"
                                                />
                                            )}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button
                                                color="twitter"
                                                floated="left"
                                                size="tiny"
                                                onClick={() =>
                                                    history.push(
                                                        `/order/${order._id}`
                                                    )
                                                }
                                            >
                                                Details
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>
                ) : (
                    <Message info>
                        There is No Orders Placed By You . &nbsp;
                        <Link to="/">Go shopping !</Link>
                    </Message>
                )}
            </Segment>
        </>
    );
};

export default OrderList;
