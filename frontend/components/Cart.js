import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import cartIcon from "../public/cart.svg";

const Cart = (props) => {
  const { itemCount, cartItems } = useContext(CartContext);

  return (
    <div className="relative">
      <Link href="/cart">
        <a className="block relative" style={{ fontSize: 0 }}>
          <span
            className="absolute top-0 right-0 text-sm font-semibold rounded-full w-5 h-5 
          bg-black z-10 text-gray-200 flex justify-center align-middle"
          >
            {itemCount}
          </span>
          <Image src={cartIcon} layout="fixed" width={40} height={40} />
        </a>
      </Link>
    </div>
  );
};

export default Cart;
