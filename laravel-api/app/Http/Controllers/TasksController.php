<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        return response()->json(
            $user->tasks()
                ->orderBy('is_favorite', 'desc')
                ->orderBy('due_date')
                ->paginate(10)
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:todo,in_progress,completed',
            'is_favorite' => 'sometimes|boolean'
        ]);

        return response()->json(
            Auth::user()->tasks()->create($validated),
            201
        );
    }

    public function show(Task $task)
    {
        // Basic ownership check instead of policy
        if ($task->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }
        
        return response()->json($task);
    }

    public function update(Request $request, Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|nullable|string',
            'due_date' => 'sometimes|nullable|date',
            'priority' => 'sometimes|in:low,medium,high',
            'status' => 'sometimes|in:todo,in_progress,completed',
            'is_favorite' => 'sometimes|boolean'
        ]);

        $task->update($validated);
        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $task->delete();
        return response()->json(null, 204);
    }

    public function toggleFavorite(Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $task->update(['is_favorite' => !$task->is_favorite]);
        return response()->json(['is_favorite' => $task->is_favorite]);
    }

    public function favorites()
    {
        return response()->json(
            Auth::user()->tasks()
                ->where('is_favorite', true)
                ->orderBy('due_date')
                ->get()
        );
    }
}