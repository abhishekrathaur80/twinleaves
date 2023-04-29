import React from "react";
import ProductList from "./ProductList";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProductDetailPage from "./ProductDetailPage";
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/products" exact>
          <ProductList />
        </Route>
        <Route path="/products/:gtin">
          <ProductDetailPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
