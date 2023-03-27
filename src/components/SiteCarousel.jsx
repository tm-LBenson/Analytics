import React from 'react';
import Carousel from './Carousel';
import DeviceTypeChart from './DeviceTypeChart';
import ScreenSizeChart from './ScreenSizeChart';
import { setDateIndex } from '../store/slices/dateIndex';
import { useDispatch, useSelector } from 'react-redux';
const SiteCarousel = ({ data, chartType }) => {
  const dateIndex = useSelector((state) => state.dateIndex.value);
  const dispatch = useDispatch();
  const uniqueDates = Array.from(new Set(data[0].traffic.map((t) => t.date)));
  const handleChange = (event) => {
    dispatch(
      setDateIndex(
        uniqueDates.findIndex((date) => date === event.target.value),
      ),
    );
  };

  const handlePrev = () => {
    const newIndex =
      dateIndex === 0 ? data[0].traffic.length - 1 : dateIndex - 1;
    dispatch(setDateIndex(newIndex));
  };

  const handleNext = () => {
    const newIndex =
      dateIndex === data[0].traffic.length - 1 ? 0 : dateIndex + 1;
    dispatch(setDateIndex(newIndex));
  };

  const date = uniqueDates[dateIndex];

  return (
    <div>
      <label htmlFor="date">Date:</label>
      <select
        id="date"
        value={date}
        onChange={handleChange}
      >
        {uniqueDates.map((date) => (
          <option
            key={date}
            value={date}
          >
            {new Date(date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              timeZone: 'UTC',
            })}
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
