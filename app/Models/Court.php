<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Court
 *
 * @property int $id
 * @property string $name
 * @property string $type
 * @property string|null $description
 * @property float $price_per_hour
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Booking> $bookings
 * @property-read int|null $bookings_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Court newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Court newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Court query()
 * @method static \Illuminate\Database\Eloquent\Builder|Court whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Court whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Court whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Court whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Court whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Court wherePricePerHour($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Court whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Court whereUpdatedAt($value)
 * @method static \Database\Factories\CourtFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Court extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'type',
        'description',
        'price_per_hour',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price_per_hour' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    /**
     * Get the bookings for this court.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Scope a query to only include active courts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}