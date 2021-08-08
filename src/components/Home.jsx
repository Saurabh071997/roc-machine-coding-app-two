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

const ProductCard = ({ product }) => {
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
            <Typography variant="h5" style={{fontWeight:"bold"}}>{product?.brandName}</Typography>
            <Typography varinat="body2">{product?.name}</Typography>

            <Typography variant="subtitle1">
              &#8377;<span style={{fontSize:"1.15rem"}}>{product?.effectivePrice}</span> &nbsp;{" "}
              {product?.isDiscounted && (
                <>
                  <span
                    style={{ textDecoration: "line-through", opacity: "0.85", color:"#64748B" }}
                  >
                    &#8377;{product?.actualPrice}
                  </span>{" "}
                  &nbsp;&nbsp;
                  <span style={{color:"#16A34A"}}>{product?.discount + "%Off"}</span>
                </>
              )}
            </Typography>

            <Button
              variant="contained"
              style={{ width: "100%", marginBottom: "0.3rem", fontSize:"0.75rem" }}
              onClick={() =>
                dispatch({
                  type: "ADD_TO_WISHLIST",
                  payload: { _id: product?._id },
                })
              }
            >
              Add to Wishlist
            </Button>
            <Button
              variant="contained"
              style={{ width: "100%", fontSize:"0.75rem" }}
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: { _id: product?._id },
                });
              }}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export const Home = () => {
  const {
    state: { productList },
  } = useApp();
  return (
    <>
      <Container maxWidth="md">
        <Grid
          container
          direction="row"
          //   justifyContent="space-evenly"
          wrap="wrap"
          //   spacing={2}
        >
          {productList?.map((item) => {
            return <ProductCard product={item} key={item?._id} />;
          })}
        </Grid>
      </Container>
    </>
  );
};
