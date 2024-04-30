import React from "react";

import Image from "next/image";
import iconObj from "@/public/icons/utils";

import "./style.scss";

interface CartRateProps {
  rate: number;
}

const CartRate: React.FC<CartRateProps> = ({ rate }) => {
  return (
    <div className="prompt-cart-rate-container">
      <Image className="icon" src={iconObj.like} alt="star" />
      <p>{rate}</p>
    </div>
  );
};

export default CartRate;
