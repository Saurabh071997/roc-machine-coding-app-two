import { Container, Typography, Grid, Button } from "@material-ui/core";
import { useApp } from "../context/AppProvider";

const CartProductCard = ({ product, quantity }) => {
  const { dispatch } = useApp();
  return (
    <>
      <Grid item style={{ margin: "0.5rem 0rem" }}>
        <div style={{ display: "flex" }}>
          <div className="img-div">
            <img src={product?.imgUrl} alt="img" className="img-cart" />
          </div>
          <div className="content-div">
            <Typography variant="h6">{product?.brandName}</Typography>
            <Typography varinat="body2">{product?.name}</Typography>

            <Typography variant="subtitle1">
              &#8377;{product?.effectivePrice } &nbsp;{" "}
              {product?.isDiscounted && (
                <>
                  <span
                    style={{ textDecoration: "line-through", opacity: "0.85" }}
                  >
                    &#8377;{product?.actualPrice}
                  </span>{" "}
                 
                </>
              )}
            </Typography>

            <div style={{ display: "flex", margin: "0.25rem 0rem" }}>
              <button
                className="btn-dec"
                onClick={() => {
                  if (quantity === 1) {
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: { _id: product?._id },
                    });
                  } else {
                    dispatch({
                      type: "DECREMENT_QUANTITY",
                      payload: { _id: product?._id },
                    });
                  }
                }}
              >
                -
              </button>
              <button className="btn-quantity">{quantity}</button>
              <button
                className="btn-inc"
                onClick={() => {
                  dispatch({
                    type: "INCREMENT_QUANTITY",
                    payload: { _id: product?._id },
                  });
                }}
              >
                +
              </button>
            </div>

            <Button
              variant="contained"
              style={{
                width: "100%",
                marginBottom: "0.3rem",
                fontSize: "0.75rem",
              }}
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: { _id: product?._id },
                })
              }
            >
              Remove from Cart
            </Button>
            <Button
              variant="contained"
              style={{ width: "100%", fontSize: "0.75rem" }}
              onClick={() => {
                dispatch({
                  type: "MOVE_TO_WISHLIST",
                  payload: { _id: product?._id },
                });
              }}
            >
              Move to Wishlist
            </Button>
          </div>
        </div>
      </Grid>
    </>
  );
};

export const Cart = () => {
  const {
    state: { itemsInCart, productList },
  } = useApp();

  const billingInfo = itemsInCart.reduce(
    (prev, curr) => {
      const currProduct = productList.find(
        (item) => item?._id === curr?.productId
      );

      return {
        ...prev,
        total: prev.total + currProduct?.actualPrice * curr.quantity,

        pay: prev.pay + currProduct?.effectivePrice * curr.quantity,
        saved:
          prev.saved +
          (currProduct?.actualPrice - currProduct?.effectivePrice) *
            curr.quantity,
      };
    },
    { total: 0, saved: 0, pay: 0 }
  );
  return (
    <>
      <Container maxWidth="md" style={{ padding: "0rem" }}>
        <Typography variant="h4" align="center" gutterBottom style={{marginTop:"1rem"}}>
          Cart {itemsInCart?.length > 0 && `(${itemsInCart?.length})`}
        </Typography>

        {itemsInCart?.length < 1 ? (
          <Typography variant="h4" align="center" style={{ color: "#94A3B8" }}>
            No Items In Cart
          </Typography>
        ) : (
          <div className="page-container">
            <div className="page-container-left">
              <Grid container direction="column">
                {itemsInCart?.map((item) => {
                  const productInCart = productList?.find(
                    (productItem) => productItem?._id === item?.productId
                  );
                  return (
                    <CartProductCard
                      product={productInCart}
                      quantity={item?.quantity}
                    />
                  );
                })}
              </Grid>
            </div>
            <div className="page-container-right">
              <Typography variant="h5">Billing Information</Typography>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="bill-div">
                  <Typography variant="h6">Total Amount</Typography>
                  <Typography variant="body1" style={{fontWeight:"bold"}}>&#8377;{billingInfo?.total}</Typography>
                </div>
                <div className="bill-div">
                  <Typography variant="h6"> Amount To Pay</Typography>
                  <Typography variant="body1" style={{fontWeight:"bold"}}>&#8377;{billingInfo?.pay}</Typography>
                </div>

                <div className="bill-div" style={{color:"#16A34A"}}>
                  <Typography variant="h6">Saved</Typography>
                  <Typography variant="body1" style={{fontWeight:"bold"}}>&#8377;{billingInfo?.saved}</Typography>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
