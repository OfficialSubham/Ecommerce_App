const Navbar = () => {
  return (
    <div className="font-[Buster] flex top-0 sticky justify-between px-10 py-5 h-24 text-2xl bg-(--primary) text-(--primary-color) shadow">
     <div className='flex gap-2 bg-(--secondary) px-2 w-30 items-center h-full justify-center rounded-3xl'>
        Logo
      </div>
      <div className='flex gap-2 bg-(--secondary) px-2 w-30 items-center h-full justify-center rounded-3xl cursor-pointer'>
        CART 
        <div className="w-6">
          <img src="./svg/cart.svg" className='object-contain w-6' alt="" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
