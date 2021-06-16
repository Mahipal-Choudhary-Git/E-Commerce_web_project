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
    Sidebar,
} from "semantic-ui-react";
import { Media } from "./ResponsiveContainer";
import Footer from "./Footer";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/userAuthActions";

const MobileContainer = ({ children }) => {
    const [sidebarOpened, setSidebarOpened] = useState(false);
    const cartItemCount = useSelector((state) => state.cart.cartItems.length);
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSidebarHide = () => setSidebarOpened(false);
    const handleToggle = () => setSidebarOpened(true);

    return (
        <Media as={Sidebar.Pushable} at="mobile">
            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation="overlay"
                    inverted
                    onHide={handleSidebarHide}
                    vertical
                    visible={sidebarOpened}
                >
                    <Menu.Item>
                        <Input icon="search" placeholder="Search Items..." />
                    </Menu.Item>
                    <Link to="/" className="item">
                        Home
                    </Link>
                    <NavLink to="/company" className="item">
                        Company
                    </NavLink>
                    <NavLink to="/cart" className="item">
                        {cartItemCount > 0 ? (
                            <Label>{cartItemCount}</Label>
                        ) : (
                            ""
                        )}
                        Cart
                    </NavLink>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment inverted textAlign="center" vertical>
                        <Container>
                            <Menu inverted secondary size="large">
                                <Menu.Item onClick={handleToggle}>
                                    <Icon name="sidebar" size="large" />
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to="/" className="item">
                                        <Icon
                                            name="autoprefixer"
                                            size="large"
                                        ></Icon>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item position="right">
                                    <Link to="/cart">
                                        {cartItemCount > 0 ? (
                                            <Button
                                                inverted
                                                style={{
                                                    padding: "0.45rem 0.7rem",
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
                                            <Button inverted>Cart</Button>
                                        )}
                                    </Link>

                                    {userInfo ? (
                                        <Dropdown
                                            text={userInfo.name}
                                            className="ui button right labeled dropdown icon inverted"
                                            style={{
                                                marginLeft: "0.1em",
                                                padding: "0.75rem 1rem",
                                            }}
                                        >
                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    icon="pencil"
                                                    text="edit Profile"
                                                    onClick={() =>
                                                        history.push("/profile")
                                                    }
                                                />
                                                <Dropdown.Item
                                                    icon="gift"
                                                    text="Orders..."
                                                    onClick={() =>
                                                        history.push("/orders")
                                                    }
                                                />
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
                                                inverted
                                                style={{
                                                    marginLeft: "0.1em",
                                                    padding: "0.8rem 1rem",
                                                }}
                                            >
                                                Sign In
                                            </Button>
                                        </Link>
                                    )}
                                </Menu.Item>
                            </Menu>
                        </Container>
                    </Segment>
                    {children}
                    <div style={{ marginTop: "200px" }}>
                        <Footer />
                    </div>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </Media>
    );
};

export default MobileContainer;
