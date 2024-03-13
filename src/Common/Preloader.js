import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { BallTriangle } from 'react-loader-spinner';

// import './Preloader.css'; // Import CSS file for styling

const Preloader = () => {
    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        // Set a timeout to hide the preloader after 2 seconds
        const timeout = setTimeout(() => {
            setShowPreloader(false);
        }, 1200);

        // Clear the timeout when the component unmounts or when the dependency changes
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={`preloader ${showPreloader ? 'visible' : ''}`}>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            {/* <div className="loader"></div>
            <div className="loading-text">Loading...</div> */}
        </div>
    );
};

export default Preloader;
