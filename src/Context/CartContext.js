import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserToken } from "./UserToken";



export let CartContext = createContext(0)


export default function CartContextProvider({children})
{

  let [cartNums,setCartNums] = useState(0)
  let [cartId, setCartId] = useState(null)
    let {isLogin} = useContext(UserToken)
    let headers = {token:isLogin}
    let BaseUrl = 'https://ecommerce.routemisr.com'
  //add to cart

  function addCart(productId)
  {
     return axios.post(`${BaseUrl}/api/v1/cart`,{productId},{headers})
    .then(res=>res)
    .catch(err=>err)
  }
  //get cart data
  function getCart()
  {
     return axios.get(`${BaseUrl}/api/v1/cart`,{headers})
    .then(res=>res)
    .catch(err=>err)
  }
  //delete ite,
  function deleteCart(id)
  {
     return axios.delete(`${BaseUrl}/api/v1/cart/${id}`,{headers})
    .then(res=>res)
    .catch(err=>err)
  }
  //delete Witch,
  function deleteWitch(id) {
    return axios
      .delete(`${BaseUrl}/api/v1/cart/${id}`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  //update count
  function updateCart(id,count)
  {
     return axios.put(`${BaseUrl}/api/v1/cart/${id}`,{count},{headers})
    .then(res=>res)
    .catch(err=>err)
  }
    

  //checkout

  function checkout(id,shippingAddress)
  {
    return axios.post(`${BaseUrl}/api/v1/orders/checkout-session/${id}`,{shippingAddress},{headers})
    .then(res=>res)
    .catch(err=>err)
  }

  function addWitchLis(productId) {
    return axios
      .post(`${BaseUrl}/api/v1/wishlist`, { productId }, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  function getWitchLis() {
    return axios
      .get(`${BaseUrl}/api/v1/wishlist`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }
   

    return (
      <CartContext.Provider
        value={{
          cartId,
          setCartId,
          addCart,
          getCart,
          deleteCart,
          updateCart,
          cartNums,
          setCartNums,
          checkout,
          addWitchLis,
          getWitchLis,
          deleteWitch,
        }}
      >
        {children}
      </CartContext.Provider>
    );
}