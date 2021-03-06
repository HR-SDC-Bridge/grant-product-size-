import React from 'react';

const ProductSizeButton = (props) => {
  return (
    <button className="chunky-header" type="button" onClick={props.handleClick}>
      <span className="chunky-header__title-wrapper">
        <span className="chunky-header__title">
          Product Size
        </span>
      </span>
      <svg
        focusable="false" 
        viewBox="0 0 24 24" 
        className="svg-icon chunky-header__icon"
        aria-hidden="true">
        <path
          fillRule="evenodd" 
          clipRule="evenodd"
          d="M15.6 12l-5.785 5.786L8.4 16.372l4.371-4.371-4.37-4.372 1.414-1.414L15.6 12z">
        </path>
      </svg>
    </button>
  );
}

export default ProductSizeButton;