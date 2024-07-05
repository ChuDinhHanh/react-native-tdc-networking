import moment from 'moment';

export const formatDateTime = (originalDate: string) => {
  const _originalDate = new Date(originalDate);
  const day = _originalDate.getDate();
  const month = _originalDate.getMonth() + 1;
  const year = _originalDate.getFullYear();
  const hour = _originalDate.getHours();
  const minute = _originalDate.getMinutes();
  const formattedTime = `${day}/${month}/${year} ${hour}:${minute}`;
  return formattedTime;
};

export const numberDayPassed = (originalDate: string) => {
  return moment(originalDate).fromNow();
};
