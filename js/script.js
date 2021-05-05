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
            var maxVal = -1000;
            var minVal = 1000;

            var time = parse(d[0]);
            d.date = form(time);   //adding close,open etc to each of the arrays
                d.low = +d[1];
                d.high = +d[2];
                d.open = +d[3];
                d.close = +d[4];
                d.volume = +d[5];

                if (d.high > maxVal) //största och minsta värdet 
                    maxVal = d.high;
                if (d.low < minVal)
                    minVal = d.low;
            
                low.push(d.low);  //arrays of all the values
                high.push(d.high);
                openn.push(d.open);
                closee.push(d.close);
                volume.push(d.volume);
                
            });
            console.log(data);

            svg.selectAll("line.ext")
            .data(data)
            .enter().append("line")
            .attr("class", "ext")
            .attr("x1", function(d) { return x(d.date)})
            .attr("x2", function(d) { return x(d.date)})
            .attr("y1", function(d) { return y(d.low);})
            .attr("y2", function(d) { return y(d.high); });
        
          svg.selectAll("line.close")
            .data(data)
            .enter().append("line")
            .attr("class", "close")
            .attr("x1", function(d) { return x(d.date)+5})
            .attr("x2", function(d) { return x(d.date)-1})
            .attr("y1", function(d) { return y(d.close);})
            .attr("y2", function(d) { return y(d.close); });
        
          svg.selectAll("line.open")
            .data(data)
            .enter().append("line")
            .attr("class", "open")
            .attr("x1", function(d) { return x(d.date)+1})
            .attr("x2", function(d) { return x(d.date)-5})
            .attr("y1", function(d) { return y(d.open);})
            .attr("y2", function(d) { return y(d.open); });

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
