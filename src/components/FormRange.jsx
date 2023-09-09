import { formatPrice } from "../utilize";
import { useState } from "react";

const FormRange = ({ label, name, size, defaultValue }) => {
  const step = 1000;
  const max = 100000;

  // 傳入的是個 string，記得要先變成 number
  // 若沒有找到 defaultValue，price 會變成 NaN
  const price = parseInt(defaultValue);
  // console.log(price);

  // useState
  const [selectedPrice, setSelectedPrice] = useState(price || max);

  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text capitalize">{label}</span>
        {/* 使用者移動 range 時，動態顯示數字 */}
        <span className="label-text-alt">{formatPrice(selectedPrice)}</span>
      </label>
      <input
        type="range"
        id={name}
        name={name}
        min={0}
        max={max}
        step={step}
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
        className={`range range-primary ${size}`}
      />
      <label className="label">
        <span className="label-text-alt">0</span>
        <span className="label-text-alt">Max: {formatPrice(max)}</span>
      </label>
    </div>
  );
};

export default FormRange;
