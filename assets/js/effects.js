// // Navbar collapse on page click
// // https://mdbootstrap.com/support/general/auto-close-navbar-when-click-on-link-responsive-mode/

$(document).click(function () {
    $('.navbar-collapse').collapse('hide');
});

// Divs appear on scroll down
// https://scrollrevealjs.org/guide/whats-new.html

ScrollReveal().reveal('.chart-box', { duration: 2000, delay: 100 });


