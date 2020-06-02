import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
const ProducrContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    cart: [],
    detailProduct: detailProduct,
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };
  componentDidMount() {
    this.setProduct();
  }
  setProduct = () => {
    let products = [];
    storeProducts.forEach((item) => {
      const newItem = { ...item };
      products = [...products, newItem];
    });

    this.setState({ products });
  };

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  handleDetail = (id) => {
    const product = this.getItem(id);

    this.setState({ detailProduct: product });
  };
  addToCart = (id) => {
    const temp = [...this.state.products];
    const index = temp.indexOf(this.getItem(id));
    const product = { ...temp[index] };
    product.inCart = true;
    product.count = 1;
    product.total = product.price;
    temp[index] = product;

    console.log(this.state.products, "state prods");

    this.setState(
      {
        detailProduct: product,
        products: temp,
        cart: [...this.state.cart, product],
      },
      () => {
        this.addTotals();
      }
    );
  };
  openModal = (id) => {
    const product = this.getItem(id);
    this.setState({ modalProduct: product, modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  increment = (id) => {
    const tempProduct = [...this.state.products];
    const index = tempProduct.indexOf(this.getItem(id));
    const prod = { ...tempProduct[index] };
    prod.count += 1;
    prod.total += prod.price;
    tempProduct[index] = prod;
    let tempCart = [...this.state.cart];
    const selprod = tempCart.find((item) => id === item.id);
    const index2 = tempCart.indexOf(selprod);
    const selprod2 = { ...tempCart[index2] };
    selprod2.count += 1;
    selprod2.total += selprod2.price;
    tempCart[index2] = selprod2;
    this.setState({ products: tempProduct, cart: tempCart }, () => {
      this.addTotals();
    });
  };

  decrement = (id) => {
    const tempProduct = [...this.state.products];
    const index = tempProduct.indexOf(this.getItem(id));
    const prod = { ...tempProduct[index] };
    if (prod.count == 1) {
      this.removeItem(id);
      return;
    }
    prod.count -= 1;
    prod.total -= prod.price;
    tempProduct[index] = prod;
    let tempCart = [...this.state.cart];
    const selprod = tempCart.find((item) => id === item.id);
    const index2 = tempCart.indexOf(selprod);
    const selprod2 = { ...tempCart[index2] };
    selprod2.count -= 1;
    selprod2.total -= selprod2.price;
    tempCart[index2] = selprod2;
    this.setState({ products: tempProduct, cart: tempCart }, () => {
      this.addTotals();
    });
  };

  removeItem = (id) => {
    const tempProducts = [...this.state.products];
    const tempCart = this.state.cart.filter((item) => item.id !== id);

    const index = tempProducts.indexOf(this.getItem(id));
    const prod = { ...tempProducts[index] };
    prod.count = 0;
    prod.inCart = false;
    prod.total = 0;
    tempProducts[index] = prod;

    this.setState({ products: tempProducts, cart: tempCart }, () => {
      this.addTotals();
    });
  };

  clearCart = () => {
    const cart = [];
    this.setState({ cart: cart }, () => {
      this.setProduct();
      this.addTotals();
    });
  };

  addTotals = () => {
    let subtotal = 0;
    this.state.cart.forEach((item) => {
      subtotal += item.total;
    });
    const tempTax = subtotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subtotal + tax;

    this.setState({ cartSubtotal: subtotal, cartTax: tax, cartTotal: total });
  };

  render() {
    return (
      <ProducrContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}
      >
        {this.props.children}
      </ProducrContext.Provider>
    );
  }
}

const ProductConsumer = ProducrContext.Consumer;

export { ProductProvider, ProductConsumer };
