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
            <Head title="SportBook - Kelola Bisnis Olahraga Anda" />
            
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
                {/* Header */}
                <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <div className="text-2xl font-bold text-primary flex items-center gap-2">
                                    🏆 <span>SportBook</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link href="/dashboard">
                                        <Button className="bg-primary hover:bg-primary/90 shadow-lg">
                                            📊 Dashboard
                                        </Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href="/login">
                                            <Button variant="ghost" className="text-primary hover:text-primary/90 hover:bg-primary/10 font-medium">
                                                Login
                                            </Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg font-medium">
                                                Daftar
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-blue-500/5"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
                        <div className="text-center">
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Kelola Bisnis Olahraga Anda<br/>
                                <span className="text-primary">Lebih Mudah dan Untung!</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                                Satu Aplikasi untuk Semua Kebutuhan Lapangan Olahraga Anda:<br/>
                                <span className="font-semibold text-primary">Sistem Booking Lapangan, Membership, Poin Reward, POS Kafe, dan Laporan Terintegrasi</span>
                            </p>
                            
                            {!auth.user && (
                                <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                                    <Link href="/register" className="flex-1">
                                        <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-6 shadow-xl hover:shadow-2xl transition-all font-semibold">
                                            🚀 Mulai Sekarang
                                        </Button>
                                    </Link>
                                    <Link href="/login" className="flex-1">
                                        <Button variant="outline" size="lg" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg py-6 shadow-lg font-semibold transition-all">
                                            💼 Login Admin
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">✨ Fitur Lengkap & Terintegrasi</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Semua yang Anda butuhkan untuk mengelola bisnis lapangan olahraga modern dalam satu platform
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Booking Management */}
                            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-300">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                    <div className="text-3xl">🏟️</div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Manajemen Booking Cerdas</h3>
                                <ul className="text-gray-600 space-y-3">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">📅</span>
                                        <span>Pilih tanggal & waktu dengan mudah</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">🚫</span>
                                        <span>Anti double booking otomatis</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">🏸</span>
                                        <span>Support lapangan padel & badminton</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">💰</span>
                                        <span>Kalkulasi harga real-time</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Membership System */}
                            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-300">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                    <div className="text-3xl">👥</div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Sistem Membership & Poin Reward</h3>
                                <ul className="text-gray-600 space-y-3">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">🔐</span>
                                        <span>Registrasi & login member mudah</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">⭐</span>
                                        <span>10 poin per booking, 5 per transaksi POS</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">📈</span>
                                        <span>Akumulasi & tracking otomatis</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">🎁</span>
                                        <span>Sistem reward terintegrasi</span>
                                    </li>
                                </ul>
                            </div>

                            {/* POS System */}
                            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-300">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                    <div className="text-3xl">🛍️</div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">POS Kafe Cepat</h3>
                                <ul className="text-gray-600 space-y-3">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">🍔</span>
                                        <span>Menu minuman & makanan lengkap</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">💳</span>
                                        <span>Pembayaran Cash & QRIS</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">🧾</span>
                                        <span>Receipt & invoice otomatis</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">📝</span>
                                        <span>Manajemen inventori real-time</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Admin Panel */}
                            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-300">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                    <div className="text-3xl">⚙️</div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Panel Admin Komprehensif</h3>
                                <ul className="text-gray-600 space-y-3">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">📊</span>
                                        <span>Dashboard analytics real-time</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">👀</span>
                                        <span>Monitor semua transaksi live</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">👤</span>
                                        <span>Kelola member & poin reward</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">🏟️</span>
                                        <span>Manajemen lapangan & jadwal</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Reports */}
                            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-300">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                    <div className="text-3xl">📈</div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Laporan Bisnis Akurat</h3>
                                <ul className="text-gray-600 space-y-3">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">📅</span>
                                        <span>Laporan harian, mingguan & bulanan</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">💰</span>
                                        <span>Analisis revenue mendalam</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">⭐</span>
                                        <span>Rekap poin & aktivitas member</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">📄</span>
                                        <span>Export Excel/CSV/PDF</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Integration */}
                            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-300">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                    <div className="text-3xl">🔗</div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Integrasi Seamless</h3>
                                <ul className="text-gray-600 space-y-3">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">🔄</span>
                                        <span>Sinkronisasi data real-time</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">📱</span>
                                        <span>Responsive di semua device</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">🔒</span>
                                        <span>Keamanan data terjamin</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">⚡</span>
                                        <span>Performa cepat & stabil</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">🏆 Mengapa Memilih SportBook?</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Keunggulan yang membuat bisnis olahraga Anda unggul dari kompetitor
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Integration */}
                            <div className="bg-white rounded-2xl shadow-xl p-10 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <div className="text-4xl text-primary">🔗</div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Integrasi Penuh</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Semua sistem terintegrasi dalam satu platform. Booking, membership, POS, dan laporan 
                                    bekerja bersama untuk efisiensi maksimal.
                                </p>
                            </div>

                            {/* Revenue Optimization */}
                            <div className="bg-white rounded-2xl shadow-xl p-10 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <div className="text-4xl text-primary">💎</div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Optimasi Pendapatan</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Sistem poin reward mendorong repeat booking, POS kafe menambah revenue stream, 
                                    dan laporan membantu optimasi pricing strategy.
                                </p>
                            </div>

                            {/* User Experience */}
                            <div className="bg-white rounded-2xl shadow-xl p-10 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <div className="text-4xl text-primary">⚡</div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Performa Cepat & Stabil</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Dibangun dengan teknologi modern Laravel & React. Loading cepat, tampilan responsif, 
                                    dan pengalaman pengguna yang mulus.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="py-24 bg-gradient-to-r from-primary to-blue-600 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            🚀 Siap Transformasi Bisnis Olahraga Anda?
                        </h2>
                        <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-4xl mx-auto">
                            Bergabunglah dengan ratusan pengelola lapangan olahraga yang sudah merasakan kemudahan 
                            mengelola booking, membership, POS kafe, dan laporan dalam satu platform terintegrasi.
                        </p>
                        
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-lg mx-auto">
                                <Link href="/register" className="flex-1">
                                    <Button 
                                        size="lg" 
                                        variant="secondary" 
                                        className="w-full bg-white text-primary hover:bg-gray-100 text-lg py-6 font-bold shadow-2xl transition-all"
                                    >
                                        ✨ Daftar Gratis Sekarang
                                    </Button>
                                </Link>
                                <Link href="/login" className="flex-1">
                                    <Button 
                                        size="lg" 
                                        variant="outline" 
                                        className="w-full border-2 border-white text-white hover:bg-white hover:text-primary text-lg py-6 font-bold shadow-xl transition-all"
                                    >
                                        🔑 Login Admin
                                    </Button>
                                </Link>
                            </div>
                        )}

                        <div className="mt-12 text-center">
                            <p className="text-blue-100 font-medium">
                                💯 <span className="font-bold">100% Gratis</span> • 🚀 <span className="font-bold">Setup Instant</span> • 💪 <span className="font-bold">Support 24/7</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-300 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-3 text-3xl font-bold text-white mb-6">
                                🏆 <span>SportBook</span>
                            </div>
                            <p className="text-lg mb-6 max-w-3xl mx-auto leading-relaxed">
                                Solusi lengkap dan modern untuk manajemen lapangan olahraga dengan sistem booking cerdas, 
                                membership terintegrasi, poin reward, POS kafe, dan laporan bisnis yang akurat.
                            </p>
                            <div className="border-t border-gray-700 pt-8">
                                <p className="text-sm text-gray-400">
                                    © 2024 SportBook Indonesia. Semua hak dilindungi. 
                                    Dibuat dengan <span className="text-red-400">❤️</span> untuk kemajuan bisnis olahraga Indonesia.
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}