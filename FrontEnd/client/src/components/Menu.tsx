import { useNavigate } from "react-router";

const Menu = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (prop: boolean) => void;
}) => {
  const navigate = useNavigate();
  const handleRoute = (e: React.MouseEvent<HTMLSpanElement>) => {
    const route = e.currentTarget.dataset.productCategory;
    if (route == "normalV") navigate("/normalversion");
    else if(route == "playerV") navigate("/playerversion");
    else navigate("/")
    setIsMenuOpen(false);
  };

  return (
    <div
      className="w-90 transition-all duration-300 px-10 fixed z-200 min-h-screen h-screen bg-(--primary) shadow-2xl border-t-1 left-0 top-24 ease-in-out"
      style={{
        translate: isMenuOpen ? "0%" : "-100%",
        transition: "translate 0.3s ease-in-out",
      }}
    >
      <h1 className="font-bold text-4xl mb-5 tracking-wider">Menu</h1>
      <div className="text-lg mb-4 flex flex-col gap-3">
        <span
          className="hover:underline cursor-pointer text-lg"
          data-product-category="home"
          onClick={handleRoute}
        >
          Home
        </span>
      </div>
      <div className="w-full h-auto flex flex-col gap-4">
        <div>
          <h4 className="font-bold">Category</h4>
        </div>
        <div className="text-lg flex flex-col gap-3">
          <span
            className="hover:underline cursor-pointer"
            data-product-category="normalV"
            onClick={handleRoute}
          >
            Basic Jersey
          </span>
          <span
            className="hover:underline cursor-pointer"
            data-product-category="playerV"
            onClick={handleRoute}
          >
            Player Version Jersey
          </span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
