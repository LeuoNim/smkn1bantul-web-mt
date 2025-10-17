import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UsersAPI } from '../../../utils/api';

const AdminGuruForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({ name: '', nip: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      UsersAPI.list({ role: 'guru', per_page: 1, id })
        .then((data) => {
          const list = data.data || data;
          const u = Array.isArray(list) ? list.find(x => String(x.id) === String(id)) : null;
          if (u) setForm({ name: u.name || '', nip: u.nip || '' });
        })
        .catch((e) => setError(e.message));
    }
  }, [id]);

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Pada penambahan guru baru: username = NIP, password = NIP
      const base = { ...form, role: 'guru' };
      const payload = isEdit
        ? base // edit tidak memaksa ubah password/username
        : { ...base, username: form.nip, password: form.nip };
      if (isEdit) await UsersAPI.update(id, payload);
      else await UsersAPI.create(payload);
      navigate('/admin/manajemen-guru');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-semibold text-white mb-4">{isEdit ? 'Edit' : 'Tambah'} Guru</h1>
      {error && <p className="text-red-400 mb-3">{error}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Nama</label>
          <input name="name" value={form.name} onChange={onChange} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" required />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">NIP (akan menjadi Username & Password)</label>
          <input name="nip" value={form.nip} onChange={onChange} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" required />
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded disabled:opacity-50">
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button type="button" onClick={() => navigate('/admin/manajemen-guru')} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded">Batal</button>
        </div>
      </form>
    </div>
  );
};

export default AdminGuruForm;
