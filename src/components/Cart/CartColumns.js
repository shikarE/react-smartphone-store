import React, { Component } from "react";

export default function CartColumns() {
  return (
    <div
      className="container-fluid text-center d-none 
            d-lg-block "
    >
      <div className="row">
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercasse">products</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercasse">Name Of Product</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercasse">Price</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercasse">Quantity</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercasse">Remove</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercasse">Total</p>
        </div>
      </div>
    </div>
  );
}
