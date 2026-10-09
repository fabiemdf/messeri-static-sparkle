(function () {
  var form = document.getElementById('pensacolaStormClaimReview');
  if (!form) return;
  var query = new URLSearchParams(window.location.search);
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(function (name) {
    var input = form.elements.namedItem(name);
    if (input) input.value = (query.get(name) || '').slice(0, 250);
  });
  function track(event, details) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: event, campaign: 'pensacola_storm_2026' }, details || {}));
  }
  track('campaign_landing_view');
  document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
    link.addEventListener('click', function () { track('campaign_phone_click'); });
  });
  document.querySelectorAll('a[href="#claim-review"]').forEach(function (link) {
    link.addEventListener('click', function () { track('campaign_form_cta_click'); });
  });
  form.addEventListener('input', function () { track('campaign_form_start'); }, { once: true });
  form.addEventListener('submit', function () {
    if (form.checkValidity()) track('campaign_form_submit_attempt');
  });
})();