//Get todays date = enddate
var today = new Date();
var enddate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

//Get date from 30 days ago = startdate
var startdate = new Date();
var pastDate = startdate.getDate() - 30;
startdate.setDate(pastDate);
startdate = startdate.getFullYear() + '-' + (startdate.getMonth() + 1) + '-' + startdate.getDate();


console.log("today:" + enddate);
console.log("30 days ago: " + startdate);

var url = 'https://api.pro.coinbase.com/products/BTC-EUR/candles?start=' + startdate + '&end=' + enddate + '&granularity=86400'

console.log(url);
//Get data from API for 30 days (1.3-30.1)
//[time, low, high, open, close, volume]
$.getJSON(url, function(data) {
    console.log("Hela dataset: " + data);
    console.log("Första: " + data[0]);
    //måst kanske städa data, so it makes sense
});