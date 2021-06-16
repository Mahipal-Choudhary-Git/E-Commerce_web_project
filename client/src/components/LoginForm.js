import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
    Button,
    Form,
    Grid,
    Header,
    Icon,
    Input,
    Label,
    Message,
    Segment,
} from "semantic-ui-react";
import { deactivateLoader, removeErrorMessage } from "../actions";
import { LoginUser } from "../actions/userAuthActions";
import { renderError, renderLoader } from "./basicRenderer";

const LoginForm = ({ location }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef(null);
    const dispatch = useDispatch();
    const redirect = location.search ? location.search.split("=")[1] : "/";
    const { userInfo } = useSelector((state) => state.auth);
    const error = useSelector((state) => state.error);
    const loader = useSelector((state) => state.loader);
    const history = useHistory();

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(LoginUser(email, password));
        setShowPassword(false);
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
                style={{ height: "60vh" }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="teal" textAlign="center">
                        <Icon name="autoprefixer" /> Log-in to your account
                    </Header>
                    <Form size="large" onSubmit={handleOnSubmit}>
                        <Segment stacked color="teal" raised>
                            <Form.Field>
                                <Input
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="E-mail address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Group
                                unstackable
                                style={{ marginBottom: "2vh" }}
                            >
                                <Form.Field width={13}>
                                    <Input
                                        required
                                        ref={passwordRef}
                                        icon="lock"
                                        iconPosition="left"
                                        placeholder="Password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </Form.Field>
                                <Label
                                    style={{ backgroundColor: "white" }}
                                    icon={showPassword ? "eye slash" : "eye"}
                                    size="big"
                                    circular
                                    active={!showPassword}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowPassword(!showPassword);
                                        passwordRef.current.focus();
                                    }}
                                ></Label>
                            </Form.Group>

                            <Button
                                color="teal"
                                fluid
                                size="large"
                                // onClick={handleOnSubmit}
                            >
                                Login
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
                        New to us?
                        <Link to={`/signup${location.search}`}>Sign Up</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        </>
    );
};

export default LoginForm;
