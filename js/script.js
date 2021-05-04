//Get todays date = enddate
var today = new Date();
var enddate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

//Get date from 30 days ago = startdate
var startdate = new Date();
var pastDate = startdate.getDate() - 29;
startdate.setDate(pastDate);
startdate = startdate.getFullYear() + '-' + (startdate.getMonth() + 1) + '-' + startdate.getDate();

var curr = 0;

//körs då man trycker på knappen
function loadData() {
    //Get data from API for 30 days 
    var url = 'https://api.pro.coinbase.com/products/BTC-EUR/candles?start=' + startdate + '&end=' + enddate + '&granularity=86400'

    $.getJSON(url, function(data) {
        //skriv ut data i console
        console.log("Hela dataset: ");
        for (var x = 0; x < data.length; x++) {
            //Data format: [time, low, high, open, close, volume]
            console.log(x + " dataset: " + data[x]);
        }

        //COULD DO?: split the data, put into separate arrays in an array
        var splitdata = data.split(','); //funkar ej
        console.log(splitdata);

        var time = [],
            low = [],
            high = [],
            open = [],
            close = [],
            volume = [];

        /*for (i = 0; i < splitdata.length; i = +6) {
            time = time.push(splitdata[i]);
            low = low.push(d + 1);
            high = high.push(d + 2);
            open = open.push(d + 3);
            close = close.push(d + 4);
            volume = volume.push(d + 5);
        }*/
        //TO DO: convert time with Date()
        //createChart(data);
    });
}

//skapa candelstick chart
function createChart(data) {

    var width = 400,
        height = 250;

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "white");
}

function changeCurrency(inputCurr) {
    curr = inputCurr;
    console.log(curr);

    var url = 'https://api.pro.coinbase.com/products/' + curr + '/candles?start=' + startdate + '&end=' + enddate + '&granularity=86400';

    $.getJSON(url, function(data) {
        console.log(data);
    });
}

function changeDays(inputDays) {
    var days = inputDays;
    console.log(days);
    //set the start date according to input
    var start = new Date();
    var end = start.getDate() - days;
    start.setDate(end);
    start = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate();
    console.log(start + " " + curr);
    var url = 'https://api.pro.coinbase.com/products/' + curr + '/candles?start=' + start + '&end=' + enddate + '&granularity=86400';
    $.getJSON(url, function(data) {
        console.log(data);
    });
}