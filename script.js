const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = '☰';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('enquiryForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = encodeURIComponent('Fire Safety Enquiry — ALFA & ALFA SAFETY SERVICES');
  const body = encodeURIComponent(
`Hello ALFA & ALFA SAFETY SERVICES,

I would like to enquire about fire safety services.

Name: ${form.get('name')}
Phone: ${form.get('phone')}
Premises: ${form.get('site')}
Service required: ${form.get('service')}
Additional details: ${form.get('message') || 'Not provided'}

Please contact me to discuss the next steps.`
  );
  // Enquiry opens the visitor's default email application.
  const businessEmail = 'alfa.alfasafetyservices@gmail.com';
  window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${body}`;
});


// Make visible numbers slightly larger for readability, without changing links or other content.
function emphasizeVisibleNumbers() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest('script, style, textarea, input, select, option, .number-emphasis')) {
        return NodeFilter.FILTER_REJECT;
      }
      return /\d/.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach(node => {
    const parts = node.nodeValue.split(/(\d+(?:[.,]\d+)*)/g);
    if (parts.length < 2) return;
    const fragment = document.createDocumentFragment();
    parts.forEach(part => {
      if (/^\d+(?:[.,]\d+)*$/.test(part)) {
        const span = document.createElement('span');
        span.className = 'number-emphasis';
        span.textContent = part;
        fragment.appendChild(span);
      } else if (part) {
        fragment.appendChild(document.createTextNode(part));
      }
    });
    node.parentNode.replaceChild(fragment, node);
  });
}
document.addEventListener('DOMContentLoaded', emphasizeVisibleNumbers);
