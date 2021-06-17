import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import {
    Button,
    Container,
    Dropdown,
    Icon,
    Search,
    Image,
    Label,
    Menu,
    Segment,
    Sidebar,
} from "semantic-ui-react";
import { Media } from "./ResponsiveContainer";
import _ from "lodash";
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
    const products = useSelector((state) => Object.values(state.products));

    const handleSidebarHide = () => setSidebarOpened(false);
    const handleToggle = () => setSidebarOpened(true);

    // search box
    const intialState = {
        loading: false,
        results: [],
        value: "",
    };
    const [state, dispatchAction] = useReducer((state, action) => {
        switch (action.type) {
            case "CLEAN_QUERY":
                return intialState;
            case "START_SEARCH":
                return { ...state, loading: true, value: action.query };
            case "FINISH_SEARCH":
                return { ...state, loading: false, results: action.result };
            case "UPDATE_SELECTION":
                return { ...state, value: action.selection };
            default:
                return { ...state };
        }
    }, intialState);
    const { loading, results, value } = state;
    const timeoutRef = useRef();
    const handleSearchChange = useCallback((e, data) => {
        clearTimeout(timeoutRef.current);
        dispatchAction({ type: "START_SEARCH", query: data.value });
        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0) {
                dispatchAction({ type: "CLEAN_QUERY" });
                return;
            }
            const re = new RegExp(_.escapeRegExp(data.value), "i");
            const isMatch = (result) => re.test(result.name);
            dispatchAction({
                type: "FINISH_SEARCH",
                result: _.filter(products, isMatch),
            });
        }, 300);
    }, []);
    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    const resultRenderer = (result) => {
        return (
            <div className="result">
                <Image src={result.image} />
                <div className="content">
                    <div className="title">{result.name}</div>
                    <div className="price">${result.price}</div>
                    <div className="description">{result.description}</div>
                </div>
            </div>
        );
    };

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
                        <Search
                            loading={loading}
                            results={results}
                            value={value}
                            placeholder="find Products...."
                            onSearchChange={handleSearchChange}
                            onResultSelect={(e, data) => {
                                dispatchAction({
                                    type: "UPDATE_SELECTION",
                                    selection: data.result.name,
                                });
                                history.push(`/product/${data.result._id}`);
                            }}
                            resultRenderer={resultRenderer}
                        />
                    </Menu.Item>
                    <Link to="/" className="item">
                        Home
                    </Link>
                    {/* <NavLink to="/company" className="item">
                        Company
                    </NavLink> */}
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
                                    {renderAdmin(
                                        userInfo,
                                        cartItemCount,
                                        history
                                    )}

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

const renderAdmin = (user, cartItemCount, history) => {
    if (user && user.isAdmin) {
        return (
            <Dropdown
                text="admin"
                className="ui button right labeled dropdown icon inverted"
                style={{
                    marginLeft: "0.5em",
                    padding: "0.75rem 1rem",
                }}
            >
                <Dropdown.Menu>
                    <Dropdown.Item
                        icon="chart area"
                        text="Dashboard"
                        onClick={() => history.push("/admin/dashboard")}
                    />
                    <Dropdown.Item
                        icon="users"
                        text="Users"
                        onClick={() => history.push("/admin/users")}
                    />
                    <Dropdown.Item
                        icon="file alternate"
                        text="Orders"
                        onClick={() => history.push("/admin/orders")}
                    />
                    <Dropdown.Item
                        icon="food"
                        text="Products"
                        onClick={() => history.push("/admin/products")}
                    />
                </Dropdown.Menu>
            </Dropdown>
        );
    } else {
        return (
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
                                backgroundColor: "#f02020",
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
        );
    }
};

export default MobileContainer;
