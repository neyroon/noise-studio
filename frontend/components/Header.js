import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex justify-between mt-4">
      <Link href="/">
        <a>
          <Image src="/strapi.png" alt="home" className="logo" />
        </a>
      </Link>
    </div>
  );
};

export default Header;
