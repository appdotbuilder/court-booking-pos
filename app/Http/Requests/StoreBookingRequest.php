<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
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
            'user_id' => 'required|exists:users,id',
            'court_id' => 'required|exists:courts,id',
            'booking_date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
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
            'user_id.required' => 'Pilih member yang akan booking.',
            'user_id.exists' => 'Member tidak ditemukan.',
            'court_id.required' => 'Pilih lapangan yang akan dibooking.',
            'court_id.exists' => 'Lapangan tidak ditemukan.',
            'booking_date.required' => 'Tanggal booking harus diisi.',
            'booking_date.date' => 'Format tanggal tidak valid.',
            'booking_date.after_or_equal' => 'Tanggal booking tidak boleh masa lalu.',
            'start_time.required' => 'Waktu mulai harus diisi.',
            'start_time.date_format' => 'Format waktu mulai harus HH:MM.',
            'end_time.required' => 'Waktu selesai harus diisi.',
            'end_time.date_format' => 'Format waktu selesai harus HH:MM.',
            'end_time.after' => 'Waktu selesai harus lebih dari waktu mulai.',
            'notes.max' => 'Catatan maksimal 500 karakter.',
        ];
    }
}