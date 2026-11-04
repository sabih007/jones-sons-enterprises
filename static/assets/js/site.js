/* ==========================================================================
   Jones & Sons Enterprises — site behaviour
   Vanilla JS + GSAP/ScrollTrigger. No build step, no framework.

   Sections opt into motion with data attributes, so the markup stays plain:

     data-fx="group"   children arrive one after another. Animates every
                       [data-fx-item] inside, or the direct children if none.
     data-fx="rise"    a single element fades and lifts into place.
     data-fx="mask"    a clip-path wipe, for figures and pull quotes.
     data-fx="words"   plain-text headline revealed word by word behind a mask.
     data-fx="rule"    a hairline rule draws itself out from the left.
     data-fx="drift"   scrub-linked parallax; data-fx-amount sets travel in %.

   Everything motion-related lives inside gsap.matchMedia, so anyone asking for
   reduced motion gets the finished layout with no motion and nothing hidden.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     Contact form delivery
     ------------------------------------------------------------------------
     There is no server in a static deploy, so the form posts to whatever
     endpoint you configure here. Leave `endpoint` empty and the form falls
     back to composing an email in the visitor's own mail app, which always
     works but is less convenient.

     Any service that accepts a plain POST works — Formspree, Web3Forms,
     Basin, Netlify Forms, a Google Apps Script, your own mail worker.
     Example:  endpoint: "https://formspree.io/f/abcdwxyz"
     ------------------------------------------------------------------------ */
  var CONTACT = {
    endpoint: "",
    email: "hello@jonesandsonsenterprises.com"
  };

  var html = document.documentElement;
  html.classList.remove("no-js");

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = typeof window.gsap !== "undefined";

  if (hasGsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* Without GSAP (blocked CDN, old browser) nothing may stay hidden. */
  if (!hasGsap) {
    [].forEach.call(document.querySelectorAll(".hero__ready"), function (el) {
      el.style.visibility = "visible";
    });
  }

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return [].slice.call((root || document).querySelectorAll(sel)); };

  /* ========================================================================
     1. Header: scroll state, hide-on-scroll-down, mobile menu
     ======================================================================== */
  (function header() {
    var header = $(".site-header");
    if (!header) return;

    var toggle = $(".menu-toggle", header);
    var panel = $(".mobile-menu", header);
    var lastY = 0;
    var open = false;

    function onScroll() {
      var y = window.scrollY;
      header.classList.toggle("is-solid", y > 48 && !open);
      if (!open) {
        if (y > 480 && y > lastY + 4) header.classList.add("is-hidden");
        if (y < lastY - 4) header.classList.remove("is-hidden");
      }
      lastY = y;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!toggle || !panel) return;

    var links = $$(".mobile-menu__link", panel);
    var tl = null;

    if (hasGsap && !prefersReduced) {
      tl = gsap.timeline({ paused: true })
        .set(panel, { visibility: "visible" })
        .fromTo(panel,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "power3.inOut" })
        .from(links, { autoAlpha: 0, y: 24, duration: 0.5, stagger: 0.05, ease: "power3.out" }, 0.15);
    }

    function setOpen(next) {
      open = next;
      toggle.setAttribute("aria-expanded", String(next));
      toggle.setAttribute("aria-label", next ? "Close menu" : "Open menu");
      header.classList.toggle("is-open", next);
      if (next) header.classList.remove("is-hidden", "is-solid");

      document.body.style.overflow = next ? "hidden" : "";

      if (tl) {
        if (next) tl.play();
        else tl.reverse().eventCallback("onReverseComplete", function () {
          gsap.set(panel, { visibility: "hidden" });
        });
      } else {
        panel.classList.toggle("is-open", next);
      }

      if (!next) onScroll();
    }

    toggle.addEventListener("click", function () { setOpen(!open); });

    $$("a", panel).forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.focus();
      }
    });
  })();

  /* ========================================================================
     2. Hero: intro timeline, scroll parallax, pointer parallax
     ======================================================================== */
  (function hero() {
    var root = $(".hero");
    if (!root || !hasGsap) return;

    var mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", function () {
      var tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.set(".hero__ready", { autoAlpha: 1 })
        .from(".hero__light", { autoAlpha: 0, xPercent: 35, duration: 2.6, ease: "power2.out" }, 0)
        .from(".hero__glow", { autoAlpha: 0, scale: 0.55, duration: 2.4, ease: "power2.out" }, 0.15)
        .from(".hero__amp", { clipPath: "inset(100% 0 0 0)", duration: 1.8, ease: "expo.inOut" }, 0)
        .from(".hero__line > span", { yPercent: 110, duration: 1.3, stagger: 0.09 }, 0.7)
        .from("[data-horizon]", { strokeDashoffset: 2400, duration: 2.4, ease: "power2.inOut" }, 0.4)
        .from("[data-fade]", { autoAlpha: 0, y: 16, duration: 1, stagger: 0.08 }, 0.9);

      // The scroll cue keeps travelling until the hero leaves.
      var dot = gsap.fromTo(".hero__scroll-dot",
        { yPercent: -110 },
        { yPercent: 250, duration: 1.7, ease: "power1.inOut", repeat: -1, repeatDelay: 0.35, delay: 2 });

      var amp = gsap.to(".hero__amp-wrap", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true }
      });
      var light = gsap.to(".hero__light", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true }
      });
      var copy = gsap.fromTo(".hero__copy",
        { yPercent: 0, opacity: 1 },
        {
          yPercent: -12,
          opacity: 0.25,
          ease: "none",
          immediateRender: false,
          scrollTrigger: { trigger: root, start: "30% top", end: "bottom top", scrub: true }
        });

      return function () {
        [tl, dot, amp, light, copy].forEach(function (t) { t.kill(); });
      };
    });

    // Pointer parallax, on devices that actually have a pointer. x/y here are
    // independent of the yPercent the scroll tweens above own.
    mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", function () {
      var lightX = gsap.quickTo(".hero__light", "x", { duration: 1.1, ease: "power3" });
      var lightY = gsap.quickTo(".hero__light", "y", { duration: 1.1, ease: "power3" });
      var ampX = gsap.quickTo(".hero__amp-wrap", "x", { duration: 1.4, ease: "power3" });
      var ampY = gsap.quickTo(".hero__amp-wrap", "y", { duration: 1.4, ease: "power3" });

      function onMove(e) {
        var nx = e.clientX / window.innerWidth - 0.5;
        var ny = e.clientY / window.innerHeight - 0.5;
        lightX(nx * 48); lightY(ny * 28);
        ampX(nx * -26); ampY(ny * -16);
      }
      window.addEventListener("pointermove", onMove, { passive: true });
      return function () { window.removeEventListener("pointermove", onMove); };
    });

    mm.add("(prefers-reduced-motion: reduce)", function () {
      gsap.set(".hero__ready", { autoAlpha: 1 });
    });
  })();

  /* ========================================================================
     3. Brand portfolio: the preview panel follows hover / focus
     ======================================================================== */
  (function brandSwitcher() {
    var list = $(".brand-list");
    var stack = $(".brand-preview__sticky");
    if (!list || !stack) return;

    var rows = $$(".brand-row", list);
    var panels = $$(".brand-preview__panel", stack);
    if (!rows.length || !panels.length) return;

    var active = null;
    var tween = null;

    function show(slug) {
      if (slug === active) return;
      var next = panels.filter(function (p) { return p.dataset.brand === slug; })[0];
      if (!next) return;

      var prev = panels.filter(function (p) { return p.dataset.brand === active; })[0];
      active = slug;

      rows.forEach(function (r) { r.classList.toggle("is-active", r.dataset.brand === slug); });

      if (!hasGsap || prefersReduced) {
        panels.forEach(function (p) { p.hidden = p !== next; });
        return;
      }

      if (tween) tween.kill();
      tween = gsap.timeline();

      if (prev && prev !== next) {
        tween.to(prev, {
          opacity: 0,
          clipPath: "inset(100% 0 0 0)",
          duration: 0.28,
          ease: "power2.in",
          onComplete: function () { prev.hidden = true; }
        });
      }
      tween.add(function () { next.hidden = false; })
        .fromTo(next,
          { opacity: 0, clipPath: "inset(0 0 100% 0)" },
          { opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power3.out" });
    }

    rows.forEach(function (row) {
      var slug = row.dataset.brand;
      row.addEventListener("mouseenter", function () { show(slug); });
      row.addEventListener("focus", function () { show(slug); });
    });

    // The markup ships with the second brand already visible; sync state to it.
    var initial = panels.filter(function (p) { return !p.hidden; })[0] || panels[0];
    active = initial.dataset.brand;
    panels.forEach(function (p) { p.hidden = p !== initial; });
    rows.forEach(function (r) { r.classList.toggle("is-active", r.dataset.brand === active); });
  })();

  /* ========================================================================
     4. Scroll effects engine
     ======================================================================== */
  (function scrollFx() {
    if (!hasGsap || !window.ScrollTrigger) return;

    var RISE = { autoAlpha: 0, y: 28, duration: 1, ease: "expo.out" };

    /* Rebuild an element's text as masked word spans; return the inner spans. */
    function splitIntoWords(el) {
      var frag = document.createDocumentFragment();
      var words = [];
      var chunks = (el.textContent || "").split(/(\s+)/);

      for (var i = 0; i < chunks.length; i++) {
        var chunk = chunks[i];
        if (!chunk) continue;
        if (!chunk.trim()) { frag.appendChild(document.createTextNode(chunk)); continue; }
        var mask = document.createElement("span");
        mask.className = "fx-word";
        var inner = document.createElement("span");
        inner.textContent = chunk;
        mask.appendChild(inner);
        frag.appendChild(mask);
        words.push(inner);
      }
      el.textContent = "";
      el.appendChild(frag);
      return words;
    }

    var mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", function () {
      $$('[data-fx="group"]').forEach(function (group) {
        var marked = $$("[data-fx-item]", group);
        var items = marked.length ? marked : [].slice.call(group.children);
        if (!items.length) return;
        gsap.from(items, Object.assign({}, RISE, {
          stagger: 0.09,
          scrollTrigger: { trigger: group, start: "top 85%" }
        }));
      });

      $$('[data-fx="rise"]').forEach(function (el) {
        gsap.from(el, Object.assign({}, RISE, {
          scrollTrigger: { trigger: el, start: "top 88%" }
        }));
      });

      $$('[data-fx="mask"]').forEach(function (el) {
        gsap.from(el, {
          clipPath: "inset(16% 0 16% 0)",
          opacity: 0.2,
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: { trigger: el, start: "top 88%" }
        });
      });

      $$('[data-fx="words"]').forEach(function (el) {
        if (el.children.length) return; // only safe on plain text
        gsap.from(splitIntoWords(el), {
          yPercent: 115,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.045,
          scrollTrigger: { trigger: el, start: "top 80%" }
        });
      });

      $$('[data-fx="rule"]').forEach(function (el) {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 92%" }
        });
      });

      $$('[data-fx="drift"]').forEach(function (el) {
        var amount = Number(el.dataset.fxAmount || 14);
        gsap.fromTo(el,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("section") || el,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
      });

      // Reading progress along the top edge.
      if ($(".fx-progress")) {
        gsap.fromTo(".fx-progress",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.3
            }
          });
      }
    });

    // Afacad changes the metrics once it swaps in, so re-measure every trigger.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
    }
    window.addEventListener("load", function () { ScrollTrigger.refresh(); });
  })();

  /* ========================================================================
     5. Contact form
     ======================================================================== */
  (function contact() {
    var form = $("#contact-form");
    if (!form) return;

    var success = $("#contact-success");
    var again = $("#contact-send-another");
    var submit = $("#contact-submit");
    var serverMsg = $("#contact-server");
    var honeypot = $("#contact-website");

    var FIELDS = ["name", "email", "company", "topic", "message"];
    var TOPICS = ["General inquiry", "Partnership", "Media & press", "One of our brands"];
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    var touched = {};

    function values() {
      var out = {};
      FIELDS.forEach(function (f) {
        var el = $("#contact-" + f);
        out[f] = el ? el.value : "";
      });
      return out;
    }

    /* Mirrors the validation the Next.js build ran on both client and server. */
    function validate(v) {
      var errors = {};
      var name = (v.name || "").trim();
      var email = (v.email || "").trim();
      var message = (v.message || "").trim();

      if (name.length < 2) errors.name = "Enter your full name.";
      else if (name.length > 120) errors.name = "Keep your name under 120 characters.";

      if (!email) errors.email = "Enter your email address.";
      else if (!emailRe.test(email) || email.length > 200) {
        errors.email = "Enter an email address like name@company.com.";
      }

      if ((v.company || "").length > 160) errors.company = "Keep the company name under 160 characters.";
      if (TOPICS.indexOf(v.topic) === -1) errors.topic = "Choose what your message is about.";

      if (message.length < 20) errors.message = "Add a little more detail, at least 20 characters.";
      else if (message.length > 4000) errors.message = "Keep your message under 4,000 characters.";

      return errors;
    }

    function paint(errors) {
      FIELDS.forEach(function (f) {
        var control = $("#contact-" + f);
        var slot = $("#contact-" + f + "-error");
        if (!control || !slot) return;
        var msg = touched[f] ? errors[f] : undefined;
        if (msg) {
          control.setAttribute("aria-invalid", "true");
          control.setAttribute("aria-describedby", "contact-" + f + "-error");
          slot.textContent = msg;
          slot.hidden = false;
        } else {
          control.removeAttribute("aria-invalid");
          control.removeAttribute("aria-describedby");
          slot.textContent = "";
          slot.hidden = true;
        }
      });
    }

    function setServerMessage(text) {
      if (!serverMsg) return;
      serverMsg.textContent = text || "";
      serverMsg.hidden = !text;
    }

    function setSending(on) {
      if (!submit) return;
      submit.disabled = on;
      submit.classList.toggle("is-sending", on);
    }

    FIELDS.forEach(function (f) {
      var el = $("#contact-" + f);
      if (!el) return;
      el.addEventListener("blur", function () {
        touched[f] = true;
        paint(validate(values()));
      });
      el.addEventListener("input", function () {
        if (f === "topic") el.dataset.empty = String(!el.value);
        if (touched[f]) paint(validate(values()));
      });
      if (f === "topic") {
        el.dataset.empty = String(!el.value);
        el.addEventListener("change", function () {
          el.dataset.empty = String(!el.value);
          touched[f] = true;
          paint(validate(values()));
        });
      }
    });

    function showSuccess(title, text) {
      if (!success) return;
      var h = $(".contact-success__title", success);
      var p = $(".contact-success__text", success);
      if (title && h) h.textContent = title;
      if (text && p) p.textContent = text;
      form.hidden = true;
      success.hidden = false;
      if (hasGsap && !prefersReduced) {
        gsap.fromTo(success, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" });
      }
    }

    function mailtoFallback(v) {
      var body = [
        "Name: " + v.name,
        "Email: " + v.email,
        "Company: " + (v.company || "-"),
        "Topic: " + v.topic,
        "",
        v.message
      ].join("\n");
      var href = "mailto:" + CONTACT.email +
        "?subject=" + encodeURIComponent("Website inquiry: " + v.topic) +
        "&body=" + encodeURIComponent(body);
      window.location.href = href;
      showSuccess(
        "Your email app is opening.",
        "The message is ready to send to " + CONTACT.email + ". Press send in your mail app and a member of the " +
        "Jones & Sons team will reply."
      );
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      setServerMessage("");

      var v = values();
      var errors = validate(v);
      FIELDS.forEach(function (f) { touched[f] = true; });
      paint(errors);

      var first = FIELDS.filter(function (f) { return errors[f]; })[0];
      if (first) {
        var el = $("#contact-" + first);
        if (el) el.focus();
        return;
      }

      // Honeypot: real visitors never see or fill this field.
      if (honeypot && honeypot.value) { showSuccess(); return; }

      if (!CONTACT.endpoint) { mailtoFallback(v); return; }

      setSending(true);
      var payload = new FormData();
      Object.keys(v).forEach(function (k) { payload.append(k, v[k]); });
      payload.append("_subject", "Website inquiry: " + v.topic);

      fetch(CONTACT.endpoint, { method: "POST", body: payload, headers: { Accept: "application/json" } })
        .then(function (res) {
          if (!res.ok) throw new Error("Endpoint responded " + res.status);
          form.reset();
          touched = {};
          paint({});
          var topic = $("#contact-topic");
          if (topic) topic.dataset.empty = "true"; // reset() restores the placeholder option
          showSuccess();
        })
        .catch(function () {
          setServerMessage("Your message could not be sent. Try again in a few minutes, or email " + CONTACT.email + ".");
        })
        .then(function () { setSending(false); });
    });

    if (again) {
      again.addEventListener("click", function () {
        success.hidden = true;
        form.hidden = false;
        setServerMessage("");
        var name = $("#contact-name");
        if (name) name.focus();
      });
    }
  })();

  /* ========================================================================
     6. Back to top
     ======================================================================== */
  (function backToTop() {
    var btn = $(".back-to-top");
    if (!btn) return;
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
      var main = document.getElementById("main");
      if (main) main.focus({ preventScroll: true });
    });
  })();

  /* ========================================================================
     7. Current year in the footer
     ======================================================================== */
  $$("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
