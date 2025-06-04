<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    /**
     * Get a user by ID and return as JSON
     *
     * @param int $id User ID
     * @return JsonResponse
     */
    public function getUser(int $id): JsonResponse
    {
        // Find the user by ID
        $user = User::find($id);

        // If user not found, return 404 response
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        // Return user data as JSON (excluding hidden fields like password)
        return response()->json($user);
    }
} 