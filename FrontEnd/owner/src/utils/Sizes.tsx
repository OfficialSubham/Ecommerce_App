import EachSizes from "./EachSizes";

export type typeSize = "S" | "M" | "L" | "XL" | "XXL";

export type iSize = {
  [key in typeSize]: boolean;
};

const Sizes = ({
  closeButton,
  isOpen,
  selectedSizes,
  setSelectedSizes,
}: {
  closeButton: (state: boolean) => void;
  isOpen: boolean;
  setSelectedSizes: (state: iSize) => void;
  selectedSizes: iSize;
}) => {
  const sizes: typeSize[] = ["S", "M", "L", "XL", "XXL"];

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSizes({
      ...selectedSizes,
      [e.target.value]: e.target.checked,
    });
  };

  return (
    isOpen && (
      <div className="w-screen h-screen z-50 fixed flex justify-center items-center">
        <div className="absolute -z-10 w-full h-full bg-black opacity-50"></div>
        <div className="flex flex-col w-70 p-4 relative rounded-2xl bg-[#bfe0d1] ">
          <button
            className="absolute right-4"
            onClick={() => {
              closeButton(false);
            }}
          >
            X
          </button>
          <h2>Add Sizes</h2>
          <div className="flex flex-col gap-2 mt-3">
            {sizes.map((size) => {
              return (
                <EachSizes
                  handleOnChange={handleOnChange}
                  key={size}
                  size={selectedSizes[size]}
                  sizeValue={size}
                />
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default Sizes;
