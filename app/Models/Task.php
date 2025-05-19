<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use OwenIt\Auditing\Contracts\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
class Task extends Model implements Auditable
{
    use SoftDeletes;
    use \OwenIt\Auditing\Auditable;
    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = [
        'title',
        'assigned_to',
        'description',
        'deadline',
        'project_id',
        'option'
    ];
    protected $casts = [
        'option' => 'array', // Membuat 'option' menjadi array saat diakses
    ];
    
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function member()
    {
        return $this->belongsTo(User::class, 'assigned_to',);
    }
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = Str::uuid()->toString();
            }
        });
    }
}
