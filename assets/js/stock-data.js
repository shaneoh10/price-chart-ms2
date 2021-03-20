function getStocks(event) {

    var chartPrice = [];
    var chartTime = [];

    $('#stock-name').html('');
    $('#stock-price').html('');

    var interval = $('input[name="interval"]:checked').val();

    var stockSymbol = $('#stock-symbol').val();
    if (!stockSymbol) {
        $('#stock-name').html(`<h3 class="text-center mt-5">Please enter a stock symbol!</h3>`);
        $('#table').html('');
        $('#chart-control').html('');
        return;
    }

    $('#loader-container').html(
        `<div id="loader">
            <img src="assets/images/loader.gif" alt="loading..."/>>
        </div>`);

    $.when(
        $.getJSON(`https://api.twelvedata.com/quote?symbol=${stockSymbol}&apikey=d6cceea44f2c4640ba375bcfb65a4fc8`),
        $.getJSON(`https://api.twelvedata.com/price?symbol=${stockSymbol}&apikey=d6cceea44f2c4640ba375bcfb65a4fc8`),
        $.getJSON(`https://api.twelvedata.com/time_series?symbol=${stockSymbol}&interval=${interval}&apikey=d6cceea44f2c4640ba375bcfb65a4fc8`)
    ).then(
        function (response1, response2, response3) {
            var tableData = response1[0];

            function stockTable(response1) {
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
                        <td>Open: <span id="table-open">${tableData.open.slice(0, -3)}</span></td>
                        <td>Close: <span id="table-close">${tableData.close.slice(0, -3)}</span></td>
                    </tr>
                    <tr>
                        <td>High: <span id="table-high">${tableData.high.slice(0, -3)}</span></td>
                        <td>Low: <span id="table-low">${tableData.low.slice(0, -3)}</span></td>
                    </tr>
                    <tr>
                        <td>Previous close: <span id="table-high">${tableData.previous_close.slice(0, -3)}</span></td>
                        <td>Change: <span id="table-low">${tableData.percent_change.slice(0, -1)}%</span></td>
                    </tr>
                    <tr>
                        <td>Volume: <span id="table-volume">${tableData.volume}</span></td>
                        <td>52 Week High: <span id="fiftytwo-high">${tableData.fifty_two_week.high.slice(0, -3)}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>`);
            }
            if (response3[0].status === 'error') {
                $('#loader-container').html('');
                $('#chart-control').html(
                    `<h4 class="text-center mt-4">Error: ${response3[0].message}</h4>`);
                $('#table').html('');
            } else {
                $('#chart-control').html('<canvas id="myChart" width="100%" height="100%"></canvas>');
                $('#loader-container').html('');
                var stockName = response1[0].name;
                var stockPrice = response2[0].price;
                var currency = response1[0].currency;
                stockPrice = stockPrice.slice(0, -3);

                $('#stock-name').html(stockName);
                $('#stock-price').html(stockPrice + ' ' + currency);

                var data = response3[0];
                for (i = 0; i < data.values.length; i++) {
                    chartPrice.push(data.values[i].open);
                    chartTime.push(data.values[i].datetime);
                }
                chartPrice.reverse();
                chartTime.reverse();

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

$(document).ready(getStocks);