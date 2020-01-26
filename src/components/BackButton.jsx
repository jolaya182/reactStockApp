/**
 * title: BackButton.jsx
 *
 * date: 1/7/2020
 *
 * author: javier olaya
 *
 * description: this component holds the cusip back button
 */
import React from 'react';

/**
 * BackButton component
 */
const BackButton = () => {
  return (
    <div className="backButton">
      <a href="/home">
        <button type="button" className="">
          {`<-BACK`}
        </button>
      </a>
    </div>
  );
};

export default BackButton;
