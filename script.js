/* Breakthrough Author Live — small helpers. Plain JavaScript. */

(function () {
  'use strict';

  /* ---------- mobile menu ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    navLinks.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- FAQ open / close ---------- */
  var questions = document.querySelectorAll('.faq-q');

  for (var i = 0; i < questions.length; i++) {
    questions[i].addEventListener('click', function () {
      var item = this.parentNode;
      var open = item.classList.toggle('is-open');
      this.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- video: show poster until a real file exists ---------- */
  var video = document.getElementById('trainingVideo');
  var poster = document.getElementById('videoPoster');
  var note = document.getElementById('videoNote');

  if (video && poster) {
    poster.addEventListener('click', function () {
      video.hidden = false;
      poster.hidden = true;

      var play = video.play();

      /* If video.mp4 is not in the folder yet, play() fails.
         Put the poster back and explain in one short line. */
      if (play && play.catch) {
        play.catch(function () {
          video.hidden = true;
          poster.hidden = false;
          if (note) { note.hidden = false; }
        });
      }
    });
  }

  /* ---------- smooth close of the menu on resize ---------- */
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 700 && navLinks && navLinks.classList.contains('is-open')) {
      navLinks.classList.remove('is-open');
      if (navToggle) { navToggle.setAttribute('aria-expanded', 'false'); }
    }
  });
})();
