const Product = () => {
  return (
    <div className="w-full flex gap-3 flex-col h-[400px]">
      <div className="w-full h-3/4">
        <img
          src="./product2.png"
          className="w-full h-full object-cover rounded-3xl"
          alt=""
        />
      </div>
      <div className="flex-1 flex justify-between items-center px-2">
        <div className="text-sm font-[Amagro]">
          <h4 >Barcelona Jersey Player Edition</h4>
          <h3>&#8377; 699.00 </h3>
        </div>
        <div className="bg-(--primary-button) rounded-2xl h-10 px-3 py-2.5 flex items-center">
          <button className="h-full">
            <img src="./svg/arrow.svg" className="object-cover h-full" alt="alt" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
