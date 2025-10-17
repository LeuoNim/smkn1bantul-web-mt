import React, { useState } from "react";
import { User, Lock, LogIn } from 'lucide-react'
import { BASE_URL } from '../utils/api'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    if (!username || !password) {
      setError('Username dan password wajib diisi')
      return
    }

    // Coba 3 skema login berurutan: Admin, Guru (NIP), Siswa (NIS/NISN)
    const attempts = [
      { username, password },
      { nip: username, password },
      { nis: username, nisn: password },
    ]

    try {
      setLoading(true)
      let ok = false
      for (const payload of attempts) {
        try {
          const res = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
            body: JSON.stringify(payload),
          })
          const data = await res.json().catch(() => ({}))
          if (res.ok && data?.token) {
            localStorage.setItem('auth_token', data.token)
            localStorage.setItem('auth_role', data.role || '')
            window.location.href = (data?.role === 'admin') ? '/admin/dashboard' : '/'
            ok = true
            break
          }
        } catch (_) {
          // lanjut ke percobaan berikutnya
        }
      }
      if (!ok) throw new Error('Login gagal. Periksa kredensial Anda.')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen">

      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Masuk</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username */}
          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Username / NIS / NIP"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="password"
              placeholder="Password / NISN / NIP"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-all duration-300 disabled:opacity-60"
          >
            <LogIn size={20} />
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  )
}
