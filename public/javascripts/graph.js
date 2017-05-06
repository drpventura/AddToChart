// load the Google Charts API
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(setUpGraph);

// the years for the data
const years = [1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000];

// the chart object itself
let chart;

// the data table
let data;

/**
 * Sets up the graph.
 */
function setUpGraph() {
    chart = new google.visualization.LineChart(document.getElementById('graph'));
    data = new google.visualization.DataTable();
    data.addColumn('number', 'Year');
    data.addRows(years.length);
    years.forEach(function (value, index) {
        data.setCell(index, 0, value);
    });
}

/**
 * Draws the graph if there is at least one line's worth of data.
 */
function drawGraph() {
    // the chart options
    const options = {
        title: 'Example Line Graph',
        curveType: 'function',
        legend: {position: 'bottom'},
        hAxis: {
            ticks: years,
            format: ''
        },
        vAxis: {
            minValue: 1,
            maxValue: 1001,
            format: ''
        }
    };

    if (data.getNumberOfColumns() > 1) {
        chart.draw(data, options);
    }
}

/**
 * Adds data from the NamePop object
 * That you will need to write the code to
 * get (using AJAX) from the server.
 * @param namePop a Javascript object with keys for the name and each of the years
 */
function addLine(namePop) {
    data.addColumn('number', namePop['Name']);
    let colNum = data.getNumberOfColumns() - 1;
    years.map(String).forEach((year, index) =>{
       data.setCell(index, colNum, namePop[year]);
    });
    drawGraph();
}

// when the document is loaded
$(document).ready(() => {
    // attach a listener to the button
    // in your case you will be adding a change listener to the text box
    $('#but').on('click', (evt)=> {
        addLine(randNamePop());
        drawGraph();
    });
});

//-----------------------------------------------------------------------------
// the helper functions below are not needed for your exam
// they are simply here to generate dummy data to show
// addLine working
//-----------------------------------------------------------------------------
/**
 * Returns a NamePop object with random name and data.
 * @returns a NamePop object with random name and data.
 */
function randNamePop() {
    const names =
        [ 'Noah', 'Emma', 'Liam', 'Olivia', 'Mason',
          'Sophia', 'Jacob', 'Ava', 'William', 'Isabella'];
    let result = { Name: names[getRandInRange(0, names.length)] };
    years.map(String).forEach((year)=>{
       result[year] = getRandInRange(1, 1002);
    });
    console.log(result);
    return result;
}

/**
 * Returns a random number between the specified values.
 * The returned value is no lower than (and may possibly equal)
 * min, and is less than (but not equal to) max.
 *
 * Code taken from
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_number_between_two_values,
 * last access May 5, 2017
 *
 * @param min the min value (inclusive) of the range
 * @param max the max value (exclusive) of the range
 */
function getRandInRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}