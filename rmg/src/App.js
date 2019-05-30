import React, { useReducer, useCallback, useMemo } from "react";
import { createId } from "./utils/generateId";
import { useSpacing } from "./hooks";
import "./App.css";
import Tone from "tone";
import { useDimensions } from "./hooks";
import { ReactComponent as AddCircle } from "./icons/add_circle-24px.svg";
import { colors } from "./config/colors";
import {useSynth} from './useSynth';

// TODO: move all this synth stuff into a useSynth({configuration}) hook


var synth1 = new Tone.DuoSynth({
  vibratoAmount: 0.5,
  vibratoRate: 5,
  harmonicity: 1.5,
  voice0: {
    volume: -10,
    portamento: 0,
    oscillator: {
      type: "sine"
    },
    filterEnvelope: {
      attack: 0.01,
      decay: 0,
      sustain: 1,
      release: 0.5
    },
    envelope: {
      attack: 0.01,
      decay: 0,
      sustain: 1,
      release: 0.5
    }
  },
  voice1: {
    volume: -10,
    portamento: 0,
    oscillator: {
      type: "sine"
    },
    filterEnvelope: {
      attack: 0.01,
      decay: 0,
      sustain: 1,
      release: 0.5
    },
    envelope: {
      attack: 0.01,
      decay: 0,
      sustain: 1,
      release: 0
    }
  }
}).toMaster();
synth1.triggerAttack("C4");
var synth2 = new Tone.DuoSynth({
  vibratoAmount: 0.5,
  vibratoRate: 5,
  harmonicity: 1.5,
  voice0: {
    volume: -10,
    portamento: 0,
    oscillator: {
      type: "sine"
    },
    filterEnvelope: {
      attack: 0.01,
      decay: 0,
      sustain: 1,
      release: 0.5
    },
    envelope: {
      attack: 0.01,
      decay: 0,
      sustain: 1,
      release: 0.5
    }
  },
  voice1: {
    volume: -10,
    portamento: 0,
    oscillator: {
      type: "sine"
    },
    filterEnvelope: {
      attack: 0.01,
      decay: 0,
      sustain: 1,
      release: 0.5
    },
    envelope: {
      attack: 0.01,
      decay: 0,
      sustain: 1,
      release: 0
    }
  }
}).toMaster();
synth2.triggerAttack("C5");
const INIT_STATE = {
  columns: [
    { id: 1, selected: false, a: 1, b: 0 },
    { id: 2, selected: false, a: 1, b: 0 },
    { id: 3, selected: false, a: 1, b: 0 }
  ],
  user: {
    ac_id: "",
    name: "",
    privs: []
  },
  concepts: ["..."]
};

const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.SELECT: {
      return {
        ...state,
        columns: state.columns.map(item =>
          item.id === action.payload
            ? { ...item, selected: true }
            : { ...item, selected: false }
        )
      };
    }
    case TYPES.ADD_COLUMN: {
      const newColumn = {
        id: createId(),
        selected: false,
        a: 1,
        b: 0
      };
      return { ...state, columns: [...state.columns, newColumn] };
    }
  }
};
const TYPES = {
  SELECT: "SELECT",
  ADD_COLUMN: "ADD_COLUMN"
};


const App = () => {
  const [stateExt, dispatchExt] = useSynth();
  console.log('state: ', stateExt);
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const { width, height } = useDimensions();
  const handleDotClick = useCallback(
    id => evt => {
      dispatchExt({type: 'toggle_off'})
      dispatch({ type: TYPES.SELECT, payload: id });
    },
    [dispatch]
  );
  const handleAddClick = useCallback(
    // () => dispatch({ type: TYPES.ADD_COLUMN }),
    // [dispatch]
    );
  const inc = () => dispatchExt({type: 'toggle_on'});

  const spacedColumns = useSpacing(width, state.columns);


  return (
    <>
      <svg
        version="1.1"
        baseProfile="full"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100%" height="100%" fill={colors.color1} />
        {spacedColumns.map((item, index) => (
          <>
            <circle
              onClick={handleDotClick(item.id)}
              cx={item.x}
              cy="100"
              r="30"
              fill={item.selected === true ? colors.color4 : colors.color5}
            />
            <line
              x1={item.x}
              x2={item.x}
              y1="0"
              y2={height}
              stroke={colors.color3}
            />
          </>
        ))}

        {/*<text text-anchor="start" x="20" y="20" font-size="20" fill="white">status goes here</text>}*/}
      </svg>
      <AddCircle
        onClick={inc/*handleAddClick*/}
        style={{
          fill: colors.color4,
          position: "absolute",
          top: "5px",
          right: "5px"
        }}
      />
    </>
  );
};

export default App;
