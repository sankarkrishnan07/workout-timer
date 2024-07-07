import { memo, useEffect, useState } from "react";
import Slider from "./common/Slider";
import PropTypes from "prop-types";
import audio from "../../public/ClickSound.m4a";

const Calculator = memo(function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!allowSound) return;
    const sound = new Audio(audio);
    sound.play();
  }, [allowSound, duration]);

  useEffect(
    () =>
      setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak),
    [number, sets, speed, durationBreak]
  );

  useEffect(() => {
    document.title = `Your ${number} Exercise Workout`;
  });

  function handleInc() {
    setDuration((duration) => Math.floor(duration) + 1);
  }

  function handleDec() {
    setDuration((duration) =>
      duration > 1 ? Math.ceil(duration) - 1 : 0
    );
  }

  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  return (
    <div className="calculator">
      <form className="calculator-form">
        <div className="input-wrap">
          <label className="input-label" htmlFor="type">
            Type of Workout
          </label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <Slider
          id="sets"
          label="How many sets?"
          min={1}
          max={5}
          value={sets}
          handleChange={(e) => setSets(Number(e.target.value))}
        />
        <Slider
          id="speed"
          label="How fast are you?"
          min={30}
          max={180}
          inputMsg="sec/exercise"
          step={30}
          value={speed}
          handleChange={(e) => setSpeed(Number(e.target.value))}
        />
        <Slider
          id="break"
          label="Break length"
          min={1}
          max={10}
          inputMsg="minutes/break"
          value={durationBreak}
          handleChange={(e) => setDurationBreak(Number(e.target.value))}
        />
      </form>
      <div className="timer">
        <button onClick={handleDec}>-</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={handleInc}>+</button>
      </div>
    </div>
  );
});

Calculator.propTypes = {
  workouts: PropTypes.array,
  allowSound: PropTypes.any,
};

export default Calculator;
