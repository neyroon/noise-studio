import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "../utils/medias";

const Header = () => {
  return (
    <div className="flex justify-between mt-4">
      <Link href="/">
        <a>
          <img
            src={getStrapiMedia("/uploads/thumbnail_logo_black_326ad58aa7.png")}
            alt="home"
            className="logo"
            width="245"
            height="98"
          />
        </a>
      </Link>
    </div>
  );
};

export default Header;
