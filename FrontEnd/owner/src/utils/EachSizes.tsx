const EachSizes = ({
  handleOnChange,
  size,
  sizeValue,
}: {
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sizeValue: string;
  size: boolean;
}) => {
  return (
    <div className="flex">
      <input
        type="checkbox"
        value={sizeValue}
        onChange={handleOnChange}
        checked={size}
      />
      <label className="ml-3" htmlFor="sSize">
        {sizeValue} Size
      </label>
    </div>
  );
};

export default EachSizes;
