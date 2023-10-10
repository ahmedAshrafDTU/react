import axios from "axios";
import React, { useEffect, useState } from "react";

export default function VeryFyCode() {
  const [code, setCode] = useState(0);


  const BaseUrl = "https://ecommerce.routemisr.com";

  async function submitLresetCode() {
    console.log(
      code
    );
    let res = await axios.post(`${BaseUrl}/api/v1/auth/verifyResetCode`, {
      resetCode: code,
    });
    console.log(res);
  }






  const handleQueryChange = (e) => {
    setCode(e.target.value);
  };


  useEffect(() => {
    submitLresetCode()
  },[])

  return (
    <div className="container">
      <form>
        <input
          onChange={handleQueryChange}
          type="number"
          className="form-control mb-3"
          id="resetCode"
          name="resetCode"
        />

        <button
          className="btn form-btn ms-auto d-block"
          onClick={submitLresetCode}
          disabled
        >
          Sending...
        </button>
      </form>
    </div>
  );
}
