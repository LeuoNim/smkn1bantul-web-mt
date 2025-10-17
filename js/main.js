// Base script for Website Sekolah MT
(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  console.log('Website Sekolah MT initialized.');
})();
