import  { useState } from 'react';
import { useScrollTrigger } from '@mui/material';

const useScrollTriggerOnce = (options) => {
    // Hook to track scroll behaviour once
    const [triggered, setTriggered] = useState(false);

    const trigger = useScrollTrigger(options);

    // If the trigger is activated and we haven't triggered before, set triggered to true
    if (trigger && !triggered) {
        setTriggered(true);
    }

    return triggered;
};

export default useScrollTriggerOnce