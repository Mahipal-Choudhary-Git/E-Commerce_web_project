import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import {
    Button,
    Container,
    Dropdown,
    Icon,
    Label,
    Image,
    Menu,
    Search,
    Segment,
    Visibility,
} from "semantic-ui-react";
import { Media } from "./ResponsiveContainer";
import Footer from "./Footer";
import _ from "lodash";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/userAuthActions";

const DesktopContainer = ({ children }) => {
    const [fixed, setFixed] = useState(false);
    const cartItemCount = useSelector((state) => state.cart.cartItems.length);
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector((state) => Object.values(state.products));

    const hideFixedMenu = () => setFixed(false);
    const showFixedMenu = () => setFixed(true);

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
                            {/* <NavLink to="/company" className="item">
                                Company
                            </NavLink> */}
                            <Menu.Item position="right">
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
                                            history.push(
                                                `/product/${data.result._id}`
                                            );
                                        }}
                                        resultRenderer={resultRenderer}
                                    />
                                </Menu.Item>
                                <Menu.Item>
                                    {renderAdmin(
                                        userInfo,
                                        fixed,
                                        cartItemCount,
                                        history
                                    )}
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

const renderAdmin = (user, fixed, cartItemCount, history) => {
    if (user && user.isAdmin) {
        return (
            <Dropdown
                text="admin"
                className={
                    fixed
                        ? "ui button grey right labeled dropdown icon"
                        : "ui button right labeled dropdown icon inverted"
                }
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
                                backgroundColor: "#f02020",
                                color: "#ffffff",
                            }}
                        >
                            {cartItemCount}
                        </Label>
                    </Button>
                ) : (
                    <Button inverted={!fixed}>Cart</Button>
                )}
            </Link>
        );
    }
};

export default DesktopContainer;
