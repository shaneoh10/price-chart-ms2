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
        $.getJSON(`https://api.twelvedata.com/price?symbol=${currencyPair}&apikey=d6cceea44f2c4640ba375bcfb65a4fc8`),
        $.getJSON(`https://api.twelvedata.com/time_series?symbol=${currencyPair}&interval=${interval}&apikey=d6cceea44f2c4640ba375bcfb65a4fc8`)
    ).then(
        function (response1, response2) {
            if (response2[0].status === 'error') {
                console.log(response2[0].code);
                $('#loader-container').html('');
                $('#chart-control').html(
                    `<h4 class="text-center mt-4">Error: ${response2[0].message}</h4>`);
            } else {
                $('#chart-control').html('<canvas id="myChart" width="100%" height="100%"></canvas>');
                $('#loader-container').html('');
                var currencyName = response2[0].meta.symbol;
                var currencyPrice = response1[0].price;
                var currency = response2[0].meta.currency_quote;
                currencyPrice =  currencyPrice.slice(0, -3);
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
                })
            }
        })
}

$(document).ready(getCurrency);