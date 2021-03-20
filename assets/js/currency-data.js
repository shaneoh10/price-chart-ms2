function getCurrency(event) {

    var chartPrice = [];
    var chartTime = [];

    $('#currency-name').html('');
    $('#currency-price').html('');

    var interval = $('input[name="interval"]:checked').val();
    var currencyPair = $('#currency-pair').val();

    $('#loader-container').html(
        `<div id="loader">
            <img src="assets/images/loader.gif" alt="loading..."/>>
        </div>`);

    $.when(
        $.getJSON(`https://api.twelvedata.com/quote?symbol=${currencyPair}&apikey=d6cceea44f2c4640ba375bcfb65a4fc8`),
        $.getJSON(`https://api.twelvedata.com/price?symbol=${currencyPair}&apikey=d6cceea44f2c4640ba375bcfb65a4fc8`),
        $.getJSON(`https://api.twelvedata.com/time_series?symbol=${currencyPair}&interval=${interval}&apikey=d6cceea44f2c4640ba375bcfb65a4fc8`)
    ).then(
        function (response, response1, response2) {
            var tableData = response[0];
            function stockTable(response) {
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
            if (response2[0].status === 'error') {
                console.log(response2[0].code);
                $('#loader-container').html('');
                $('#chart-control').html(
                    `<h4 class="text-center mt-4">Error: ${response2[0].message}</h4>`);
                $('#table').html('');
            } else {
                $('#chart-control').html('<canvas id="myChart" width="100%" height="100%"></canvas>');
                $('#loader-container').html('');
                var currencyName = response2[0].meta.symbol;
                var currencyPrice = response1[0].price;
                var currency = response2[0].meta.currency_quote;
                currencyPrice = currencyPrice.slice(0, -3);
                $('#currency-name').html(currencyName);
                $('#currency-price').html(currencyPrice + ' ' + currency);

                var data = response2[0];
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
                stockTable(response);
            }
        })
}

$(document).ready(getCurrency);