import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const OrderDetails = () => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const history = useHistory();
    if (!userInfo) {
        history.push("/login?redirect=orders");
    }
    return <div>OrderDetails</div>;
};

export default OrderDetails;
