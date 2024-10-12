import React from 'react';
export default function Video(): React.ReactNode {
    return (
      <video width="30" height="30" controls>
        <source src="/videos/logo_vid.mp4" type="video/mp4" />
      </video>
    );
  }