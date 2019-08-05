/* eslint-disable no-shadow */
/* eslint-disable no-undef */

// ------------------------------------------------------ //
// FormToGoogleSheet implementation
// ------------------------------------------------------ //
const scriptURL = 'https://script.google.com/macros/s/AKfycbzo8Wyq9T_UunmxyV0LfwKwxEn4ZE_e8L1mGz3WvFMPgkqXHUg/exec';
const contactForm = document.forms['submit-to-google-sheet'];

function showSuccessMessage(response) {
  console.log('Success!', response);
  $('.form-control').val('');
  $('#submit-btn').val('Succesfully Submitted!');
  setTimeout(() => { $('#submit-btn').val('Send message'); }, 2000);
}

function showErrorMessage(error) {
  console.error('Error!', error.message);
  $('#submit-btn').val('Error! Please try again.');
  setTimeout(() => { $('#submit-btn').val('Send message'); }, 2000);
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(contactForm) })
    .then(response => showSuccessMessage(response))
    .catch(error => showErrorMessage(error));
});

// ------------------------------------------------------ //
// styled Open Street Map
// ------------------------------------------------------ //
function map() {
  const mapId = 'map';
  const mapCenter = [39.765578, -105.039607];
  const mapMarker = true;

  if ($(`#${mapId}`).length > 0) {
    const icon = L.icon({
      iconUrl: 'img/marker.png',
      iconSize: [25, 37.5],
      popupAnchor: [0, -18],
      tooltipAnchor: [0, 19],
    });

    let dragging = false;
    let tap = false;

    if ($(window).width() > 700) {
      dragging = true;
      tap = true;
    }

    const map = L.map(mapId, {
      center: mapCenter,
      zoom: 12,
      dragging,
      tap,
      scrollWheelZoom: false,
    });

    const stamenTonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png',
    });

    stamenTonerLite.addTo(map);

    map.once('focus', () => {
      map.scrollWheelZoom.enable();
    });

    if (mapMarker) {
      const marker = L.marker(mapCenter, {
        icon,
      }).addTo(map);

      marker.bindPopup("<div class='p-4'><h5>Info Window Content</h5><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p></div>", {
        minwidth: 200,
        maxWidth: 600,
        className: 'map-custom-popup',
      });
    }
  }
}

$(() => {
  // ---------------------------------------------- //
  // Navbar
  // ---------------------------------------------- //
  $(document).scroll(() => {
    if ($(window).scrollTop() >= $('header').offset().top) {
      $('nav').addClass('sticky');
    } else {
      $('nav').removeClass('sticky');
    }
  });

  // ---------------------------------------------- //
  // Scroll Spy
  // ---------------------------------------------- //
  $('body').scrollspy({
    target: '.navbar',
    offset: 80,
  });

  // ---------------------------------------------- //
  // Preventing URL update on navigation link click
  // ---------------------------------------------- //
  $('.navbar-nav a, #scroll-down').bind('click', function (e) {
    const anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top,
    }, 1000);
    e.preventDefault();
  });

  // ------------------------------------------------------ //
  // styled OpenStreet Map
  // ------------------------------------------------------ //
  map();
});
