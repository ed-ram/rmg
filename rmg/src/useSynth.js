import React, { useReducer, useCallback, useEffect } from "react";
import Tone from 'tone';

var synth = new Tone.NoiseSynth({
  noise  : {
  type  : 'white'
  }  ,
  envelope  : {
  attack  : 0.055,
  decay  : 0.1,
  sustain  : 0.2
  }
  }).toMaster()

// synth.triggerAttack()

const INITIAL_STATE = {
    index: 0,
    strength: 0.0
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'update':
           return  {...state, [action.key]: action.value }
 
        default:
            return state
    }
}

export const useSynth = () => {
    const [state, dispatchCore] = useReducer(reducer, INITIAL_STATE);
    const dispatch = 
            action => {
                if (action.type === 'toggle_on') {
                    synth.triggerAttack();
                }
                if (action.type === 'toggle_off') {
                    synth.sustain = 0;
                    synth.type = 'brown'
                    synth.triggerAttack();
                }
                return dispatchCore(action);
            }
           console.log(synth.type) 
    
    return [state, dispatch]
}