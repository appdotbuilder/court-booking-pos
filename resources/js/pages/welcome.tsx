import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface SharedData {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
    [key: string]: unknown;
}

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Sport Court Booking System" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
                {/* Header */}
                <nav className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <div className="text-2xl font-bold text-primary">🏆 SportBook</div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href="/dashboard"
                                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="text-gray-600 hover:text-gray-900 font-medium"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center">
                            <h1 className="text-5xl font-bold text-gray-900 mb-6">
                                🏸 Sistem Booking Lapangan <span className="text-primary">Olahraga</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                                Platform terpadu untuk booking lapangan padel & badminton, sistem membership dengan poin reward, 
                                POS kafe, dan laporan lengkap. Kelola bisnis olahraga Anda dengan mudah!
                            </p>
                            
                            {!auth.user && (
                                <div className="flex justify-center space-x-4">
                                    <Link href="/register">
                                        <Button size="lg" className="bg-primary hover:bg-primary/90">
                                            🚀 Mulai Sekarang
                                        </Button>
                                    </Link>
                                    <Link href="/login">
                                        <Button variant="outline" size="lg">
                                            💼 Login Admin
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">✨ Fitur Lengkap</h2>
                            <p className="text-lg text-gray-600">Semua yang Anda butuhkan dalam satu platform</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Booking Management */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border border-blue-200">
                                <div className="text-4xl mb-4">🏟️</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Booking Lapangan</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>📅 Pilih tanggal & waktu dengan mudah</li>
                                    <li>🚫 Anti double booking otomatis</li>
                                    <li>🏸 Lapangan padel & badminton</li>
                                    <li>💰 Kalkulasi harga real-time</li>
                                </ul>
                            </div>

                            {/* Membership System */}
                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border border-green-200">
                                <div className="text-4xl mb-4">👥</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sistem Membership</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>🔐 Registrasi & login member</li>
                                    <li>📱 Profil lengkap member</li>
                                    <li>🎯 Tracking aktivitas</li>
                                    <li>📊 Statistik personal</li>
                                </ul>
                            </div>

                            {/* Points Reward */}
                            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-xl border border-yellow-200">
                                <div className="text-4xl mb-4">⭐</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Poin Reward</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>🏆 10 poin per booking</li>
                                    <li>☕ 5 poin per transaksi POS</li>
                                    <li>📈 Akumulasi otomatis</li>
                                    <li>🎁 Sistem reward terintegrasi</li>
                                </ul>
                            </div>

                            {/* POS System */}
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl border border-purple-200">
                                <div className="text-4xl mb-4">🛍️</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">POS Kafe</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>🍔 Menu minuman & makanan</li>
                                    <li>💳 Pembayaran Cash & QRIS</li>
                                    <li>🧾 Receipt otomatis</li>
                                    <li>📝 Manajemen inventori</li>
                                </ul>
                            </div>

                            {/* Admin Panel */}
                            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-xl border border-red-200">
                                <div className="text-4xl mb-4">⚙️</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Admin Panel</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>📊 Dashboard komprehensif</li>
                                    <li>👀 Monitor semua transaksi</li>
                                    <li>👤 Kelola member & poin</li>
                                    <li>🏟️ Manajemen lapangan</li>
                                </ul>
                            </div>

                            {/* Reports */}
                            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-xl border border-indigo-200">
                                <div className="text-4xl mb-4">📈</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Laporan Lengkap</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>📅 Laporan harian & bulanan</li>
                                    <li>💰 Analisis revenue</li>
                                    <li>⭐ Rekap poin reward</li>
                                    <li>📄 Export Excel/CSV</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Screenshots/Mockup Section */}
                <div className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">🖥️ Interface Modern</h2>
                            <p className="text-lg text-gray-600">Design minimalis dengan warna primer #2b8abf</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Dashboard Preview */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
                                <div className="h-48 bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
                                    <div className="text-white text-center">
                                        <div className="text-4xl mb-2">📊</div>
                                        <h3 className="text-xl font-semibold">Dashboard Admin</h3>
                                        <p className="text-primary-100">Statistics & Analytics</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-semibold mb-2">Dashboard Features:</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Real-time statistics</li>
                                        <li>• Revenue tracking</li>
                                        <li>• Member leaderboard</li>
                                        <li>• Court utilization</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Booking Interface Preview */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
                                <div className="h-48 bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                                    <div className="text-white text-center">
                                        <div className="text-4xl mb-2">🏟️</div>
                                        <h3 className="text-xl font-semibold">Booking System</h3>
                                        <p className="text-green-100">Easy Court Reservation</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-semibold mb-2">Booking Features:</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Calendar interface</li>
                                        <li>• Time slot selection</li>
                                        <li>• Availability checker</li>
                                        <li>• Instant confirmation</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="py-20 bg-primary text-white">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold mb-4">🚀 Siap Mengoptimalkan Bisnis Olahraga Anda?</h2>
                        <p className="text-xl text-primary-100 mb-8">
                            Bergabunglah dengan ratusan bisnis olahraga yang sudah mempercayai platform kami 
                            untuk mengelola booking lapangan, membership, dan operasional sehari-hari.
                        </p>
                        
                        {!auth.user && (
                            <div className="flex justify-center space-x-4">
                                <Link href="/register">
                                    <Button size="lg" variant="secondary">
                                        ✨ Daftar Gratis
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                                        🔑 Login
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-300 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white mb-4">🏆 SportBook</div>
                            <p className="mb-4">
                                Solusi lengkap untuk manajemen lapangan olahraga dengan sistem booking, 
                                membership, poin reward, POS kafe, dan laporan terintegrasi.
                            </p>
                            <p className="text-sm text-gray-400">
                                © 2024 SportBook. Semua hak dilindungi. 
                                Dibuat dengan ❤️ untuk kemajuan bisnis olahraga Indonesia.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}