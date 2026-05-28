/* nav.js — Shared navigation behavior for all ASN pages */

(function () {
  'use strict';

  // ── Mark active nav item ──────────────────────────────────
  function markActiveNav() {
    var current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item[href]').forEach(function (el) {
      var href = el.getAttribute('href');
      if (href === current || (current === '' && href === 'index.html')) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  // ── Mobile sidebar toggle ─────────────────────────────────
  function initMobileMenu() {
    var toggle = document.getElementById('menuToggle');
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('sidebarOverlay');

    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
    });

    if (overlay) {
      overlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
      });
    }
  }

  // ── Tabs ──────────────────────────────────────────────────
  function initTabs() {
    document.querySelectorAll('.tabs-nav').forEach(function (nav) {
      nav.querySelectorAll('.tab-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var wrapper = nav.closest('.tabs-wrapper');
          var target = btn.dataset.tab;

          nav.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');

          wrapper.querySelectorAll('.tab-pane').forEach(function (pane) {
            pane.classList.toggle('active', pane.id === target);
          });
        });
      });
    });
  }

  // ── Reveal blocks ─────────────────────────────────────────
  function initReveal() {
    document.querySelectorAll('.reveal-header').forEach(function (header) {
      header.addEventListener('click', function () {
        var block = header.closest('.reveal-block');
        block.classList.toggle('open');
      });
    });
  }

  // ── Init ──────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    markActiveNav();
    initMobileMenu();
    initTabs();
    initReveal();
  });

})();
