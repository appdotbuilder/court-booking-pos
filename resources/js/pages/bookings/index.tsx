import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Booking {
    id: number;
    user: { name: string; email: string };
    court: { name: string; type: string };
    booking_date: string;
    start_time: string;
    end_time: string;
    total_price: number;
    status: string;
    notes?: string;
}

interface Props {
    bookings: {
        data: Booking[];
        links?: { url: string | null; label: string; active: boolean }[];
    };
    filters: {
        date?: string;
        court_type?: string;
    };
    courtTypes: string[];
    [key: string]: unknown;
}

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Booking', href: '/bookings' }
];

export default function BookingsIndex({ bookings, filters, courtTypes }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusBadge = (status: string) => {
        const statusClasses = {
            confirmed: 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        
        return `px-2 py-1 rounded-full text-xs ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Booking - SportBook" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🏟️ Daftar Booking</h1>
                        <p className="text-gray-600 mt-1">Kelola semua booking lapangan</p>
                    </div>
                    
                    <Link href="/bookings/create">
                        <Button className="bg-primary hover:bg-primary/90">
                            ➕ Booking Baru
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>🔍 Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                                <input
                                    type="date"
                                    defaultValue={filters.date || ''}
                                    onChange={(e) => router.get('/bookings', { ...filters, date: e.target.value })}
                                    className="border rounded-lg px-3 py-2"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Lapangan</label>
                                <select
                                    defaultValue={filters.court_type || ''}
                                    onChange={(e) => router.get('/bookings', { ...filters, court_type: e.target.value })}
                                    className="border rounded-lg px-3 py-2"
                                >
                                    <option value="">Semua Lapangan</option>
                                    {courtTypes.map(type => (
                                        <option key={type} value={type}>
                                            {type === 'padel' ? '🏓 Padel' : '🏸 Badminton'}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Bookings List */}
                <div className="space-y-4">
                    {bookings.data.length > 0 ? bookings.data.map((booking) => (
                        <Card key={booking.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold">{booking.user.name}</h3>
                                                <p className="text-sm text-gray-600">{booking.user.email}</p>
                                            </div>
                                            
                                            <div className="text-2xl">
                                                {booking.court.type === 'padel' ? '🏓' : '🏸'}
                                            </div>
                                            
                                            <div>
                                                <p className="font-medium">{booking.court.name}</p>
                                                <p className="text-sm text-gray-600">
                                                    {new Date(booking.booking_date).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-500">Waktu</p>
                                                <p className="font-medium">
                                                    {booking.start_time} - {booking.end_time}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Total Harga</p>
                                                <p className="font-medium text-green-600">
                                                    {formatCurrency(booking.total_price)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Status</p>
                                                <span className={getStatusBadge(booking.status)}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {booking.notes && (
                                            <div className="mt-3">
                                                <p className="text-gray-500 text-sm">Catatan:</p>
                                                <p className="text-sm">{booking.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="flex flex-col space-y-2">
                                        <Link href={`/bookings/${booking.id}`}>
                                            <Button variant="outline" size="sm">
                                                👁️ Detail
                                            </Button>
                                        </Link>
                                        <Link href={`/bookings/${booking.id}/edit`}>
                                            <Button variant="outline" size="sm">
                                                ✏️ Edit
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )) : (
                        <Card>
                            <CardContent className="p-8 text-center">
                                <div className="text-4xl mb-4">🏟️</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada booking</h3>
                                <p className="text-gray-600 mb-4">
                                    Mulai dengan membuat booking pertama
                                </p>
                                <Link href="/bookings/create">
                                    <Button>
                                        ➕ Buat Booking Baru
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Pagination */}
                {bookings.links && bookings.links.length > 3 && (
                    <div className="flex justify-center space-x-2">
                        {bookings.links.map((link, index: number) => (
                            <button
                                key={index}
                                onClick={() => link.url && router.get(link.url)}
                                disabled={!link.url}
                                className={`px-3 py-2 rounded-lg ${
                                    link.active
                                        ? 'bg-primary text-white'
                                        : link.url
                                        ? 'border border-gray-300 hover:bg-gray-50'
                                        : 'text-gray-400'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}