(function () {
  "use strict";

  var CAMPAIGN_ID = "psl_property_damage_2026";
  var params = new URLSearchParams(window.location.search);
  var form = document.getElementById("pslLeadForm");
  var status = document.getElementById("formStatus");
  var submitButton = document.getElementById("submitButton");
  var formStarted = false;

  window.dataLayer = window.dataLayer || [];

  function attribution() {
    return {
      campaign_id: CAMPAIGN_ID,
      campaign_source: params.get("utm_source") || "direct_mail",
      campaign_medium: params.get("utm_medium") || "postcard",
      campaign_name: params.get("utm_campaign") || CAMPAIGN_ID,
      campaign_content: params.get("utm_content") || "landing_page",
    };
  }

  function track(eventName, details) {
    window.dataLayer.push(
      Object.assign(
        {
          event: eventName,
          page_type: "campaign_landing_page",
        },
        attribution(),
        details || {},
      ),
    );
  }

  function setHiddenAttribution() {
    var values = {
      utmSource: params.get("utm_source") || "direct_mail",
      utmMedium: params.get("utm_medium") || "postcard",
      utmCampaign: params.get("utm_campaign") || CAMPAIGN_ID,
      utmContent: params.get("utm_content") || "landing_page",
      landingPage: window.location.pathname,
    };

    Object.keys(values).forEach(function (name) {
      var input = form && form.elements.namedItem(name);
      if (input) input.value = values[name];
    });
  }

  track("campaign_landing_view");

  document.querySelectorAll('[data-track="phone"]').forEach(function (link) {
    link.addEventListener("click", function () {
      track("campaign_phone_click", { link_location: link.dataset.location || "unknown" });
    });
  });

  document.querySelectorAll('[data-track="form-cta"]').forEach(function (link) {
    link.addEventListener("click", function () {
      track("campaign_form_cta_click", { link_location: link.dataset.location || "unknown" });
    });
  });

  if (!form || !status || !submitButton) return;

  setHiddenAttribution();

  form.addEventListener("focusin", function () {
    if (!formStarted) {
      formStarted = true;
      track("campaign_form_start");
    }
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    status.className = "form-status";
    status.textContent = "";
    track("campaign_form_submit_attempt");

    var values = Object.fromEntries(new FormData(form).entries());
    values.contactConsent = form.elements.contactConsent.checked;

    try {
      var response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      var result = await response.json().catch(function () {
        return {};
      });

      if (!response.ok || !result.ok) {
        throw new Error(
          result.message || "We could not send your request. Please call (305) 494-5820.",
        );
      }

      track("campaign_form_submit", { lead_status: "delivered" });
      status.className = "form-status success";
      status.textContent = "Thank you. Your request was sent, and our team will follow up shortly.";
      form.reset();
      setHiddenAttribution();
      submitButton.textContent = "Request My Free Claim Review";
    } catch (error) {
      track("campaign_form_error", { error_type: "delivery" });
      status.className = "form-status error";
      status.textContent = error instanceof Error ? error.message : "Please call (305) 494-5820.";
      submitButton.textContent = "Try Again";
    } finally {
      submitButton.disabled = false;
    }
  });
})();
