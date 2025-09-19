<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\PosTransactionItem
 *
 * @property int $id
 * @property int $pos_transaction_id
 * @property int $menu_item_id
 * @property int $quantity
 * @property float $unit_price
 * @property float $total_price
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\MenuItem $menuItem
 * @property-read \App\Models\PosTransaction $transaction
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransactionItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransactionItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransactionItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransactionItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransactionItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransactionItem whereMenuItemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransactionItem wherePosTransactionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransactionItem whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransactionItem whereTotalPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransactionItem whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PosTransactionItem whereUpdatedAt($value)
 * @method static \Database\Factories\PosTransactionItemFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class PosTransactionItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'pos_transaction_id',
        'menu_item_id',
        'quantity',
        'unit_price',
        'total_price',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantity' => 'integer',
        'unit_price' => 'decimal:2',
        'total_price' => 'decimal:2',
    ];

    /**
     * Get the transaction that owns this item.
     */
    public function transaction(): BelongsTo
    {
        return $this->belongsTo(PosTransaction::class, 'pos_transaction_id');
    }

    /**
     * Get the menu item for this transaction item.
     */
    public function menuItem(): BelongsTo
    {
        return $this->belongsTo(MenuItem::class);
    }
}