import {
  Container,
  Card,
  CardActions,
  CardContent,
  Grid,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import { useApp } from "../context/AppProvider";

const WishListedProduct = ({ product }) => {
  const { dispatch } = useApp();
  return (
    <>
      <Grid item style={{ margin: "0.25rem" }}>
        <Card style={{ width: "250px" }}>
          <CardActions>
            <CardMedia
              component="img"
              alt="product"
              height="300"
              image={product?.imgUrl}
              title={product?.name}
            />
          </CardActions>
          <CardContent style={{ minHeight: "140px" }}>
            <Typography variant="h6">{product?.brandName}</Typography>
            <Typography varinat="body2">{product?.name}</Typography>

            <Typography variant="subtitle1">
              &#8377;{product?.effectivePrice} &nbsp;{" "}
              {product?.isDiscounted && (
                <>
                  <span
                    style={{ textDecoration: "line-through", opacity: "0.85" }}
                  >
                    &#8377;{product?.actualPrice}
                  </span>{" "}
                  &nbsp;&nbsp;
                  <span>{product?.discount + "%Off"}</span>
                </>
              )}
            </Typography>

            <Button
              variant="contained"
              style={{
                width: "100%",
                marginBottom: "0.3rem",
                fontSize: "0.75rem",
              }}
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_WISHLIST",
                  payload: { _id: product?._id },
                })
              }
            >
              Remove
            </Button>
            <Button
              variant="contained"
              style={{ width: "100%", fontSize: "0.75rem" }}
              onClick={() => {
                dispatch({
                  type: "MOVE_TO_CART",
                  payload: { _id: product?._id },
                });
              }}
            >
              Move to Cart
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export const Wishlist = () => {
  const {
    state: { itemsInWishlist, productList },
  } = useApp();
  return (
    <>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ marginTop: "1rem" }}
        >
          WishList
        </Typography>
        <Grid
          container
          direction="row"
          //   justifyContent="space-evenly"
          wrap="wrap"
          //   spacing={2}
        >
          {itemsInWishlist?.length < 1 && (
            <Typography
              variant="h4"
              align="center"
              style={{ color: "#94A3B8" }}
            >
              No Items In Wishlist
            </Typography>
          )}
          {itemsInWishlist?.map((item) => {
            let wishlistProduct = productList?.find(
              (productItem) => productItem?._id === item?.productId
            );
            return (
              <WishListedProduct
                product={wishlistProduct}
                key={item?.productId}
              />
            );
          })}
        </Grid>
      </Container>
    </>
  );
};
