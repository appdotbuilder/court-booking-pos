import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Booking {
    id: number;
    user: { name: string; email: string };
    court: { name: string };
    booking_date: string;
    start_time: string;
    end_time: string;
    total_price: number;
    status: string;
}

interface PosTransaction {
    id: number;
    user: { name: string } | null;
    transaction_code: string;
    total_amount: number;
    payment_method: string;
    created_at: string;
}

interface Member {
    id: number;
    name: string;
    email: string;
    points: number;
}

interface Props {
    todayStats: {
        bookings: number;
        booking_revenue: number;
        pos_transactions: number;
        pos_revenue: number;
    };
    monthlyStats: {
        bookings: number;
        booking_revenue: number;
        pos_transactions: number;
        pos_revenue: number;
    };
    recentBookings: Booking[];
    recentPosTransactions: PosTransaction[];
    topMembers: Member[];
    totalMembers: number;
    activeCourts: number;
    [key: string]: unknown;
}

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' }
];

export default function Dashboard({ 
    todayStats, 
    monthlyStats, 
    recentBookings, 
    recentPosTransactions, 
    topMembers,
    totalMembers,
    activeCourts 
}: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - SportBook" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📊 Dashboard</h1>
                        <p className="text-gray-600 mt-1">Ringkasan aktivitas bisnis olahraga Anda</p>
                    </div>
                    
                    <div className="flex space-x-3">
                        <Link href="/bookings/create">
                            <Button className="bg-primary hover:bg-primary/90">
                                🏟️ Booking Baru
                            </Button>
                        </Link>
                        <Link href="/pos">
                            <Button variant="outline">
                                🛍️ POS Kafe
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Today's Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Booking Hari Ini</CardTitle>
                            <div className="text-2xl">🏟️</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{todayStats.bookings}</div>
                            <p className="text-xs text-muted-foreground">
                                Revenue: {formatCurrency(todayStats.booking_revenue)}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Transaksi POS Hari Ini</CardTitle>
                            <div className="text-2xl">🛍️</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{todayStats.pos_transactions}</div>
                            <p className="text-xs text-muted-foreground">
                                Revenue: {formatCurrency(todayStats.pos_revenue)}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Member</CardTitle>
                            <div className="text-2xl">👥</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalMembers}</div>
                            <p className="text-xs text-muted-foreground">
                                Member terdaftar
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Lapangan Aktif</CardTitle>
                            <div className="text-2xl">🏸</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{activeCourts}</div>
                            <p className="text-xs text-muted-foreground">
                                Lapangan tersedia
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Monthly Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📈 Statistik Bulanan
                            </CardTitle>
                            <CardDescription>
                                Performa bulan ini
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                <div>
                                    <p className="font-medium">Total Booking</p>
                                    <p className="text-sm text-gray-600">{monthlyStats.bookings} booking</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-blue-600">
                                        {formatCurrency(monthlyStats.booking_revenue)}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                <div>
                                    <p className="font-medium">Total POS</p>
                                    <p className="text-sm text-gray-600">{monthlyStats.pos_transactions} transaksi</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-green-600">
                                        {formatCurrency(monthlyStats.pos_revenue)}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">Total Revenue Bulan Ini</p>
                                    <p className="text-xl font-bold text-primary">
                                        {formatCurrency(monthlyStats.booking_revenue + monthlyStats.pos_revenue)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                ⭐ Top Members (Poin Terbanyak)
                            </CardTitle>
                            <CardDescription>
                                10 member dengan poin tertinggi
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {topMembers.slice(0, 5).map((member, index) => (
                                    <div key={member.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-bold text-primary">#{index + 1}</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{member.name}</p>
                                                <p className="text-xs text-gray-500">{member.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-primary">{member.points} pts</p>
                                        </div>
                                    </div>
                                ))}
                                
                                {topMembers.length > 5 && (
                                    <div className="pt-2 text-center">
                                        <Link href="/members" className="text-sm text-primary hover:underline">
                                            Lihat semua member →
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activities */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="flex items-center gap-2">
                                    🏟️ Booking Terbaru
                                </CardTitle>
                                <Link href="/bookings" className="text-sm text-primary hover:underline">
                                    Lihat semua
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentBookings.length > 0 ? recentBookings.map((booking) => (
                                    <div key={booking.id} className="flex justify-between items-center p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium">{booking.user.name}</p>
                                            <p className="text-sm text-gray-600">
                                                {booking.court.name} • {booking.booking_date}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {booking.start_time} - {booking.end_time}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">{formatCurrency(booking.total_price)}</p>
                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                                booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-gray-500 text-center py-4">Belum ada booking terbaru</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="flex items-center gap-2">
                                    🛍️ Transaksi POS Terbaru
                                </CardTitle>
                                <Link href="/pos/transactions" className="text-sm text-primary hover:underline">
                                    Lihat semua
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentPosTransactions.length > 0 ? recentPosTransactions.map((transaction) => (
                                    <div key={transaction.id} className="flex justify-between items-center p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium">
                                                {transaction.user ? transaction.user.name : 'Guest'}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {transaction.transaction_code}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(transaction.created_at).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">{formatCurrency(transaction.total_amount)}</p>
                                            <p className="text-xs text-gray-500 capitalize">
                                                {transaction.payment_method}
                                            </p>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-gray-500 text-center py-4">Belum ada transaksi POS</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>🚀 Quick Actions</CardTitle>
                        <CardDescription>
                            Aksi cepat untuk operasional harian
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link href="/bookings/create">
                                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                                    <div className="text-2xl mb-1">🏟️</div>
                                    <span className="text-sm">Booking Baru</span>
                                </Button>
                            </Link>
                            
                            <Link href="/pos">
                                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                                    <div className="text-2xl mb-1">🛍️</div>
                                    <span className="text-sm">POS Kafe</span>
                                </Button>
                            </Link>
                            
                            <Link href="/members">
                                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                                    <div className="text-2xl mb-1">👥</div>
                                    <span className="text-sm">Kelola Member</span>
                                </Button>
                            </Link>
                            
                            <Link href="/reports">
                                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                                    <div className="text-2xl mb-1">📊</div>
                                    <span className="text-sm">Laporan</span>
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}