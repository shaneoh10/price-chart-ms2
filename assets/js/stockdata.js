function getStocks(event) {

    var chartPrice = [];
    var chartTime = [];

    $('#stockName').html('');
    $('#stockPrice').html('');

    var interval = $('input[name="interval"]:checked').val();

    var stockSymbol = $('#stock-symbol').val();
    if (!stockSymbol) {
        $('#stockName').html(`<h3 class="text-center mt-2">Please enter a stock symbol!</h3>`);
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
        function(response1, response2, response3) {

            if (response3[0].status === 'error') {
                $('#loader-container').html('');
                $('#chart-control').html(
                    `<h4 class="text-center mt-4">Error: ${response3[0].message}</h4>`);
            } else {
                $('#chart-control').html('<canvas id="myChart" width="100%" height="100%"></canvas>');
                $('#loader-container').html('');
                var stockName = response1[0].name;
                var stockPrice = response2[0].price;
                var currency = response1[0].currency;
                stockPrice = stockPrice.slice(0, -3);

                $('#stockName').html(stockName);
                $('#stockPrice').html(stockPrice + ' ' + currency);

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

                function stockTable(response1) {
                    var tableData = response1[0];
                    var tableName = tableData.name;
                    var tableSymbol = tableData.symbol;
                    var tableDate = tableData.datetime;
                    var tableExchange = tableData.exchange;
                    var tableOpen = tableData.open.slice(0, -3);
                    var tableClose = tableData.close.slice(0, -3);
                    var tableHigh = tableData.high.slice(0, -3);
                    var tableLow = tableData.low.slice(0, -3);
                    var tableVolume = tableData.volume;
                    var fiftyTwoHigh = tableData.fifty_two_week.high.slice(0, -3);

                    $('#table').html(`<div class="container" id="table">
            <table class="table table-dark">
                <tbody class="text-light">
                    <tr>
                        <td class="remove-border" id="table-name">${tableName}</td>
                        <td class="remove-border" id="table-symbol">${tableSymbol}</td>
                    </tr>
                    <tr>
                        <td id="table-date">${tableDate}</td>
                        <td id="table-exchange">${tableExchange}</td>
                    </tr>
                    <tr>
                        <td>Open: <span id="table-open">${tableOpen}</span></td>
                        <td>Close: <span id="table-close">${tableClose}</span></td>
                    </tr>
                    <tr>
                        <td>High: <span id="table-high">${tableHigh}</span></td>
                        <td>Low: <span id="table-low">${tableLow}</span></td>
                    </tr>
                    <tr>
                        <td>Volume: <span id="table-volume">${tableVolume}</span></td>
                        <td>52 Week High: <span id="fiftytwo-high">${fiftyTwoHigh}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>`)
                }

                stockTable(response1);
            }
        });
}