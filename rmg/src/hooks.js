
import React, {useMemo, useState, useEffect} from 'react';

const calculateUnit = (width, length) => width / length;

export const useSpacing = (width, array) => useMemo(() => {
    const unit = calculateUnit(width, array.length) 
    return array.map((item, index) => ({...item, x: unit * (index +1) - (unit*0.5)}) )
  }, [width, array]);

  
export const useDimensions = () => {
      
      const getDimensions = () => ({
          width: window.innerWidth,
          height: window.innerHeight
      })
    const [dimensions, setDimensions] = useState(getDimensions());

    
    useEffect(() => {
        const resize = () => {setDimensions(getDimensions())};
        window.addEventListener('resize', resize);
     return () => window.removeEventListener('resize', resize)}, [])

    return dimensions

}