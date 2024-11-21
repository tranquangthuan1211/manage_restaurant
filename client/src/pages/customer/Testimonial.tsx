// components/Testimonial.tsx
import React from 'react';

interface TestimonialProps {
  name: string;
  stars: number;
  children?: React.ReactNode;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, stars, children }) => {
  return (
    <div className="testimonial">
      <h3>{name}</h3>
      <p>Rating: {stars} stars</p>
      <div>{children}</div> {/* This renders the nested content */}
    </div>
  );
};

export default Testimonial;