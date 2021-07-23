import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import SearchBar from "./SearchBar";
import { getStrapiMedia } from "../utils/medias";

const Cart = dynamic(() => import("./Cart"), { ssr: false });

const Header = () => {
  return (
    <div className="flex justify-between items-center mt-4 flex-wrap lg:flex-nowrap">
      <Link href="/">
        <a className="flex-shrink sm:flex-shrink-0 w-4/5 sm:w-auto">
          <Image
            src={getStrapiMedia("/uploads/thumbnail_logo_black_326ad58aa7.png")}
            alt="home"
            className=""
            width="245"
            height="98"
            layout="intrinsic"
          />
        </a>
      </Link>
      <SearchBar />
      <Cart />
    </div>
  );
};

export default Header;
