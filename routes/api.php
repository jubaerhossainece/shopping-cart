<?php

use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => '/v1', 'middleware' => 'auth:sanctum'],function(){
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/cart-items', [CartController::class, 'index']);
    Route::post('/cart-item', [CartController::class, 'store']);
    Route::post('/cart-item/{id}/increase', [CartController::class, 'increase']);
    Route::post('/cart-item/{id}/reduce', [CartController::class, 'reduce']);
    Route::delete('/cart-item/{id}/delete', [CartController::class, 'destroy']);
    Route::delete('/cart-item/remove-all', [CartController::class, 'removeAll']);
});

