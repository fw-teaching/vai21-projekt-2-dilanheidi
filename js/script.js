//Get todays date = enddate
var today = new Date();
var enddate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

//Get date from 30 days ago = startdate
var startdate = new Date();
var pastDate = startdate.getDate() - 29;
startdate.setDate(pastDate);
startdate = startdate.getFullYear() + '-' + (startdate.getMonth() + 1) + '-' + startdate.getDate();

var curr = 0;

var time = [],
low = [],
high = [],
openn = [],
closee = [],
volume = [];


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

        console.log(data);
        var parse = d3.timeParse("%s");
        var format = d3.timeFormat("%Y-%m-%d");  //format on how to display the date 

    function buildchart(data) {

        data.forEach(function (d) {  //adding close,open etc to the data array 
            var time = parse(d[0]);
            d.date = format(time); 
                d.low = +d[1];
                d.high = +d[2];
                d.open = +d[3];
                d.close = +d[4];
                d.volume = +d[5];
            
                low.push(d.low);
                high.push(d.high);
                openn.push(d.open);
                closee.push(d.close);
                volume.push(d.volume);
            });
   console.log(low);

/** T H E      C H A R T  */
        var width = 400,
            height = 250;
             
        var chart = d3.select("#chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "white");
        

}

buildchart(data);

    });
}



function changeCurrency(inputCurr) {
    curr = inputCurr;
    console.log(curr);

    var url = 'https://api.pro.coinbase.com/products/' + curr + '/candles?start=' + startdate + '&end=' + enddate + '&granularity=86400';

    //Get data
    $.getJSON(url, function(data) {
        console.log(data);
        //createChart(data);2
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

    //Get data
    $.getJSON(url, function(data) {
        console.log(data);
        //createChart(data);
    });
}