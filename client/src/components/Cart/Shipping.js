import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    Segment,
    Dropdown,
    Step,
    Icon,
    Grid,
    Header,
    Button,
    Form,
    Input,
} from "semantic-ui-react";
import { addShippingAddress } from "../../actions/cartActions";
import { statesArray } from "../basicRenderer";

const stateOptions = Object.values(
    statesArray.map((state, index) => {
        return {
            key: index,
            text: state,
            value: state,
        };
    })
);

const Shipping = () => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const history = useHistory();
    const dispatch = useDispatch();
    const shippingAddress = useSelector((state) => state.cart.shippingAddress);

    const [postalCode, setPostalCode] = useState(
        shippingAddress.postalCode ? shippingAddress.postalCode : ""
    );
    const [state, setState] = useState(
        shippingAddress.state ? shippingAddress.state : ""
    );
    const [city, setCity] = useState(
        shippingAddress.city ? shippingAddress.city : ""
    );
    const [address, setAddress] = useState(
        shippingAddress.address ? shippingAddress.address : ""
    );
    const [fullName, setFullName] = useState(
        shippingAddress.fullName ? shippingAddress.fullName : ""
    );

    useEffect(() => {
        if (!userInfo) history.push("/login?redirect=shipping");
    }, [history, userInfo]);

    const onSubmitHandler = () => {
        dispatch(
            addShippingAddress({ fullName, address, city, state, postalCode })
        );
        history.push("/billing");
    };
    return (
        <Segment basic>
            <Step.Group
                attached="top"
                unstackable
                size="mini"
                style={{ marginBottom: "5vh" }}
            >
                <Step active>
                    <Icon name="truck" />
                    <Step.Content>
                        <Step.Title>Shipping</Step.Title>
                    </Step.Content>
                </Step>
                <Step disabled>
                    <Icon name="credit card" />
                    <Step.Content>
                        <Step.Title>Billing</Step.Title>
                    </Step.Content>
                </Step>
                <Step disabled>
                    <Icon name="info" />
                    <Step.Content>
                        <Step.Title>Confirm Order</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>
            <Grid
                textAlign="center"
                verticalAlign="top"
                style={{ height: "60vh" }}
            >
                <Grid.Column style={{ maxWidth: 600 }}>
                    <Header as="h2" color="violet">
                        <Icon name="address card outline" />
                        Shipping Address
                    </Header>
                    <Form size="large" onSubmit={onSubmitHandler}>
                        <Segment stacked raised>
                            <Form.Field>
                                <Input
                                    required
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Full Name"
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    required
                                    icon="paper plane"
                                    iconPosition="left"
                                    placeholder="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    required
                                    icon="fort awesome"
                                    iconPosition="left"
                                    placeholder="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Dropdown
                                    required
                                    fluid
                                    placeholder="State"
                                    search
                                    selection
                                    value={state}
                                    options={stateOptions}
                                    onChange={(e, d) => setState(d.value)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    required
                                    icon="globe"
                                    iconPosition="left"
                                    placeholder="Postal Code"
                                    value={postalCode}
                                    onChange={(e) =>
                                        setPostalCode(e.target.value)
                                    }
                                />
                            </Form.Field>
                            <Button color="yellow" fluid>
                                Continue
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default Shipping;
