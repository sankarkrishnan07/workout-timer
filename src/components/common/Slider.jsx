import PropTypes from "prop-types";
import { memo } from "react";

const Slider = memo(function Slider({
  label = "label",
  id = "slider1",
  step = 1,
  min = 0,
  max = 10,
  inputMsg = "",
  value,
  handleChange,
}) {
  return (
    <div className="input-wrap">
      <label htmlFor={id}>{label}</label>
      <input
        type="range"
        name="range"
        id={id}
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
      <span className="input-msg">
        {value} {inputMsg}
      </span>
    </div>
  );
})

Slider.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  inputMsg: PropTypes.string,
  value: PropTypes.number,
  handleChange: PropTypes.func,
};

export default Slider;
