import React, { Component } from "react";
import { Link } from "react-router-dom";
import Example, { paymentMethods } from "./GpayButton";
import PaypalButton from "./PaypalButton";

export default function CartTotals({ value, history }) {
  const { cartSubtotal, cartTax, cartTotal, clearCart } = value;
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <Link to="/">
              <button
                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                type="button"
                onClick={clearCart}
              >
                Clear Cart{" "}
              </button>
            </Link>
            <h5 className="">
              <span className="text-title">Subtotal :</span>
              <strong className="">$ {cartSubtotal}</strong>
            </h5>
            <h5 className="">
              <span className="text-title">tax :</span>
              <strong className="">$ {cartTax}</strong>
            </h5>
            <h5 className="">
              <span className="text-title">Total :</span>
              <strong className="">$ {cartTotal}</strong>
            </h5>

            <PaypalButton
              total={cartTotal}
              clearCart={clearCart}
              history={history}
            />
            <div className="my-2">
              <Example
                total={cartTotal}
                clearCart={clearCart}
                history={history}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
