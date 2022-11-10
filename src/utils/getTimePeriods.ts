const MINUTE_IN_SECONDS = 60
const HOUR_IN_SECONDS = 3600
const DAY_IN_SECONDS = 86400
const MONTH_IN_SECONDS = 2629800
const YEAR_IN_SECONDS = 31557600

/**
 * Format number of seconds into year, month, day, hour, minute, seconds
 *
 * @param seconds
 */
const getTimePeriods = (seconds: number) => {
  let delta = Math.abs(seconds)
  const timeLeft = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

timeLeft.days =  Math.floor(delta / (3600*24));
delta  -= timeLeft.days*3600*24;
timeLeft.hours=  Math.floor(delta / 3600);
delta  -= timeLeft.hours*3600;
timeLeft.minutes=  Math.floor(delta / 60);
delta  -= timeLeft.minutes*60;
  

  
  timeLeft.seconds = delta

  return timeLeft
}

export default getTimePeriods
