<?php

declare(strict_types=1);

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::prefix('/posts')->group(function () {
    Route::get('/', [PostController::class, 'getPosts']);
    Route::post('/', [PostController::class, 'createPost']);
    Route::get('/{id}', [PostController::class, 'getPost'])->whereUuid('id');
    Route::put('/{id}', [PostController::class, 'updatePost'])->whereUuid('id');
    Route::delete('/{id}', [PostController::class, 'deletePost']);
});
