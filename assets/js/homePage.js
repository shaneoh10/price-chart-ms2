
function getTesla() {

    $('#date').html('<img src="assets/images/loader.gif" alt="loading..."/>>');
    $('#open').html('');
    $('#close').html('');
    $('#high').html('');
    $('#low').html('');

    // $('#table').html(
    //     `<div id="loader">
    //         <img src="assets/images/loader.gif" alt="loading..."/>>
    //     </div>`);

    $.when(
        $.getJSON('https://api.twelvedata.com/quote?symbol=TSLA&apikey=d6cceea44f2c4640ba375bcfb65a4fc8')
    ).then(
        function (response) {
            var date = response.datetime;
            var open = response.open;
            var close = response.close;
            var high = response.high;
            var low = response.low;
            var currency = response.currency;

            open = open.slice(0, -3) + ' ' + currency;
            close = close.slice(0, -3) + ' ' + currency;
            high = high.slice(0, -3) + ' ' + currency;
            low = low.slice(0, -3) + ' ' + currency;

            $('#date').html(date);
            $('#open').html(open);
            $('#close').html(close);
            $('#high').html(high);
            $('#low').html(low);

        }, function (errorResponse) {
            console.log(errorResponse);
            if (errorResponse.status === 404) {
                $('#date').html(`<h2>No info found for ${stockSymbol}</h2>`);
            }
            else {
                console.log(errorResponse);
                $('#date').html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}

$(document).ready(getTesla);