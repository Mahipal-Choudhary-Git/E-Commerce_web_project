import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    Grid,
    Header,
    Form,
    Input,
    Button,
    Segment,
    Message,
} from "semantic-ui-react";
import { removeErrorMessage } from "../actions";
import { fetchUser, updateUser } from "../actions/userActions";
import { renderError, renderLoader } from "./basicRenderer";

const ProfileEdit = () => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        }
        dispatch(fetchUser(userInfo));
    }, [dispatch, userInfo, history]);

    const user = useSelector(
        (state) => state.users[userInfo ? userInfo._id : ""]
    );
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        if (user) {
            setFullName(user.name);
        }
    }, [user]);

    const error = useSelector((state) => state.error);
    const loader = useSelector((state) => state.loader);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword)
            alert(
                "Password missmatch. Please Check Your Password Carefully & Try again! "
            );
        else dispatch(updateUser({ ...user, name: fullName, password }));
    };

    useEffect(() => {
        return () => {
            dispatch(removeErrorMessage());
        };
    });

    return (
        <>
            {loader && renderLoader()}
            {error && renderError(error)}
            {user && (
                <Grid
                    textAlign="center"
                    style={{ height: "60vh" }}
                    verticalAlign="middle"
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h2" color="teal" textAlign="center">
                            Edit your Profile
                        </Header>
                        <Form size="large" onSubmit={handleOnSubmit}>
                            <Segment stacked color="red" raised>
                                <Message as="h3" info>
                                    {user.email}
                                </Message>
                                <Form.Field>
                                    <Input
                                        icon="user"
                                        iconPosition="left"
                                        placeholder="Full Name"
                                        type="text"
                                        value={fullName}
                                        onChange={(e) =>
                                            setFullName(e.target.value)
                                        }
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Input
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
                                        required={!!password}
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

                                <Button color="orange" fluid size="large">
                                    Update Profile
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            )}
        </>
    );
};

export default ProfileEdit;
