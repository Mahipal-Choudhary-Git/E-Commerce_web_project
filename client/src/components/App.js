import LoginForm from "./LoginForm";
import ResponsiveContainer from "./ResponsiveContainer/ResponsiveContainer";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import HomepageLayout from "./HomePage/HomepageLayout";
import SignupForm from "./SignupForm";
import ProductList from "./Product/ProductList";
import ProductDetails from "./Product/ProductDetail";
import ViewCart from "./Cart/ViewCart";
import Shipping from "./Cart/Shipping";
import Billing from "./Cart/Billing";

const App = () => {
    return (
        <BrowserRouter>
            <ResponsiveContainer>
                <Switch>
                    <Route
                        path="/product/:id"
                        exact
                        component={ProductDetails}
                    />
                    <Route path="/billing" exact component={Billing} />
                    <Route path="/shipping" exact component={Shipping} />
                    <Route path="/cart/:id?" exact component={ViewCart} />
                    <Route path="/login" exact component={LoginForm} />
                    <Route path="/signup" exact component={SignupForm} />
                    <Route path="/company" exact component={ProductList} />
                    <Route path="/" exact component={HomepageLayout} />
                </Switch>
            </ResponsiveContainer>
        </BrowserRouter>
    );
};

export default App;
