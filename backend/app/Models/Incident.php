<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Incident Model.
 *
 * @property int id
 * @property string title
 * @property string description
 * @property string level
 * @property string type
 * @property string status
 * @property \Carbon\Carbon created_at
 * @property \Carbon\Carbon updated_at
 */
class Incident extends Model
{
    use HasFactory;

    /**
     * {@inheritdoc}
     */
    protected $fillable = [
        'title',
        'description',
        'level',
        'type',
        'status',
    ];
}
