import CategoryButtons from "./CategoryButtons";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, categories }) => {
  return (
    <div className="flex bg-gray-200">
      <aside className="hidden lg:block">
        <CategoryButtons categories={categories} />
      </aside>
      <div className="flex flex-col min-h-screen w-full mx-6">
        <Header />

        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
