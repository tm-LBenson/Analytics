import React from 'react';

const Carousel = ({ data, renderContent }) => {
  return (
    <div>
      {data.map((site) => (
        <div key={site._id}>{renderContent(site)}</div>
      ))}
    </div>
  );
};

export default Carousel;
