import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./button";

class Details extends Component {
  state = {};
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          console.log(value.detailProduct, "details");
          const {
            id,
            title,
            company,
            img,
            inCart,
            info,
            price,
          } = value.detailProduct;
          return (
            <div className="container py-5">
              {/*title*/}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1 className="">{title}</h1>
                </div>
              </div>

              {/*end of title*/}
              {/*product info*/}

              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-6 ">
                  <img src={img} alt="product" className="img-fluid" />
                </div>
                {/*product text*/}
                <div className="col-10 mx-auto col-md-6 my-6 text-capitalize">
                  <h2>model : {title} </h2>
                  <h4 className="text-title text-uppercase text-muted mt-3 mt-2">
                    made by <span>{company}</span>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      price : <span>$</span>
                      {price}
                    </strong>
                  </h4>
                  <p className="font-weight-bold mt-3 mb-0">
                    Some info about product
                  </p>
                  <p className="text-muted lead">{info}</p>
                  {/*buttons*/}
                  <div>
                    <Link to="/">
                      {" "}
                      <ButtonContainer>back to products </ButtonContainer>
                    </Link>
                    <ButtonContainer
                      cart
                      disabled={inCart}
                      onClick={() => {
                        value.addToCart(id);
                        value.openModal(id);
                      }}
                    >
                      {inCart ? "In Cart" : "Add To Cart"}
                    </ButtonContainer>
                  </div>
                </div>
                {/* end of product text*/}
              </div>

              {/* endproduct info*/}
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}

export default Details;
