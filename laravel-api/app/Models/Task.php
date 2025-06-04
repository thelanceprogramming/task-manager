<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tasks';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'due_date',
        'priority',
        'status',
        'is_favorite',
        'user_id'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'due_date' => 'date',
        'is_favorite' => 'boolean',
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'due_date',
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    /**
     * Priority values with their labels
     */
    public const PRIORITIES = [
        'low' => 'Low',
        'medium' => 'Medium',
        'high' => 'High'
    ];

    /**
     * Status values with their labels
     */
    public const STATUSES = [
        'todo' => 'To Do',
        'in_progress' => 'In Progress',
        'completed' => 'Completed'
    ];

    /**
     * Relationship to the user who owns the task
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope for favorite tasks
     */
    public function scopeFavorite($query)
    {
        return $query->where('is_favorite', true);
    }

    /**
     * Scope for tasks due today
     */
    public function scopeDueToday($query)
    {
        return $query->whereDate('due_date', today());
    }

    /**
     * Get the priority label
     */
    public function getPriorityLabelAttribute()
    {
        return self::PRIORITIES[$this->priority] ?? $this->priority;
    }

    /**
     * Get the status label
     */
    public function getStatusLabelAttribute()
    {
        return self::STATUSES[$this->status] ?? $this->status;
    }

    /**
     * Check if task is overdue
     */
    public function getIsOverdueAttribute()
    {
        return $this->due_date && $this->due_date->isPast() 
               && $this->status !== 'completed';
    }
}