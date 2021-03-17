function getTesla(event) {

    $('#table').html('<img src="assets/images/loader.gif" alt="loading..."/>>');

    $.when(
        $.getJSON('https://api.twelvedata.com/quote?symbol=TSLA&apikey=d6cceea44f2c4640ba375bcfb65a4fc8')
    ).then(
        function (response) {
            var tableData = response;
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
                        <td>Open: <span id="table-open">${tableData.open.slice(0, -3)}</span></td>
                        <td>Close: <span id="table-close">${tableData.close.slice(0, -3)}</span></td>
                    </tr>
                    <tr>
                        <td>High: <span id="table-high">${tableData.high.slice(0, -3)}</span></td>
                        <td>Low: <span id="table-low">${tableData.low.slice(0, -3)}</span></td>
                    </tr>
                    <tr>
                        <td>Volume: <span id="table-volume">${tableData.volume}</span></td>
                        <td>52 Week High: <span id="fiftytwo-high">${tableData.fifty_two_week.high.slice(0, -3)}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>`);
            }
            if (response.status === 'error') {
                console.log(response.code);
                $('#table').html(
                    `Error: ${response.message}`);
            } else {
                stockTable(response);
            }
        });
}

$(document).ready(getTesla);