import React from "react";

const SyncSpinner = ({
  color = "#000000",
  size = 15,
  margin = 2,
  speedMultiplier = 1,
}) => {
  const circles = [0, 1, 2];
  const animationDuration = 0.6 / speedMultiplier;

  return (
    <svg
      width={size * 3 + margin * 2}
      height={size}
      viewBox={`0 0 ${size * 3 + margin * 2} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {circles.map((index) => (
        <circle
          key={index}
          cx={size / 2 + index * (size + margin)}
          cy={size / 2}
          r={size / 2}
          fill={color}
        >
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur={`${animationDuration}s`}
            repeatCount="indefinite"
            begin={`${index * 0.2}s`}
          />
        </circle>
      ))}
    </svg>
  );
};

export default SyncSpinner;
