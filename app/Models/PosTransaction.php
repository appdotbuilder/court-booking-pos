<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\PosTransaction
 *
 * @property int $id
 * @property string $transaction_code
 * @property int|null $user_id
 * @property float $subtotal
 * @property float $tax
 * @property float $total_amount
 * @property string $payment_method
 * @property string $status
 * @property int $points_earned
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PosTransactionItem> $items
 * @property-read int|null $items_count
 * @property-read \App\Models\User|null $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransaction query()
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransaction whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransaction wherePaymentMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransaction wherePointsEarned($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransaction whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransaction whereSubtotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransaction whereTax($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransaction whereTotalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransaction whereTransactionCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransaction whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransaction whereUserId($value)
 * @method static \Database\Factories\PosTransactionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class PosTransaction extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'transaction_code',
        'user_id',
        'subtotal',
        'tax',
        'total_amount',
        'payment_method',
        'status',
        'points_earned',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'subtotal' => 'decimal:2',
        'tax' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'points_earned' => 'integer',
    ];

    /**
     * Get the user associated with this transaction.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the items for this transaction.
     */
    public function items(): HasMany
    {
        return $this->hasMany(PosTransactionItem::class);
    }
}