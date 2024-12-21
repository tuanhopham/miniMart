import React, { useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./header.css";

import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Container, Row } from "reactstrap";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { auth } from "../../firebase.config";
import { userACtions } from "./../../redux/slices/userSlice";

const nav__link = [
  { path: "home", display: "Home" },
  { path: "shop", display: "Shop" },
  {
    path: "cart",
    display: "Cart",
  },
];
export const Header = () => {
  const headerRef = useRef(null);
  const dispatch = useDispatch();

  const totalQuantity = useSelector((state) => state.cart.totalQuantily);
  const profileActionRef = useRef(null);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const photoURL = useSelector((state) => state.user.photoURL);
  const email = useSelector((state) => state.user.email);
  const handleScroll = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current?.classList.add("sticky__header");
    } else {
      headerRef.current?.classList.remove("sticky__header");
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch(userACtions.deleteUser());
        toast.success("Logged out");
        navigate("home");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuToggle = () => {
    menuRef.current.classList.toggle("active__menu");
  };

  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle("show__profileActions");
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <NavLink to={""}>
              <div className="logo">
                <img src={logo} alt="logo" />
                <div>
                  <h1>Furniture Mart</h1>
                </div>
              </div>
            </NavLink>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__link.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav__icons">
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badge">10</span>
              </span>
              <span className="cart__icon">
                <Link to="/cart">
                  <i className="ri-shopping-bag-line"></i>
                </Link>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className="profile">
                <motion.img
                  className="rounded-circle"
                  whileTap={{ scale: 1.2 }}
                  src={photoURL ? photoURL : userIcon}
                  alt="userIcon"
                  onClick={toggleProfileActions}
                />

                <div
                  className="profile__actions"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {email ? (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <span onClick={logout}>Logout</span>
                      <Link to="/dashboard">Dashboard</Link>
                      <Link to="/order">My Oder</Link>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};
