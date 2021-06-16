import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
    Button,
    Form,
    Grid,
    Header,
    Icon,
    Input,
    Message,
    Segment,
} from "semantic-ui-react";
import { deactivateLoader, removeErrorMessage } from "../actions";
import { addUser } from "../actions/userActions";
import { renderError, renderLoader } from "./basicRenderer";

const SignupForm = ({ location }) => {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const redirect = location.search ? location.search.split("=")[1] : "/";
    const error = useSelector((state) => state.error);
    const loader = useSelector((state) => state.loader);
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword)
            alert(
                "Password missmatch. Please Check Your Password Carefully & Try again! "
            );
        else dispatch(addUser(userName, email, password));
    };

    useEffect(() => {
        return () => {
            dispatch(deactivateLoader());
            dispatch(removeErrorMessage());
        };
    }, [dispatch]);
    return (
        <>
            {loader && renderLoader()}
            {error && renderError(error)}
            <Grid
                textAlign="center"
                style={{ height: "80vh" }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="teal" textAlign="center">
                        <Icon name="autoprefixer" /> Create New Account
                    </Header>
                    <Form size="large" onSubmit={handleOnSubmit}>
                        <Segment stacked color="teal" raised>
                            <Form.Field>
                                <Input
                                    required
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Name"
                                    value={userName}
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    required
                                    icon="mail"
                                    iconPosition="left"
                                    placeholder="E-mail address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    required
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    type="text"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    required
                                    icon="redo"
                                    iconPosition="left"
                                    placeholder="Confirm Password"
                                    type="text"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </Form.Field>

                            <Button
                                color="teal"
                                fluid
                                size="large"
                                // onClick={handleOnSubmit}
                            >
                                Register
                            </Button>
                            <div style={{ marginTop: "1em" }}>
                                <Message color="teal">
                                    <h4>
                                        Continuous With
                                        <Icon
                                            name="angle double down"
                                            size="large"
                                        />
                                    </h4>
                                </Message>
                                <Button
                                    style={{ marginRight: "2%" }}
                                    icon="google plus g"
                                    circular
                                    color="google plus"
                                />
                                <Button
                                    style={{ marginRight: "2%" }}
                                    icon="facebook f"
                                    circular
                                    color="facebook"
                                />
                                <Button
                                    style={{ marginRight: "2%" }}
                                    icon="twitter"
                                    circular
                                    color="twitter"
                                />
                                <Button
                                    style={{ marginRight: "2%" }}
                                    icon="linkedin"
                                    circular
                                    color="linkedin"
                                />
                            </div>
                        </Segment>
                    </Form>
                    <Message>
                        Already Registered?
                        <Link to={`/login${location.search}`}>Login</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        </>
    );
};

export default SignupForm;
