export const getKey = () => {
  return 'xxxxx-xxxx-xyxy-yyyy'.replace(/[xy]/g, (c) => {
    let key = Math.random() * 16 | 0, v = c == 'x' ? key : (key & 3 | 8);
    return key
  })
}

export const yearList = () => {
  let date = new Date().getFullYear()
  let list = []
  for(let i = 0; i < 3; i ++){
    list.push(date + i)
  }

  return list
}

export const monthList = () => {
  let list = []
  for(let i = 1; i <=12; i++) {
    if(i < 10) list.push('0'+ i)
    else list.push(i.toString())
  }
  return list 
}

export const dayList = () => {
  let list = []
  for(let i = 1; i <=31; i++) {
    if(i < 10) list.push('0'+ i)
    else list.push(i.toString())
  }
  return list 
}

export const hourList = () => {
  let list = []
  for(let i = 1; i <=23; i++) {
    if(i < 10) list.push('0'+ i)
    else list.push(i.toString())
  }
  return list 
}

export const minuteList = () => {
  let list = []
  for(let i = 0; i <=55; i+=5) {
    if(i < 10) list.push('0'+ i)
    else list.push(i.toString())
  }
  return list 
}

export const checkStatus = (yy, mm, dd, hh, mi) => {
  let nowDate = new Date()
  let checkDate = new Date(yy, mm-1, dd, hh, mi)
  if(nowDate < checkDate) return true
  return false
}

export const stringToDate = (yy, mm, dd, hh, mi) => {
  return new Date(yy, mm-1, dd, hh, mi)
}

export const getDate = (date, type) => {
  let prototypeDate = new Date(date);

  let dayDate =
      prototypeDate.getDate() < 10
          ? '0' + prototypeDate.getDate()
          : prototypeDate.getDate();

  let yearDate = prototypeDate.getFullYear();

  let monthDate =
      prototypeDate.getMonth() + 1 < 10
          ? '0' + (prototypeDate.getMonth() + 1)
          : prototypeDate.getMonth() + 1;

  let hours =
      prototypeDate.getHours() < 10
          ? '0' + prototypeDate.getHours()
          : prototypeDate.getHours();

  let hours2 = prototypeDate.getHours();

  let minutes =
      prototypeDate.getMinutes() < 10
          ? '0' + prototypeDate.getMinutes()
          : prototypeDate.getMinutes();

  let seconds =
      prototypeDate.getSeconds() < 10
          ? '0' + prototypeDate.getSeconds()
          : prototypeDate.getSeconds();

  let resDate = '';

  switch (type) {
      case 'YY':
          resDate = yearDate;
          break;

      case 'MM':
          resDate = monthDate;
          break;

      case 'DD':
          resDate = dayDate;
          break;

      case 'HH':
          resDate = hours;
          break;
      case 'HH2':
          resDate = hours2;
          break;

      case 'mim':
          resDate = minutes;
          break;

      case 'YYDD':
          resDate = yearDate + '-' + monthDate;
          break;

      case 'YYMMDD':
          resDate = yearDate + '-' + monthDate + '-' + dayDate;
          break;

      case 'YYMMDDHH':
          resDate = yearDate + '-' + monthDate + '-' + dayDate + hours;
          break;

      case 'HHmm':
          resDate = hours + ':' + minutes;
          break;

      case 'YYMMDDHHmm':
          resDate =
              yearDate +
              '-' +
              monthDate +
              '-' +
              dayDate +
              ' ' +
              hours +
              ':' +
              minutes;
          break;

      case 'YYMMDDHHmmSS':
          resDate =
              yearDate +
              '-' +
              monthDate +
              '-' +
              dayDate +
              ' ' +
              hours +
              ':' +
              minutes +
              ':' +
              seconds;
          break;

      default:
          resDate =
              yearDate +
              '-' +
              monthDate +
              '-' +
              dayDate +
              ' ' +
              hours +
              ':' +
              minutes +
              ':' +
              seconds;
          break;
  }

  return resDate;
};