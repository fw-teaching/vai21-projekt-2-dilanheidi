console.log('load');

//Get data from API for 30 days (1.3-30.1)
//[time, low, high, open, close, volume]
$.getJSON('https://api.pro.coinbase.com/products/BTC-EUR/candles?start=2021-03-01&end=2021-03-30&granularity=86400', function(data) {
    console.log("Hela dataset: " + data);
    console.log("Första: " + data[0]);
    //måst kanske städa data, so it makes sense
});