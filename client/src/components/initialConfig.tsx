import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



/**
 * Component for verifying if a user is visiting the app for the first time
 * Redirect to mainpage if user opts to skip setting up their config
 */

export function initialConfig() {
    const [isFirstVisit, setIsFirstVisit] = useState(false);
    const [optOut, setOptOut] = useState(false);

    // Get the history object from the useHistory hook
    const history = useNavigate();

    //Inside this use hook we check to see if the "hasVisitedBefore" flag exists in localStorage
    //and change states accordingly to if it's stored
    //this is an indicator of whether or not user is opening the app for the first time
    useEffect(() => {
        const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
        if (!hasVisitedBefore) {
            setIsFirstVisit(true);
            localStorage.setItem('hasVisitedBefore', 'true');
        }
    }, []);

    // Redirect the user to the userForms page if it's their first visit and they choose to not opt out
    useEffect(() => {
        if (isFirstVisit && !optOut) {
            history('/userPreferenceForm');
        }
    }, [isFirstVisit, optOut, history]);

    // Handle the opt-out button click
    const handleOptOut = () => {
    setOptOut(true);
    };

    // Render the settings based on isFirstVisit and optOut state
    // If isFirstVisit is true, the two buttons will be displayed instead,
    // and if it's false, nothing will be displayed.
    return (
        <div>
          {isFirstVisit ? (
            <div>
              <button onClick={() => history('/userPreferenceForm')}>
                Configure your preferences
              </button>
              <button onClick={handleOptOut}>Opt Out</button>
            </div>
          ) : null} 
        </div>
      );
}; 