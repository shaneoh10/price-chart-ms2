/*jshint esversion: 6 */ 
// Code used from Code Institute UCD resume walkthrough project lectures

function sendMail(contactForm) {
    document.getElementById('form').innerHTML = `<div id="loader" class="text-center">
            <img src="assets/images/loader.gif" alt="loading..."/>>
        </div>`;
    emailjs.send('gmail', 'PriceChart', {
            'from_name': contactForm.name.value,
            'from_email': contactForm.emailaddress.value,
            'message': contactForm.message.value
        })
        .then(

            function(response) {
                console.log('SUCCESS', response);
                document.getElementById('form').innerHTML = `<h2 class="text-center">Thanks for your message!</h2>`;
            },
            function(error) {
                console.log('FAILED', error);
                document.getElementById('form').innerHTML = `<h2 class="text-center">Error sending message, please try again.</h2>`;
            });

    return false;
}