import React from 'react';
import PropTypes from 'prop-types';

const FormattedDateIST = ({ isoDateString }) => {
  if (!isoDateString) return <span>Date not available</span>;

  const formatDateToIST = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';

    // Convert to IST (UTC+5:30)
    const ISTOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    const istDate = new Date(date.getTime() + ISTOffset);

    // Format day (e.g., "Sunday")
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[istDate.getUTCDay()]; // Use UTC methods for IST

    // Format date (e.g., "22 October 2025")
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const day = istDate.getUTCDate();
    const month = months[istDate.getUTCMonth()];
    const year = istDate.getUTCFullYear();

    // Format time (e.g., "11:00 AM")
    let hours = istDate.getUTCHours();
    const minutes = istDate.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format

    return `${dayName}, ${day} ${month} ${year}, ${hours}:${minutes} ${ampm} IST`;
  };

  return <span>{formatDateToIST(isoDateString)}</span>;
};

FormattedDateIST.propTypes = {
  isoDateString: PropTypes.string,
};

export default FormattedDateIST;