// Code used from Code Institute UCD resume walkthrough project lectures

function sendMail(contactForm) {
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
        });

    return false;    
}

