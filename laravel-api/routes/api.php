<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\TasksController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    // Basic CRUD routes
    Route::get('/tasks', [TasksController::class, 'index']);
    Route::post('/tasks', [TasksController::class, 'store']);
    Route::get('/tasks/{task}', [TasksController::class, 'show']);
    Route::put('/tasks/{task}', [TasksController::class, 'update']);
    Route::delete('/tasks/{task}', [TasksController::class, 'destroy']);
    
    // Custom routes
    Route::patch('/tasks/{task}/favorite', [TasksController::class, 'toggleFavorite']);
    Route::get('/tasks/favorites', [TasksController::class, 'favorites']);

    // User routes
    Route::get('/users/{id}', [UserController::class, 'getUser']);
});
