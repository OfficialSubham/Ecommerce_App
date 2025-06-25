import Product from "./Product";

const Contents = () => {
  const array = [1, 2, 3, 4, 5, 6];
  return (
    <div className="w-full h-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-4 ">
      {array.map((id) => {
        return <Product key={id} />;
      })}
    </div>
  );
};

export default Contents;
