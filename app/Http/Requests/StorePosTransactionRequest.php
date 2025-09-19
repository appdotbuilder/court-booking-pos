<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePosTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'nullable|exists:users,id',
            'payment_method' => 'required|in:cash,qris',
            'items' => 'required|array|min:1',
            'items.*.menu_item_id' => 'required|exists:menu_items,id',
            'items.*.quantity' => 'required|integer|min:1|max:99',
            'notes' => 'nullable|string|max:500',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'user_id.exists' => 'Member tidak ditemukan.',
            'payment_method.required' => 'Metode pembayaran harus dipilih.',
            'payment_method.in' => 'Metode pembayaran harus Cash atau QRIS.',
            'items.required' => 'Minimal satu item harus dipilih.',
            'items.array' => 'Format item tidak valid.',
            'items.min' => 'Minimal satu item harus dipilih.',
            'items.*.menu_item_id.required' => 'Item menu harus dipilih.',
            'items.*.menu_item_id.exists' => 'Item menu tidak ditemukan.',
            'items.*.quantity.required' => 'Jumlah item harus diisi.',
            'items.*.quantity.integer' => 'Jumlah item harus berupa angka.',
            'items.*.quantity.min' => 'Jumlah item minimal 1.',
            'items.*.quantity.max' => 'Jumlah item maksimal 99.',
            'notes.max' => 'Catatan maksimal 500 karakter.',
        ];
    }
}