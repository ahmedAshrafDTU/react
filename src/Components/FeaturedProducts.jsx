
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { UserToken } from '../Context/UserToken'
import Loading from './Loading'
import useApi from '../hooks/useApi'


export default function FeaturedProducts() {

    
   
    let { addCart, setCartNums, setCartId, addWitchLis } =
      useContext(CartContext);
    let { isLogin } = useContext(UserToken)
    async function addCartFun(id) {
        let res = await addCart(id)
        if (!isLogin) {
            toast.error(res.response.data.message);
            return
        }
        toast.success(res.data.message, {
            duration: 2000,
            position: 'top-center',
        })
        setCartNums(res?.data.numOfCartItems);
        setCartId(res?.data.data._id);
    }
   
     let {isLoading,data} = useApi('products','products')
  
    if (isLoading)
        return <Loading/>




          async function addWitchLisFun(id) {
            let arrWitchis = await addWitchLis(id);
            toast.success(arrWitchis?.data.message);
          }


    
    return (
      <div className="container">
        <div className="row">
          {data?.data.data.map((product) => (
            <div className="col-lg-2 col-md-3 col-sm-6" key={product._id}>
              <div className="product p-3 cursor-pointer">
                <Link to={`productdetails/${product._id}`}>
                  <img src={product.imageCover} className="w-100" alt="img" />
                  <p className="text-main">{product.category.name}</p>
                  <p>{product.title.split(" ").slice(0, 2).join(" ")}</p>
                  <div className="product-box d-flex justify-content-between">
                    <span>{product.price} EGP</span>
                    <span>
                      {" "}
                      <i className="fa-solid fa-star rating-color"></i>{" "}
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    addCartFun(product._id);
                  }}
                  className="btn bg-main text-white my-2"
                >
                  Add to Cart
                </button>

                <div className="btn " onClick={() => {
                  addWitchLisFun(product._id)
                }}>
                    <i class="fa-solid fa-heart h3" style={{'color': 'red'}}></i>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
