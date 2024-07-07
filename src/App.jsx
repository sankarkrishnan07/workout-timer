import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator";
import ToggleSound from "./components/common/ToggleSound";

function App() {
  const [time, setTime] = useState(formatTime(new Date()));
  const [allowSound, setAllowSound] = useState(false);

  const partOfDay = time.slice(-2);

  const workouts = useMemo(() => {
    return [
      {
        name: "Full-body workout",
        numExercises: partOfDay === "AM" ? 9 : 8,
      },
      {
        name: "Arms + Legs",
        numExercises: 6,
      },
      {
        name: "Arms only",
        numExercises: 3,
      },
      {
        name: "Legs only",
        numExercises: 4,
      },
      {
        name: "Core only",
        numExercises: partOfDay === "AM" ? 5 : 4,
      },
    ];
  }, [partOfDay]);

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000);

    return () => clearInterval(id);
  }, []);

  function formatTime(date) {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  }

  return (
    <div className="app-container">
      <h1 className="app-title">Workout Timer</h1>
      <time className="app-time">For your Workout on {time}</time>
      <ToggleSound allowSound={allowSound} setAllowSound={setAllowSound} />
      <Calculator workouts={workouts} allowSound={allowSound} />
    </div>
  );
}

export default App;
