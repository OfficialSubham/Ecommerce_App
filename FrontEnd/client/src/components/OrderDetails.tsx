const OrderDetails = () => {
  return (
    <div className="flex items-center justify-center absolute z-20 h-[calc(100vh-6rem)] w-screen">
      <div className="h-full w-full relative bg-black opacity-40 z-10"></div>
      <div className="gap-5 shadow-2xl rounded-2xl absolute bg-(--primary) grid grid-row-5 z-20 px-3 py-5 min-w-screen">
        <div className="w-full row-span-1 flex items-center gap-5">
          <h5 className="font-[Buster]">Name</h5>
          <input type="text" className="bg-(--secondary) h-10 rounded-2xl" />
        </div>
        <div className="row-span-1 flex items-center gap-5">
          <h5 className="font-[Buster]">Phone No.</h5>
          <input type="text" className="bg-(--secondary) h-10 rounded-2xl w-72" />
        </div>
        <div className="row-span-3">
          <h5 className="font-[Buster]">Address</h5>
          <textarea
            name="address"
            id=""
            className="bg-(--secondary) h-20 w-full rounded-2xl"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
