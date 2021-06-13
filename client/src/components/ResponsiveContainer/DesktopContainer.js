import { useState } from "react";
import {
    Button,
    Container,
    Dropdown,
    Icon,
    Input,
    Label,
    Menu,
    Segment,
    Visibility,
} from "semantic-ui-react";
import { Media } from "./ResponsiveContainer";
import Footer from "./Footer";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/userAuthActions";

const DesktopContainer = ({ children }) => {
    const [fixed, setFixed] = useState(false);
    const cartItemCount = useSelector((state) => state.cart.cartItems.length);
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const hideFixedMenu = () => setFixed(false);
    const showFixedMenu = () => setFixed(true);

    return (
        <Media greaterThan="mobile">
            <Visibility
                once={false}
                onBottomPassed={showFixedMenu}
                onBottomPassedReverse={hideFixedMenu}
            >
                <Segment inverted textAlign="center" vertical>
                    <Menu
                        fixed={fixed ? "top" : null}
                        inverted={!fixed}
                        secondary={!fixed}
                        size="large"
                    >
                        <Container>
                            <Link to="/" className="item">
                                <Icon name="autoprefixer" size="big"></Icon>
                            </Link>
                            <NavLink to="/company" className="item">
                                Company
                            </NavLink>
                            <Menu.Item position="right">
                                <Menu.Item>
                                    <Input
                                        icon="search"
                                        placeholder="Search items..."
                                    />
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to="/cart">
                                        {cartItemCount > 0 ? (
                                            <Button
                                                inverted={!fixed}
                                                style={{
                                                    padding: "0.5rem 0.7rem",
                                                }}
                                            >
                                                Cart &nbsp; &nbsp;
                                                <Label
                                                    circular
                                                    size="small"
                                                    style={{
                                                        backgroundColor:
                                                            "#f02020",
                                                        color: "#ffffff",
                                                    }}
                                                >
                                                    {cartItemCount}
                                                </Label>
                                            </Button>
                                        ) : (
                                            <Button inverted={!fixed}>
                                                Cart
                                            </Button>
                                        )}
                                    </Link>
                                    {userInfo ? (
                                        <Dropdown
                                            text={userInfo.name}
                                            className={
                                                fixed
                                                    ? "ui button primary right labeled dropdown icon"
                                                    : "ui button right labeled dropdown icon inverted"
                                            }
                                            style={{
                                                marginLeft: "0.5em",
                                                padding: "0.75rem 1rem",
                                            }}
                                        >
                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    icon="sign-out"
                                                    text="Sign Out"
                                                    onClick={(e) =>
                                                        dispatch(
                                                            logoutUser(userInfo)
                                                        )
                                                    }
                                                />
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    ) : (
                                        <Link to="/login">
                                            <Button
                                                inverted={!fixed}
                                                primary={fixed}
                                                style={{
                                                    marginLeft: "0.5em",
                                                    padding: "0.8rem 1rem",
                                                }}
                                            >
                                                Sign In
                                            </Button>
                                        </Link>
                                    )}
                                </Menu.Item>
                            </Menu.Item>
                        </Container>
                    </Menu>
                </Segment>
            </Visibility>
            {children}
            <Footer />
        </Media>
    );
};

export default DesktopContainer;
