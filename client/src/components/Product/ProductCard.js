import { Link, useHistory } from "react-router-dom";
import { Rating } from "semantic-ui-react";

const onUserRating = (e, { rating }) => {
    console.log(rating);
};

const ProductCard = ({ product }) => {
    const history = useHistory();

    const onImageClick = (id) => {
        history.push(`/product/${id}`);
    };
    return (
        <div className="ui card">
            <div className="image" onClick={() => onImageClick(product._id)}>
                <img src={product.image} alt={product.name} />
            </div>
            <div className="content">
                <Link to={`/product/${product._id}`}>
                    <div className="header">{product.name}</div>
                </Link>
                <div className="meta">{product.brand}</div>
                <div className="description">{product.description}</div>
            </div>
            <div className="extra content">
                <div className="header">{`Price :  $ ${parseFloat(
                    product.price
                )}`}</div>
                Rating :
                <Rating
                    icon="star"
                    defaultRating={product.rating}
                    maxRating={5}
                    onRate={onUserRating}
                />
                {product.numReviews} Reviews
            </div>
        </div>
    );
};

export default ProductCard;
