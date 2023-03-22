import React, { useState } from 'react';
import Carousel from './Carousel';
import DeviceTypeChart from './DeviceTypeChart';
import ScreenSizeChart from './ScreenSizeChart';
import { setDateIndex } from '../store/slices/dateIndex';
import { useDispatch, useSelector } from 'react-redux';
const SiteCarousel = ({ data, chartType }) => {
  const dateIndex = useSelector((state) => state.dateIndex.value);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(
      setDateIndex(
        data[0].traffic.findIndex((t) => t.date === event.target.value),
      ),
    );
  };

  const handlePrev = () => {
    setDateIndex((prevIndex) =>
      prevIndex === 0 ? data[0].traffic.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setDateIndex((prevIndex) =>
      prevIndex === data[0].traffic.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const date = data[0].traffic[dateIndex].date;

  return (
    <div>
      <label htmlFor="date">Date:</label>
      <select
        id="date"
        value={date}
        onChange={handleChange}
      >
        {data[0].traffic.map((t) => (
          <option
            key={t.date}
            value={t.date}
          >
            {new Date(t.date).toLocaleDateString()}
          </option>
        ))}
      </select>
      <Carousel
        data={data}
        renderContent={(site) => {
          const trafficData = site.traffic.find((t) => t.date === date);
          if (trafficData) {
            return (
              <>
                <h3>{new Date(date).toLocaleDateString()}</h3>
                {chartType === 'deviceTypes' && (
                  <DeviceTypeChart data={trafficData.deviceTypes} />
                )}
                {chartType === 'screenSizes' && (
                  <ScreenSizeChart data={trafficData.screenSizes} />
                )}
              </>
            );
          }
          return null;
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          className={`button ${dateIndex === 0 ? 'btn-disabled' : ''}`}
          onClick={handlePrev}
          disabled={dateIndex === 0}
        >
          Prev
        </button>
        <button
          className={`button ${
            dateIndex === data[0].traffic.length - 1 ? 'btn-disabled' : ''
          }`}
          onClick={handleNext}
          disabled={dateIndex === data[0].traffic.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SiteCarousel;
