import { AppBar, Toolbar, Grid, Typography } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Wishlist } from "./components/Wishlist";
import {Cart} from './components/Cart'

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <AppBar position="sticky">
        <Toolbar>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography
                variant="h4"
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
              >
                Shoppzie
              </Typography>
            </Grid>
            <Grid item>
              <FavoriteIcon
                style={{ height: "2rem", width: "2rem", cursor: "pointer" }}
                onClick={() => navigate("/wishlist")}
              />
              <ShoppingCartIcon
                style={{ height: "2rem", width: "2rem", cursor: "pointer" }}
                onClick={() => navigate("/cart")}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </div>
  );
}

export default App;
