//Get todays date = enddate
var today = new Date();
var enddate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

//Get date from 30 days ago = startdate
var startdate = new Date();
var pastDate = startdate.getDate() - 29;
startdate.setDate(pastDate);
startdate = startdate.getFullYear() + '-' + (startdate.getMonth() + 1) + '-' + startdate.getDate();

var curr = "ETH-EUR";

var time = [],
    low = [],
    high = [],
    openn = [],
    closee = [],
    volume = [];

function buttonClick() {
    //Get data from API for 30 days 
    var url = 'https://api.pro.coinbase.com/products/ETH-EUR/candles?start=' + startdate + '&end=' + enddate + '&granularity=86400'
    loadData(url);
}

//körs då man trycker på knappen
function loadData(url) {

    $.getJSON(url, function(data) {
        //skriv ut data i console
        console.log("Hela dataset: ");
        for (var x = 0; x < data.length; x++) {
            //Data format: [time, low, high, open, close, volume]
            console.log(x + " dataset: " + data[x]);
        }

        function buildchart(data) {
            var margin = { top: 20, right: 20, bottom: 50, left: 70 };
            var w = 960 - margin.left - margin.right,
                h = 500 - margin.top - margin.bottom;

            var parse = d3.timeParse("%s");
            var format = d3.timeFormat("%Y-%m-%d"); //format on how to display the date   
            var form = d3.timeFormat("%d-%b");

            data.forEach(function(d) {
                var time = parse(d[0]);
                d.date = form(time); //adding close,open etc to each of the arrays
                d.low = +d[1];
                d.high = +d[2];
                d.open = +d[3];
                d.close = +d[4];
                d.volume = +d[5];

                low.push(d.low); //arrays of all the values
                high.push(d.high);
                openn.push(d.open);
                closee.push(d.close);
                volume.push(d.volume);
            });

            console.log(data);
            console.log(data[0].date);

            //X-Axis : date
            var x = d3.scaleTime().range([0, w]);
            //scale range of data
            x.domain(d3.extent(data, function(d) { return new Date(d.date); }));

            //Y-Axis : currency
            var y = d3.scaleLinear().range([h, 0]);
            y.domain([0, d3.max(data, function(d) { return d.close; })]);

            var y2 = d3.scaleLinear()
                .range([h, 0]);
            y2.domain([0, d3.max(data, function(d) {
                return d.volume;
            })]);

            var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w + margin.left + margin.right)
                .attr("height", h + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            // Add the x Axis
            svg.append("g")
                .attr("transform", "translate(0," + h + ")")
                .call(d3.axisBottom(x));
            // Add the y Axis
            svg.append("g")
                .call(d3.axisLeft(y));

            svg.append("g")
                .call(d3.axisRight(y2));

            svg.selectAll("line.ext") //få sträcket mellan high och low 
                .data(data)
                .enter().append("svg:line")
                .attr("class", "ext")
                .attr("x1", function(d) {
                    return x(new Date(d.date))
                })
                .attr("x2", function(d) {
                    return x(new Date(d.date))
                })
                .attr("y1", function(d) {
                    return y(d.low);
                })
                .attr("y2", function(d) {
                    return y(d.high);
                });

            svg.selectAll("line.ext1")
                .data(data)
                .enter().append("line")
                .attr("class", "ext")
                .attr("x1", function(d) {
                    return x(new Date(d.date)) + 1
                })
                .attr("x2", function(d) {
                    return x(new Date(d.date)) - 1
                })
                .attr("y1", function(d) {
                    return y(d.low);
                })
                .attr("y2", function(d) {
                    return y(d.low);
                });

            svg.selectAll("line.ext2")
                .data(data)
                .enter().append("line")
                .attr("class", "ext")
                .attr("x1", function(d) {
                    return x(new Date(d.date)) + 1
                })
                .attr("x2", function(d) {
                    return x(new Date(d.date)) - 1
                })
                .attr("y1", function(d) {
                    return y(d.high);
                })
                .attr("y2", function(d) {
                    return y(d.high);
                });

            svg.selectAll("rect")
                .data(data)
                .enter().append("rect")
                .attr("x", function(d) {
                    return x(new Date(d.date)) - 3;
                })
                .attr("y", function(d) {
                    return y(Math.max(d.open, d.close));
                })
                .attr("height", function(d) {
                    return y(Math.min(d.open, d.close)) - y(Math.max(d.open, d.close));
                })
                .attr("width", 7)
                .attr("fill", function(d) {
                    return d.open > d.close ? "red" : "lightgreen";
                });
        }

        buildchart(data);

    });
}


//Get url and sent it to loadData()
function changeCurrency(inputCurr) {
    curr = inputCurr;
    console.log(curr);

    var url = 'https://api.pro.coinbase.com/products/' + curr + '/candles?start=' + startdate + '&end=' + enddate + '&granularity=86400';

    loadData(url);
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
    loadData(url);
}