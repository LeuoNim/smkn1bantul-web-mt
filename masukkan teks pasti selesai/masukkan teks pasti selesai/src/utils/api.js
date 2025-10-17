const DEFAULT_BASE = (() => {
  if (process.env.REACT_APP_API_URL) return process.env.REACT_APP_API_URL;
  if (typeof window !== 'undefined') {
    // If running frontend dev on :3000, assume backend on :8000
    if (window.location.port === '3000') return 'http://127.0.0.1:8000/api';
    // Else try same-origin /api by default
    return `${window.location.origin}/api`;
  }
  return 'http://127.0.0.1:8000/api';
})();
export const BASE_URL = DEFAULT_BASE;
const WITH_CREDS = (process.env.REACT_APP_WITH_CREDENTIALS || 'false') === 'true';

async function fetchJSON(path, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...authHeader,
      ...(options.headers || {}),
    },
    credentials: WITH_CREDS ? 'include' : 'omit',
    ...options,
  });
  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json() : await res.text();
  if (!res.ok) {
    const message = typeof data === 'string' ? data : (data.message || 'Request failed');
    throw new Error(message);
  }
  return data;
}

export const NewsAPI = {
  list: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return fetchJSON(`/berita${q ? `?${q}` : ''}`);
  },
  detailBySlug: (slug) => fetchJSON(`/berita/${slug}`),
  adminList: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return fetchJSON(`/admin/berita${q ? `?${q}` : ''}`);
  },
  create: (payload) => fetchJSON('/admin/berita', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) => fetchJSON(`/admin/berita/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  remove: (id) => fetchJSON(`/admin/berita/${id}`, { method: 'DELETE' }),
  adminShow: (id) => fetchJSON(`/admin/berita/${id}`),
  uploadImage: async (file) => {
    const form = new FormData();
    form.append('image', file);

    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

    const res = await fetch(`${BASE_URL}/admin/berita/upload-image`, {
      method: 'POST',
      body: form,
      headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest', ...authHeader },
      credentials: WITH_CREDS ? 'include' : 'omit',
    });

    const ct = res.headers.get('content-type') || '';
    let data;
    if (ct.includes('application/json')) {
      // Clone before attempting JSON so we can fallback to text without re-reading the same body
      const clone = res.clone();
      try {
        data = await res.json();
      } catch {
        data = await clone.text();
      }
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      const msg = typeof data === 'string' ? data.substring(0, 300) : (data?.message || 'Upload gagal');
      throw new Error(msg);
    }
    if (typeof data === 'string') throw new Error('Upload gagal');
    return data;
  },
};

export const AuthAPI = {
  logout: () => fetchJSON('/logout', { method: 'POST' }),
};

export const ReportsAPI = {
  listMine: () => fetchJSON('/laporan'),
  create: (payload) => fetchJSON('/laporan', { method: 'POST', body: JSON.stringify(payload) }),
  uploadImage: async (file) => {
    const form = new FormData();
    form.append('image', file);
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(`${BASE_URL}/laporan/upload-foto`, {
      method: 'POST',
      body: form,
      headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest', ...authHeader },
      credentials: WITH_CREDS ? 'include' : 'omit',
    });
    const ct = res.headers.get('content-type') || '';
    const data = ct.includes('application/json') ? await res.json() : await res.text();
    if (!res.ok || typeof data === 'string') throw new Error((data?.message) || 'Upload gagal');
    return data;
  },
};

export const AdminReportsAPI = {
  pending: () => fetchJSON('/admin/laporan-sementara'),
  confirm: ({ ids, status }) => fetchJSON('/admin/konfirmasi-laporan', { method: 'POST', body: JSON.stringify({ ids, status }) }),
  list: () => fetchJSON('/admin/laporan'),
  updateStatus: (id, status) => fetchJSON(`/admin/laporan/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteMany: (ids) => fetchJSON('/admin/laporan', { method: 'DELETE', body: JSON.stringify({ ids }) }),
};

export const AdminGalleryAPI = {
  list: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return fetchJSON(`/admin/galeri${q ? `?${q}` : ''}`);
  },
  show: (id) => fetchJSON(`/admin/galeri/${id}`),
  create: (payload) => fetchJSON('/admin/galeri', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) => fetchJSON(`/admin/galeri/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  remove: (id) => fetchJSON(`/admin/galeri/${id}`, { method: 'DELETE' }),
  uploadImage: async (file) => {
    const form = new FormData();
    form.append('image', file);
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(`${BASE_URL}/admin/galeri/upload-image`, {
      method: 'POST',
      body: form,
      headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest', ...authHeader },
      credentials: WITH_CREDS ? 'include' : 'omit',
    });
    const ct = res.headers.get('content-type') || '';
    const data = ct.includes('application/json') ? await res.json() : await res.text();
    if (!res.ok || typeof data === 'string') throw new Error((data?.message) || 'Upload gagal');
    return data;
  },
};

export const NotificationsAPI = {
  admin: () => fetchJSON('/admin/notifikasi'),
  adminReadAll: () => fetchJSON('/admin/notifikasi/read-all', { method: 'POST' }),
  siswa: () => fetchJSON('/notifikasi'),
  siswaReadAll: () => fetchJSON('/notifikasi/read-all', { method: 'POST' }),
};

export const ReportsPublicAPI = {
  latestFinished: (limit=6) => fetchJSON(`/laporan/selesai?limit=${encodeURIComponent(limit)}`),
  latestConfirmed: async (limit=6) => {
    try {
      return await fetchJSON(`/laporan/terkonfirmasi?limit=${encodeURIComponent(limit)}`);
    } catch {
      // Fallback aman tanpa 404 tambahan: gunakan daftar selesai saja
      return await fetchJSON(`/laporan/selesai?limit=${encodeURIComponent(limit)}`);
    }
  },
};

export const PublicGalleryAPI = {
  latest: (limit=6) => fetchJSON(`/galeri?limit=${encodeURIComponent(limit)}`),
};

export const UsersAPI = {
  list: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return fetchJSON(`/admin/users${q ? `?${q}` : ''}`);
  },
  create: (payload) => fetchJSON('/admin/users', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) => fetchJSON(`/admin/users/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  remove: (id) => fetchJSON(`/admin/users/${id}`, { method: 'DELETE' }),
};
