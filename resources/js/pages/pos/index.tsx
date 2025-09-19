import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    is_available: boolean;
}

interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
}

interface Props {
    menuItems: {
        drinks?: MenuItem[];
        snacks?: MenuItem[];
        meals?: MenuItem[];
    };
    users: User[];
    [key: string]: unknown;
}

interface CartItem extends MenuItem {
    quantity: number;
}

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'POS Kafe', href: '/pos' }
];

export default function PosIndex({ menuItems, users }: Props) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string>('cash');
    const [notes, setNotes] = useState<string>('');

    const addToCart = (item: MenuItem) => {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
            setCart(cart.map(cartItem => 
                cartItem.id === item.id 
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (itemId: number) => {
        setCart(cart.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId: number, quantity: number) => {
        if (quantity === 0) {
            removeFromCart(itemId);
        } else {
            setCart(cart.map(item => 
                item.id === itemId ? { ...item, quantity } : item
            ));
        }
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const handleSubmit = () => {
        if (cart.length === 0) {
            alert('Keranjang kosong!');
            return;
        }

        const data = {
            user_id: selectedUser || null,
            payment_method: paymentMethod,
            items: cart.map(item => ({
                menu_item_id: item.id,
                quantity: item.quantity
            })),
            notes: notes || null
        };

        router.post('/pos', data);
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'drinks': return '🥤';
            case 'snacks': return '🍿';
            case 'meals': return '🍽️';
            default: return '📦';
        }
    };

    const getCategoryName = (category: string) => {
        switch (category) {
            case 'drinks': return 'Minuman';
            case 'snacks': return 'Snack';
            case 'meals': return 'Makanan';
            default: return category;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="POS Kafe - SportBook" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Menu Items */}
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🛍️ POS Kafe</h1>
                        <p className="text-gray-600 mt-1">Sistem Point of Sale untuk kafe</p>
                    </div>

                    {Object.entries(menuItems).map(([category, items]) => (
                        <Card key={category}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    {getCategoryIcon(category)} {getCategoryName(category)}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {items?.filter(item => item.is_available).map(item => (
                                        <div key={item.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                                                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                                    <p className="text-lg font-bold text-primary mt-2">
                                                        {formatCurrency(item.price)}
                                                    </p>
                                                </div>
                                                <Button
                                                    onClick={() => addToCart(item)}
                                                    size="sm"
                                                    className="ml-4"
                                                >
                                                    ➕
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Cart & Checkout */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>🛒 Keranjang</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {cart.length === 0 ? (
                                <div className="text-center text-gray-500 py-8">
                                    <div className="text-4xl mb-2">🛒</div>
                                    <p>Keranjang kosong</p>
                                </div>
                            ) : (
                                <>
                                    {cart.map(item => (
                                        <div key={item.id} className="flex justify-between items-center py-2 border-b">
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">{item.name}</p>
                                                <p className="text-sm text-gray-600">
                                                    {formatCurrency(item.price)} x {item.quantity}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs"
                                                >
                                                    −
                                                </button>
                                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs"
                                                >
                                                    +
                                                </button>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="ml-2 text-red-500 text-xs"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="space-y-2 pt-4">
                                        <div className="flex justify-between text-sm">
                                            <span>Subtotal:</span>
                                            <span>{formatCurrency(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Pajak (10%):</span>
                                            <span>{formatCurrency(tax)}</span>
                                        </div>
                                        <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                            <span>Total:</span>
                                            <span className="text-primary">{formatCurrency(total)}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {cart.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>💳 Checkout</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Member (Opsional)
                                    </label>
                                    <select
                                        value={selectedUser}
                                        onChange={(e) => setSelectedUser(e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2"
                                    >
                                        <option value="">Guest</option>
                                        {users.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user.name} - {user.phone}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Metode Pembayaran
                                    </label>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="cash"
                                                checked={paymentMethod === 'cash'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="mr-2"
                                            />
                                            💵 Tunai (Cash)
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="qris"
                                                checked={paymentMethod === 'qris'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="mr-2"
                                            />
                                            📱 QRIS
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Catatan (Opsional)
                                    </label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2"
                                        rows={2}
                                        placeholder="Catatan untuk pesanan..."
                                    />
                                </div>

                                <Button
                                    onClick={handleSubmit}
                                    className="w-full bg-primary hover:bg-primary/90"
                                    size="lg"
                                >
                                    🧾 Proses Pembayaran
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}