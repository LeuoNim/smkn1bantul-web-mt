import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NewsAPI } from '../../../utils/api';

const AdminBeritaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    body: '',
    image_url: '',
    is_published: true,
    published_at: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isEdit) {
      NewsAPI.adminShow(id)
        .then((data) => {
          setForm({
            title: data.title || '',
            slug: data.slug || '',
            excerpt: data.excerpt || '',
            body: data.body || '',
            image_url: data.image_url || '',
            is_published: !!data.is_published,
            published_at: data.published_at ? data.published_at.substring(0, 16) : '',
            category: data.category || 'Acara',
          });
        })
        .catch((e) => setError(e.message));
    }
  }, [id]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onFilePick = () => fileInputRef.current?.click();

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError('Ukuran file melebihi 10MB');
      return;
    }
    await doUpload(file);
  };

  const onDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError('Ukuran file melebihi 10MB');
      return;
    }
    await doUpload(file);
  };

  const doUpload = async (file) => {
    try {
      setUploading(true);
      const { url } = await NewsAPI.uploadImage(file);
      setForm((f) => ({ ...f, image_url: url }));
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = { ...form };
      if (!payload.slug) delete payload.slug; // biarkan backend generate
      if (!payload.published_at) delete payload.published_at;
      if (isEdit) {
        await NewsAPI.update(id, payload);
      } else {
        await NewsAPI.create(payload);
      }
      navigate('/admin/berita');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold text-white mb-4">{isEdit ? 'Edit' : 'Tambah'} Berita</h1>
      {error && <p className="text-red-400 mb-3">{error}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Judul</label>
          <input name="title" value={form.title} onChange={onChange} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" required />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Slug (opsional)</label>
          <input name="slug" value={form.slug} onChange={onChange} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Ringkasan</label>
          <input name="excerpt" value={form.excerpt} onChange={onChange} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Kategori</label>
          <select name="category" value={form.category || 'Acara'} onChange={onChange} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white">
            <option>Acara</option>
            <option>Pengumuman</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Isi Berita</label>
          <textarea name="body" value={form.body} onChange={onChange} className="w-full h-40 bg-slate-800 border border-slate-700 rounded p-2 text-white" required />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-2">Gambar</label>
          <div
            className={`border-2 border-dashed rounded p-4 text-slate-300 bg-slate-800/40 ${uploading ? 'opacity-60' : ''}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
          >
            {form.image_url ? (
              <div className="flex items-center gap-4">
                <img src={form.image_url} alt="preview" className="w-28 h-20 object-cover rounded" />
                <div className="flex-1">
                  <input name="image_url" value={form.image_url} onChange={onChange} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" />
                  <p className="text-xs text-slate-400 mt-1">Anda dapat tempel URL langsung atau unggah file baru.</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="mb-2">Drag & drop gambar ke sini, atau</p>
                <button type="button" onClick={onFilePick} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded">Pilih File</button>
                <p className="text-xs text-slate-400 mt-2">Atau isi kolom URL di bawah ini.</p>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
          </div>
          <input name="image_url" value={form.image_url} onChange={onChange} placeholder="https://..." className="mt-2 w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" />
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-slate-300">
            <input type="checkbox" name="is_published" checked={form.is_published} onChange={onChange} />
            Published
          </label>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Tanggal Publish</label>
            <input type="datetime-local" name="published_at" value={form.published_at} onChange={onChange} className="bg-slate-800 border border-slate-700 rounded p-2 text-white" />
          </div>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded disabled:opacity-50">
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button type="button" onClick={() => navigate('/admin/berita')} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded">Batal</button>
        </div>
      </form>
    </div>
  );
};

export default AdminBeritaForm;