export const handleStyleGradient = (index) => {
  switch (index) {
    case 0:
      return "bg-virtual-gradient-webkit bg-virtual-gradient";
    case 1:
      return "bg-date-gradient-webkit bg-date-gradient";
    case 2:
      return "bg-work-gradient-webkit bg-work-gradient";
    case 3:
      return "bg-read-gradient-webkit bg-read-gradient";
    case 4:
      return "bg-chill-gradient-webkit bg-chill-gradient";
  }
};

export const handleInnerHeightSlides = (height) => {
  if (height > 0 && height < 768) return 1;
  else if (height >= 768 && height < 998) return 2;
  else return 3;
};
export const handleInnerHeightConvenient = (height, len) => {
  if (len < 4) return len;
  if (height > 0 && height < 998) return 4;
  else return 5;
};

export const handleInnerHeightArea = (height) => {
  if (height > 0 && height < 768) return 2;
  else if (height >= 768 && height < 998) return 3;
  else return 4;
};

export const getLocalStorage = (name) => {
  if (!localStorage.getItem(name) || localStorage.getItem(name) === "undefined")
    return null;
  return JSON.parse(localStorage.getItem(name));
};

export const setLocalStorage = (name, value) => {
  return localStorage.setItem(name, JSON.stringify(value));
};

export const removeLocalStorage = (name) => {
  return localStorage.removeItem(name);
};

// export const handleTransformStringToDate = (transformString) => {
//   if (!transformString.length === 0) return false;
//   const start = transformString.split("-")[0];

//   const end = transformString.split("-")[1];
//   const date = new Date();
//   const hoursCurr = date.getHours().toString();
//   const minutesCurr = date.getMinutes().toString();
//   const startHours = start.split(":")[0].trim();
//   const startMinutes = start.split(":")[1].trim();
//   const endHours = end.split(":")[0].trim();
//   const endMinutes = end.split(":")[1].trim();
//   if (
//     hoursCurr < startHours ||
//     (hoursCurr === endHours && minutesCurr > endMinutes) ||
//     hoursCurr > endHours ||
//     (hoursCurr === startHours && minutesCurr < startMinutes)
//   )
//     return false;

//   return true;
// };

export const handleTransformStringToDate = (startTime, endTime) => {
  const currentTime = new Date();
  const currentMilliseconds =
    currentTime.getHours() * 3600000 +
    currentTime.getMinutes() * 60000 +
    currentTime.getSeconds() * 1000;

  // Lấy thời gian bắt đầu và kết thúc từ dữ liệu của bạn (đơn vị thời gian là milliseconds)
  const startTimeMilliseconds = startTime * 1000; // startTime = 28800 seconds = 28800 * 1000 milliseconds
  const endTimeMilliseconds = endTime * 1000; // endTime = 90000 seconds = 90000 * 1000 milliseconds

  // Kiểm tra xem thời điểm hiện tại có nằm trong khoảng mở cửa hay không
  if (
    currentMilliseconds >= startTimeMilliseconds &&
    currentMilliseconds <= endTimeMilliseconds
  ) {
    return true;
  } else {
    return false;
  }
};
export const handleCalculateDateFromNow = (date) => {
  const temp1 = new Date();
  const dayTemp1 = `0${temp1.getDate()}`.slice(-2);
  const monthTemp1 = `0${temp1.getMonth() + 1}`.slice(-2);
  const yearTemp1 = `0${temp1.getFullYear()}`.slice(-4);
  const str = `${monthTemp1}/${dayTemp1}/${yearTemp1}`;

  const temp2 = date;
  const dayTemp2 = `0${temp2.split("/")[0]}`.slice(-2);
  const monthTemp2 = `0${temp2.split("/")[1]}`.slice(-2);
  const yearTemp2 = `0${temp2.split("/")[2]}`.slice(-4);

  const tempDate = `${dayTemp2}/${monthTemp2}/${yearTemp2}`;
  const date1 = new Date(tempDate);
  const date2 = new Date(str);

  const Difference_In_Time = date2.getTime() - date1.getTime();

  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return Difference_In_Days > 0
    ? `từ ${Difference_In_Days} ngày trước`
    : "trong hôm nay";
};

export const handleFixDateToUs = (str) => {
  const dayTemp2 = `0${str.split("/")[0]}`.slice(-2);
  const monthTemp2 = `0${str.split("/")[1]}`.slice(-2);
  const yearTemp2 = `0${str.split("/")[2]}`.slice(-4);
  const temp = `${dayTemp2}/${monthTemp2}/${yearTemp2}`;

  return temp;
};

export const handleCheckIsLocalImage = (url) => {
  if (url?.includes("blob:http://localhost:3000")) {
    return true;
  }
  return false;
};
export function formatToVND(number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
}
export function timeToNumber(timeString) {
  if (!timeString) return;

  const [hours, minutes] = timeString.split(":").map(Number);

  return hours * 3600 + minutes * 60;
}
export function convertToTimeString(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes;
}
