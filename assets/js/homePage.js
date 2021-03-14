function getTesla(event) {

    $('#date').html('<img src="assets/images/loader.gif" alt="loading..."/>>');
    $('#open').html('');
    $('#close').html('');
    $('#high').html('');
    $('#low').html('');

    $.when(
        $.getJSON('https://api.twelvedata.com/quote?symbol=TSLA &apikey=d6cceea44f2c4640ba375bcfb65a4fc8')
    ).then(
        function(response) {

            if (response.status === 'error') {
                console.log(response.code);
                $('#table').html(
                    `Error: ${response.message}`)
            } else {


                console.log(response);
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
            }


        })
}

$(document).ready(getTesla);