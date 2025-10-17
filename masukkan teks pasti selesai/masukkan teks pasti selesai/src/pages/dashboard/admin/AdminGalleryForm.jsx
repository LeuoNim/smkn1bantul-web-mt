import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminGalleryAPI } from '../../../utils/api';

export default function AdminGalleryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({ title: '', caption: '', image_url: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    if (isEdit) {
      AdminGalleryAPI.show(id)
        .then((g) => setForm({ title: g.title || '', caption: g.caption || '', image_url: g.image_url || '' }))
        .catch((e) => setError(e.message));
    }
  }, [id]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const pick = () => fileRef.current?.click();
  const onFile = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    if (file.size > 10 * 1024 * 1024) return setError('Ukuran file > 10MB');
    try { setUploading(true); const { url } = await AdminGalleryAPI.uploadImage(file); setForm((f)=>({ ...f, image_url: url })); } catch (e) { setError(e.message); } finally { setUploading(false); }
  };

  const submit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      if (isEdit) await AdminGalleryAPI.update(id, form); else await AdminGalleryAPI.create(form);
      navigate('/admin/galeri');
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold text-white mb-4">{isEdit ? 'Edit' : 'Tambah'} Item Galeri</h1>
      {error && <p className="text-red-400 mb-3">{error}</p>}
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Judul</label>
          <input name="title" value={form.title} onChange={onChange} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" required />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Caption</label>
          <textarea name="caption" value={form.caption} onChange={onChange} className="w-full h-32 bg-slate-800 border border-slate-700 rounded p-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-2">Gambar</label>
          <div className={`border-2 border-dashed rounded p-4 text-slate-300 bg-slate-800/40 ${uploading ? 'opacity-60' : ''}`}>
            {form.image_url ? (
              <div className="flex items-center gap-4">
                <img src={form.image_url} alt="preview" className="w-28 h-20 object-cover rounded" />
                <input name="image_url" value={form.image_url} onChange={onChange} className="flex-1 bg-slate-800 border border-slate-700 rounded p-2 text-white" />
                <button type="button" onClick={pick} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded">Ubah</button>
              </div>
            ) : (
              <div className="text-center">
                <button type="button" onClick={pick} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded">Pilih File</button>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
          </div>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded disabled:opacity-50">{loading ? 'Menyimpan...' : 'Simpan'}</button>
          <button type="button" onClick={()=>navigate('/admin/galeri')} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded">Batal</button>
        </div>
      </form>
    </div>
  );
}
