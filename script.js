/* Breakthrough Author Live — small page behaviours.
   No libraries. Plain JavaScript. */

(function () {
  'use strict';

  /* ---------- 1. Menu (hamburger) ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');

  function closeMenu() {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    nav.hidden = true;
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      nav.hidden = open;
    });

    // close after tapping a link
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });

    // close if the window becomes wide
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) closeMenu();
    });
  }

  /* ---------- 2. Video box ---------- */
  var video = document.getElementById('video');
  var play = document.getElementById('videoPlay');
  var label = document.getElementById('videoLabel');

  if (video && play) {
    play.addEventListener('click', function () {
      video.classList.add('is-open');
      if (label) label.remove();
      var msg = document.createElement('p');
      msg.className = 'video-msg';
      msg.textContent =
        'Your free training video goes here (about 15 minutes, plays muted with captions). ' +
        'Send me the video file and I will drop it in.';
      video.appendChild(msg);
      play.disabled = true;
    });
  }

  /* ---------- 3. Sticky bottom button ---------- */
  var sticky = document.getElementById('stickyCta');
  var hero = document.querySelector('.hero');

  if (sticky && hero) {
    var update = function () {
      var past = window.scrollY > hero.offsetHeight * 0.85;
      sticky.classList.toggle('is-visible', past);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ---------- 4. FAQ: keep one answer open at a time ---------- */
  var faqItems = document.querySelectorAll('.faq details');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });
})();
