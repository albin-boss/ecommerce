import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import "./cart.css";

const demoItems = [
  {
    id: 1,
    title: "Nike Air Max",
    price: 120.0,
    qty: 1,
    size: "10",
    color: "Black",
    image: "https://i.redd.it/0k09tgr01o421.jpg"
  },
  {
    id: 2,
    title: "Adidas Ultraboost",
    price: 150.0,
    qty: 2,
    size: "9",
    color: "White",
    image: "https://i.redd.it/0k09tgr01o421.jpg"
  },
  {
    id: 3,
    title: "BokkS",
    price: 300.0,
    qty: 1,
    size: "10",
    color: "Black",
    image: "https://i.redd.it/0k09tgr01o421.jpg"
  },
];

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const handleAdd = (item) => {
    dispatch(addCart(item));
  };

  const handleRemove = (item) => {
    if (item.qty > 1) {
      dispatch(delCart(item));
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: item.id });
    }
  };

  const renderCart = () => {
    const cartItems = state.length > 0 ? state : demoItems; // Use demo items if cart is empty
    let subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    let shipping = cartItems.length > 0 ? 30.0 : 0;
    let totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-center row">
          <div className="col-md-8">
            <div className="p-2">
              <h4>Shopping Cart</h4>
            </div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded"
              >
                <div className="mr-1">
                  <img className="rounded" src={item.image} width="70" alt={item.title} />
                </div>
                <div className="d-flex flex-column align-items-center product-details">
                  <span className="font-weight-bold">{item.title}</span>
                  <div className="d-flex flex-row product-desc">
                    <div className="size mr-1">
                      <span className="text-grey">Size:</span>
                      <span className="font-weight-bold">&nbsp;{item.size}</span>
                    </div>
                    <div className="color">
                      <span className="text-grey">Color:</span>
                      <span className="font-weight-bold">&nbsp;{item.color}</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center qty">
                  <i
                    className="fa fa-minus text-danger"
                    onClick={() => handleRemove(item)}
                    style={{ cursor: "pointer" }}
                  ></i>
                  <h5 className="text-grey mt-1 mx-2">{item.qty}</h5>
                  <i
                    className="fa fa-plus text-success"
                    onClick={() => handleAdd(item)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </div>
                <div>
                  <h5 className="text-grey">${(item.price * item.qty).toFixed(2)}</h5>
                </div>
                <div className="d-flex align-items-center">
                  <i
                    className="fa fa-trash mb-1 text-danger"
                    onClick={() => handleRemove(item)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </div>
              </div>
            ))}
            <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded">
              <input
                type="text"
                className="form-control border-0 gift-card"
                placeholder="Discount code/gift card"
              />
              <button className="btn btn-outline-warning btn-sm ml-2" type="button">
                Apply
              </button>
            </div>
            <div className="d-flex flex-column align-items-center mt-3 p-2 bg-white rounded">
              <h5>Subtotal: ${subtotal.toFixed(2)}</h5>
              <h5>Shipping: ${shipping.toFixed(2)}</h5>
              <h4>Total: ${(subtotal + shipping).toFixed(2)}</h4>
              <button
                className="btn btn-warning btn-lg mt-2 pay-button"
                type="button"
                disabled={state.length === 0}
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      {renderCart()}
      <Footer />
    </>
  );
};

export default Cart;
