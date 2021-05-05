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

    function buildchart(data) { 
        var margin = {top: 70, right: 20, bottom: 30, left: 40}; 
        var w = 500,
            h = 400;

        var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .style("background", "white");
            

        var parse = d3.timeParse("%s");
        var format = d3.timeFormat("%Y-%m-%d");  //format on how to display the date   
        var form =  d3.timeFormat("%d-%b");

        data.forEach(function (d) { 
            var time = parse(d[0]);
            d.date = form(time);   //adding close,open etc to each of the arrays
                d.low = +d[1];
                d.high = +d[2];
                d.open = +d[3];
                d.close = +d[4];
                d.volume = +d[5];
            
                low.push(d.low);  //arrays of all the values
                high.push(d.high);
                openn.push(d.open);
                closee.push(d.close);
                volume.push(d.volume);

            svg.selectAll("rect")
                .data(data)
                .enter().append("rect")
                .attr("y", function(d) {
                    return d3.max([d.open, d.close]);
                })
                .attr("height", function(d) { 
                    return Math.abs(d.open - d.close);  //absolutavärdet 
                })
                .classed("rise", function(d) { 
                        return (d.close>d.open); 
                })
                .classed("fall", function(d) { 
                    return (d.open>d.close); 
                });

            });
            console.log(data);

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
