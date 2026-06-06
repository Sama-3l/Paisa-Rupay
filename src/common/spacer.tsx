import React from 'react';

type SpacerProps = {
  axis?: 'horizontal' | 'vertical';
};

export const Spacer = ({ axis }: SpacerProps) => {
  // If vertical, width is 1px and height matches size. 
  // If horizontal, height is 1px and width matches size.
  const className = axis === 'vertical' ? 'h-[100%] w-auto' : "w-[100%] h-auto";

  return (
    <span
      className={className}
    />
  );
};