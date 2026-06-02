/* nav.js — Navegación compartida para todas las páginas ASN */
(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════
     REGISTRO DE CASOS
     Para añadir un caso nuevo: añadir una entrada aquí
     y subir solo el archivo HTML del caso.
     ready: true  → enlace activo
     ready: false → enlace activo pero página en blanco
  ════════════════════════════════════════════════════════ */
  var CASOS = [
    { slug: 'caso-textiles-medellin',    title: 'Textiles Medell\u00edn',              ready: true  },
    { slug: 'caso-ricks-cafe',           title: "Rick\u2019s Cafe Americain",          ready: true  },
    { slug: 'caso-alimentacion-gorki',   title: 'Alimentaci\u00f3n Gorki',             ready: false },
    { slug: 'caso-programacion-avanzada',title: 'Servicios de Programaci\u00f3n',      ready: false },
  ];

  /* ── Construir el sidebar ──────────────────────────────── */
  function buildSidebar() {
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    var current = window.location.pathname.split('/').pop() || 'index.html';

    var html = '';
    html += '<div class="sidebar-brand">';
    html += '  <span class="subject-label">Asignatura</span>';
    html += '  <span class="subject-title">An\u00e1lisis de Situaciones de Negocio</span>';
    html += '</div>';

    html += '<div class="nav-section">';
    html += '  <div class="nav-section-label">Inicio</div>';
    html += '  <a href="index.html" class="nav-item' + (current === 'index.html' ? ' active' : '') + '">';
    html += '    <span class="nav-icon">\u25c8</span> Metodolog\u00eda';
    html += '  </a>';
    html += '</div>';

    html += '<div class="nav-section">';
    html += '  <div class="nav-section-label">Casos</div>';

    CASOS.forEach(function (c) {
      var isActive = current === c.slug + '.html';
      html += '  <a href="' + c.slug + '.html" class="nav-item' + (isActive ? ' active' : '') + '">';
      html += '    <span class="nav-icon">' + (c.ready ? '\u25cf' : '\u25cb') + '</span> ' + c.title;
      html += '  </a>';
    });

    html += '</div>';
    html += '<div class="sidebar-footer">An\u00e1lisis de Situaciones de Negocio<br>Material de estudio y repaso</div>';

    sidebar.innerHTML = html;
  }

  /* ── Mobile sidebar toggle ─────────────────────────────── */
  function initMobileMenu() {
    var toggle  = document.getElementById('menuToggle');
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

  /* ── Tabs ──────────────────────────────────────────────── */
  function initTabs() {
    document.querySelectorAll('.tabs-nav').forEach(function (nav) {
      nav.querySelectorAll('.tab-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var wrapper = nav.closest('.tabs-wrapper');
          var target  = btn.dataset.tab;
          nav.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          wrapper.querySelectorAll('.tab-pane').forEach(function (pane) {
            pane.classList.toggle('active', pane.id === target);
          });
        });
      });
    });
  }

  /* ── Reveal blocks ─────────────────────────────────────── */
  function initReveal() {
    document.querySelectorAll('.reveal-header').forEach(function (header) {
      header.addEventListener('click', function () {
        header.closest('.reveal-block').classList.toggle('open');
      });
    });
  }

  /* ── Init ──────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    buildSidebar();
    initMobileMenu();
    initTabs();
    initReveal();
  });

})();
