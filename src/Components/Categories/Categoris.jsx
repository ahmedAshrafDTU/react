import axios from "axios";
import React, {  useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link as ScrollLink } from "react-scroll";
export default function Categoris() {
  const BaseUrl = "https://ecommerce.routemisr.com";

  function getData() {
    return axios.get(`${BaseUrl}/api/v1/categories`);
  }

  const { data } = useQuery("categories", getData);
  // subCategories
  let [arrsubcat, setArrsubcat] = useState([]);
  let [name,setName] = useState('')
  async function subcategoriesFun(id , name)  {
    let { data } = await axios.get(
      `${BaseUrl}/api/v1/categories/${id}/subcategories`
    );

    setArrsubcat(data?.data);
    setName(name);
  }

  console.log(arrsubcat);
  return (
    <div className="container d-md-block d-none my-3">
      <h2 className="h4 my-4">Shop Popular Category</h2>
      <div className="row gy-3">
        {data?.data?.data.map((cat) => (
          < >
            <div className="col-md-4">
              <ScrollLink to="section1" smooth={true} duration={500}>
                <div
                  class="card "
                  onClick={() => {
                    subcategoriesFun(cat._id, cat.name);
                  }}
                >
                  <img
                    className="w-100 cat"
                    src={cat.image}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <p className="card-text text-center text-main fw-bold">
                      {cat.name}
                    </p>
                  </div>
                </div>
              </ScrollLink>
            </div>
          </>
        ))}
      </div>

      <div id="section1">
        <h2 className="my-3 text-center"> {name} subcategories</h2>
        <div className="row">
          {arrsubcat.map((sub) => (
            <div className="col-md-4">
              <p className="text-black bg-white border fw-bolder fs-2  text-center p-2">
                {sub.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
