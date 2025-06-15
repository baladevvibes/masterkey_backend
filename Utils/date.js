module.exports.getLeadCurrentDateandTime = () => {
  var currentdate = new Date();
  var datetime =
    "Date : " +
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " Time : " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  return datetime;
};
