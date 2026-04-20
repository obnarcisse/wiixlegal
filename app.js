(function () {
  const config = window.WIIX_SITE_CONFIG || {};
  const siteName = config.siteName || 'Wiix';
  const siteDomain = config.siteDomain || 'https://oniix.app';
  const supportEmail = (config.supportEmail || '').trim();
  const deletionFormUrl = (config.deletionFormUrl || '').trim();

  const page = document.body.dataset.page || '';

  document.querySelectorAll('[data-site-name]').forEach((node) => {
    node.textContent = siteName;
  });

  document.querySelectorAll('[data-current-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  document.querySelectorAll('[data-site-domain]').forEach((node) => {
    if (node instanceof HTMLAnchorElement) {
      node.href = siteDomain;
      node.textContent = siteDomain.replace(/^https?:\/\//, '');
    } else {
      node.textContent = siteDomain;
    }
  });

  document.querySelectorAll('[data-nav]').forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    if (node.dataset.nav === page) node.setAttribute('aria-current', 'page');
  });

  const mailtoUrl = supportEmail
    ? `mailto:${supportEmail}?subject=${encodeURIComponent(`Demande de suppression de compte ${siteName}`)}&body=${encodeURIComponent(
        [
          'Bonjour,',
          '',
          `Je souhaite demander la suppression définitive de mon compte ${siteName}.`,
          'Pseudo ou adresse e-mail liée au compte :',
          '',
          'Merci de me confirmer la prise en charge de cette demande.',
        ].join('\n')
      )}`
    : '';

  document.querySelectorAll('[data-support-email]').forEach((node) => {
    node.textContent = supportEmail;
  });

  document.querySelectorAll('[data-mailto-link]').forEach((node) => {
    if (!(node instanceof HTMLAnchorElement)) return;
    if (mailtoUrl) {
      node.href = mailtoUrl;
      node.hidden = false;
    } else {
      node.hidden = true;
    }
  });

  document.querySelectorAll('[data-deletion-form-link]').forEach((node) => {
    if (!(node instanceof HTMLAnchorElement)) return;
    if (deletionFormUrl) {
      node.href = deletionFormUrl;
      node.hidden = false;
    } else {
      node.hidden = true;
    }
  });

  document.querySelectorAll('[data-support-email-block]').forEach((node) => {
    node.hidden = !supportEmail;
  });

  document.querySelectorAll('[data-support-form-block]').forEach((node) => {
    node.hidden = !deletionFormUrl;
  });

  document.querySelectorAll('[data-support-missing]').forEach((node) => {
    node.hidden = Boolean(supportEmail || deletionFormUrl);
  });

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');

  if (menuToggle instanceof HTMLButtonElement && menu instanceof HTMLElement) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menu.dataset.open === 'true';
      menu.dataset.open = String(!isOpen);
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.dataset.open = 'false';
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const revealables = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -10%',
        threshold: 0.2,
      }
    );

    revealables.forEach((node) => revealObserver.observe(node));
  } else {
    revealables.forEach((node) => node.classList.add('is-visible'));
  }

  const sections = Array.from(document.querySelectorAll('.legal-article section[id]'));
  const tocLinks = Array.from(document.querySelectorAll('.toc a[href^="#"]'));

  if (sections.length && tocLinks.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) return;
        const activeId = `#${visibleEntry.target.id}`;

        tocLinks.forEach((link) => {
          if (!(link instanceof HTMLAnchorElement)) return;
          if (link.getAttribute('href') === activeId) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      },
      {
        rootMargin: '-20% 0px -55%',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }
})();
