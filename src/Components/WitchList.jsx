import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./../Context/CartContext";
import toast from "react-hot-toast";
import { UserToken } from "../Context/UserToken";

export default function WitchList() {
  let { getWitchLis, addCart, setCartId, setCartNums, deleteWitch } =
    useContext(CartContext);
    let { isLogin } = useContext(UserToken);



  
  let [arrWitch, setWitch] = useState([]);
  async function getWitchLisFun() {
    let res = await getWitchLis();
    setWitch(res?.data.data);
    console.log("get");
    console.log(arrWitch);
  }



 async function addCartFunction(id) {
    console.log(id);
   let res = await addCart(id)
console.log(id);
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

 async function deleteCartFunction(id) {
   let res = await deleteWitch(id);
   if (res.data.status === "success") {
    getWitchLisFun();
   }
   

 }
  
  
  useEffect(() => {
    getWitchLisFun();
  }, [setWitch]);

  return (
    <div className="container  w-75 mx-auto">
      <h2>my watch list</h2>
      {arrWitch?.map((prod) => (
        <div className="row " key={prod.id}>
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-2">
                <img src={prod.imageCover} alt="" className="w-100" />
              </div>
              <div className="col-md-10">
                <h3>{prod.slug}</h3>
                <p>{prod.price} EGP</p>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    deleteCartFunction(prod.id);
                  }}
                >
                  {" "}
                  <i className="fa-solid fa-trash text-main"></i> Remove{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div
              className="btn btn-info"
              onClick={() => {
                addCartFunction(prod.id);
              }}
            >
              add Cart
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
