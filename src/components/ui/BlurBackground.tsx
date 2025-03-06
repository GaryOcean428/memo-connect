
import React from "react";

interface BlurBackgroundProps {
  className?: string;
}

export const BlurBackground: React.FC<BlurBackgroundProps> = ({ className }) => {
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 right-1/3 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
    </div>
  );
};
