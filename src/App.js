import "./App.css";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import Navi from "./Navi";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Notfound from "./Notfound";
import CartList from "./CartList";
import FormDemo1 from "./FormDemo1"
import FormDemo2 from "./FormDemo2"
export default class App extends Component {
  state = { currentCategory: "", products: [], cart: [] };

  removeProduct = (removedProduct) => {
    let restCart = this.state.cart.filter(
      (c) => c.product.id !== removedProduct.id
    );
    this.setState({ cart: restCart });
  };

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }

    this.setState({ cart: newCart });
    alertify.success(product.productName + " added to cart", 1);
  };

  componentDidMount() {
    this.getProducts();
  }
  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  render() {
    let CategoryListInfo = { title: "Category Listesi" };
    let ProductListInfo = { title: "Product Listesi" };
    return (
      <div>
        <div className="App">
          <Container>
            <Navi cart={this.state.cart} removeProduct={this.removeProduct} />

            <Row>
              <Col xs="3">
                <CategoryList
                  currentCategory={this.state.currentCategory}
                  changeCategory={this.changeCategory}
                  Info={CategoryListInfo}
                />
              </Col>
              <Col xs="9">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={(props) => (
                      <ProductList
                      
                        addToCart={this.addToCart}
                        products={this.state.products}
                        Info={ProductListInfo}
                      />
                    )}
                  ></Route>
                  <Route exact path="/cart" component={CartList}></Route>
                  <Route path="/form1" component={FormDemo1}></Route>
                  <Route path="/form2" component={FormDemo2}></Route>
                  <Route component={Notfound}></Route>
                </Switch>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
