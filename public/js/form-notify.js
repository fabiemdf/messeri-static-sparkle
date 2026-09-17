// Sends every site form to the email notification endpoint.
(function () {
  var ENDPOINT = "/api/public/form-submit";
  var SKIP = ["search-form", "sidebar-search-form"];

  function isSkipped(form) {
    for (var i = 0; i < SKIP.length; i++) {
      if (form.classList.contains(SKIP[i])) return true;
    }
    return form.hasAttribute("data-no-notify");
  }

  function messages(form) {
    var fr = document.documentElement.lang === "fr";
    if (form.classList.contains("newsletter-form")) {
      return {
        sending: fr ? "Envoi..." : "Sending...",
        success: fr
          ? "Merci! Votre inscription est enregistrée."
          : "Thank you! You're subscribed.",
        error: fr
          ? "Échec de l'envoi. Appelez-nous au (305) 494-5820."
          : "Could not send. Please call us at (305) 494-5820.",
      };
    }
    return {
      sending: fr ? "Envoi..." : "Sending...",
      success: fr
        ? "Merci! Votre message a été envoyé. Nous vous répondrons rapidement."
        : "Thank you! Your message has been sent. We'll be in touch shortly.",
      error: fr
        ? "L'envoi a échoué. Appelez-nous au (305) 494-5820."
        : "Something went wrong. Please call us at (305) 494-5820.",
    };
  }

  function statusEl(form) {
    var el = form.querySelector(".form-status");
    if (!el) {
      el = document.createElement("p");
      el.className = "form-status";
      el.setAttribute("role", "status");
      el.style.marginTop = "1rem";
      el.style.fontSize = "1.5rem";
      form.appendChild(el);
    }
    return el;
  }

  function attach(form) {
    if (isSkipped(form) || form.dataset.notifyBound === "1") return;
    form.dataset.notifyBound = "1";

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var copy = messages(form);
      var status = statusEl(form);
      var button = form.querySelector('button[type="submit"], input[type="submit"]');
      var originalLabel = button ? button.textContent : "";

      status.style.color = "#555";
      status.textContent = copy.sending;
      if (button) {
        button.disabled = true;
        button.textContent = copy.sending;
      }

      var data = new FormData(form);
      data.append("__formName", form.id || form.className || "website-form");
      data.append("__pageUrl", window.location.href);

      fetch(ENDPOINT, { method: "POST", body: data })
        .then(function (res) {
          if (!res.ok) throw new Error("request failed");
          status.style.color = "#1a7f37";
          status.textContent = copy.success;
          form.reset();
        })
        .catch(function () {
          status.style.color = "#c02626";
          status.textContent = copy.error;
        })
        .then(function () {
          if (button) {
            button.disabled = false;
            button.textContent = originalLabel;
          }
        });
    });
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll("form"), attach);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
