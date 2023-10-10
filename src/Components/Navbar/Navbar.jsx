import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/freshcart-logo.svg'
import { UserToken } from '../../Context/UserToken';
import { CartContext } from '../../Context/CartContext';
export default function Navbar({ test }) {

    let { isLogin, setIsLogin } = useContext(UserToken)
    let { cartNums } = useContext(CartContext)
    let navigate = useNavigate()

    function LogOut() {
        localStorage.removeItem('userToken')
        setIsLogin(null)
        navigate('/')

    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="container">
          <Link className="navbar-brand" to="">
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {isLogin ? (
              <ul className="navbar-nav m-auto me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link to="" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="cart" className="nav-link d-flex cursor-pointer">
                    <div className="cart-box d-inline-block position-relative">
                      Cart
                    </div>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"wishList"} className="nav-link">
                    wish list
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="brands" className="nav-link">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/products" className="nav-link">
                    Products
                  </Link>
                </li>

                <li className="nav-item">
                  {" "}
                  <Link to="categoris" className="nav-link">
                    Categoris
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav  mt-2 mt-lg-0 d-flex align-items-center ">
              {!isLogin ? (
                <>
                  <li className="nav-item">
                    <Link to="register" className="nav-link">
                      Register
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="login" className="nav-link">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="cart" className="nav-link d-flex cursor-pointer">
                      <div className="cart-box d-inline-block position-relative">
                        <i className="fa-solid fa-cart-shopping mt-1 fa-2x"></i>
                        <span
                          className="position-absolute rounded px-1  cart  text-white fw-bolder fs-1x"
                          style={{ background: "green" }}
                        >
                          {cartNums}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link cursor-pointer" onClick={LogOut}>
                      logOut
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
}

