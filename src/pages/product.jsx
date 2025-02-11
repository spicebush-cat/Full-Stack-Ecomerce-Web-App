import React from 'react'
import { useParams } from "react-router-dom";
function product() {
const {prodId}=useParams()
console.log(prodId);

  return (


    <div>
      
      product</div>
  )
}

export default product