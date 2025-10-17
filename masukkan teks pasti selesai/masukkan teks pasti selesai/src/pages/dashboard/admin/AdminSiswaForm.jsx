import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UsersAPI } from '../../../utils/api';

const AdminSiswaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: '',
    nis: '',
    nisn: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      UsersAPI.list({ role: 'siswa', per_page: 1, id })
        .then((data) => {
          const list = data.data || data;
          const u = Array.isArray(list) ? list.find(x => String(x.id) === String(id)) : null;
          if (u) setForm({ name: u.name || '', nis: u.nis || '', nisn: u.nisn || '' });
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
      const payload = { ...form, role: 'siswa' };
      if (isEdit) await UsersAPI.update(id, payload);
      else await UsersAPI.create(payload);
      navigate('/admin/manajemen-siswa');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-semibold text-white mb-4">{isEdit ? 'Edit' : 'Tambah'} Siswa</h1>
      {error && <p className="text-red-400 mb-3">{error}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Nama</label>
          <input name="name" value={form.name} onChange={onChange} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" required />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">NIS (Username)</label>
          <input name="nis" value={form.nis} onChange={onChange} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" required />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">NISN (Password)</label>
          <input name="nisn" value={form.nisn} onChange={onChange} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" required />
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded disabled:opacity-50">
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button type="button" onClick={() => navigate('/admin/manajemen-siswa')} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded">Batal</button>
        </div>
      </form>
    </div>
  );
};

export default AdminSiswaForm;