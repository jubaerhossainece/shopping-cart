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
});

