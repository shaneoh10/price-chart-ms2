/*jshint esversion: 6 */
function getCurrency() {

    var chartPrice = [];
    var chartTime = [];

    $('#currency-name').html('');
    $('#currency-price').html('');

    var interval = $('input[name="interval"]:checked').val();
    var currencyPair = $('#currency-pair').val();

    // display loader gif 
    $('#loader-container').html(
        `<div id="loader">
            <img src="assets/images/loader.gif" alt="loading..."/>>
        </div>`);

    $.when(
        $.getJSON(`https://api.twelvedata.com/quote?symbol=${currencyPair}&apikey=d6cceea44f2c4640ba375bcfb65a4fc8`),
        $.getJSON(`https://api.twelvedata.com/price?symbol=${currencyPair}&apikey=d6cceea44f2c4640ba375bcfb65a4fc8`),
        $.getJSON(`https://api.twelvedata.com/time_series?symbol=${currencyPair}&interval=${interval}&apikey=d6cceea44f2c4640ba375bcfb65a4fc8`)
    ).then(
        function(response1, response2, response3) {
            var tableData = response1[0];

            // generate html for data table
            // Bootstrap table from https://getbootstrap.com/docs/4.0/content/tables/
            function stockTable() {
                $('#table').html(`<div class="container" id="table">
            <table class="table table-dark">
                <tbody class="text-light">
                    <tr>
                        <td class="remove-border" id="table-name">${tableData.name}</td>
                        <td class="remove-border" id="table-symbol">${tableData.symbol}</td>
                    </tr>
                    <tr>
                        <td id="table-date">${tableData.datetime}</td>
                        <td id="table-exchange">${tableData.exchange}</td>
                    </tr>
                    <tr>
                        <td>Open: <span id="table-open">${tableData.open.slice(0, -1)}</span></td>
                        <td>Close: <span id="table-close">${tableData.close.slice(0, -1)}</span></td>
                    </tr>
                    <tr>
                        <td>High: <span id="table-high">${tableData.high.slice(0, -1)}</span></td>
                        <td>Low: <span id="table-low">${tableData.low.slice(0, -1)}</span></td>
                    </tr>
                    <tr>
                        <td>Previous close: <span id="table-high">${tableData.previous_close.slice(0, -1)}</span></td>
                        <td>Change: <span id="table-low">${tableData.percent_change.slice(0, -1)}%</span></td>
                    </tr>
                </tbody>
            </table>
        </div>`);
            }
            // error handling
            if (response3[0].status === 'error') {
                $('#loader-container').html('');
                $('#chart-control').html(
                    `<h4 class="text-center mt-4">Error: ${response3[0].message}</h4>`);
                $('#table').html('');
            } else {
                $('#chart-control').html('<canvas id="myChart" width="100%" height="100%"></canvas>');
                $('#loader-container').html('');

                // parse JSON data and display on screen
                var currencyName = response3[0].meta.symbol;
                var currencyPrice = response2[0].price;
                var currency = response3[0].meta.currency_quote;
                currencyPrice = currencyPrice.slice(0, -3);
                $('#currency-name').html(currencyName);
                $('#currency-price').html(currencyPrice + ' ' + currency);

                // parse JSON data for chart data and labels
                var data = response3[0];
                for (i = 0; i < data.values.length; i++) {
                    chartPrice.push(data.values[i].open);
                    chartTime.push(data.values[i].datetime);
                }
                chartPrice.reverse();
                chartTime.reverse();

                // Code from https://www.chartjs.org/docs/latest/ to generate chart
                var ctx = document.getElementById('myChart').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: chartTime,
                        datasets: [{
                            label: 'Price ' + currency,
                            data: chartPrice,
                            backgroundColor: [
                                'rgba(0, 146, 255, 0.2)',
                            ],
                            borderColor: [
                                'rgba(0, 146, 255, 1)',
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: false
                                }
                            }]
                        }
                    }
                });
                stockTable(response1);
            }
        });
}

$(document).ready(getCurrency);