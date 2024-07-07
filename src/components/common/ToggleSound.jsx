import PropTypes from "prop-types";
import { memo } from "react";

const ToggleSound = memo(function ToggleSound({ allowSound, setAllowSound }) {

  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
});
ToggleSound.propTypes = {
  allowSound: PropTypes.bool,
  setAllowSound: PropTypes.func,
};

export default ToggleSound;
