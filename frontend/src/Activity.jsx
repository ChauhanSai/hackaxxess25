// Activity.jsx
import React from 'react';
import './styles/Activity.css';

const Activity = () => {
    return (
        <div className="activity-container">
            <h1 className="activity-title">My Activity</h1>
            <div className="activity-box">
                <div className="activity-row">
                    <div className="activity-image"></div>
                    <div className="activity-text">Date</div>
                    <div className="activity-text">Time</div>
                    <div className="activity-link">View Label</div>
                </div>
                <div className="activity-row">
                    <div className="activity-image"></div>
                    <div className="activity-text">Date</div>
                    <div className="activity-text">Time</div>
                    <div className="activity-link">View Label</div>
                </div>
                <div className="activity-row">
                    <div className="activity-image"></div>
                    <div className="activity-text">Date</div>
                    <div className="activity-text">Time</div>
                    <div className="activity-link">View Label</div>
                </div>
                <div className="activity-row">
                    <div className="activity-image"></div>
                    <div className="activity-text">Date</div>
                    <div className="activity-text">Time</div>
                    <div className="activity-link">View Label</div>
                </div>
            </div>
        </div>
    );
};

export default Activity;
