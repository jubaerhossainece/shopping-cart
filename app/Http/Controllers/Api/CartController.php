<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(){
        $cart_items = Cart::select('id', 'user_id', 'product_name', 'image', 'product_price', 'product_discount', 'product_quantity')->get();

        return response([
            'status' => true,
            'message' => 'Cart items',
            'payload' => [
                'cart_items' => $cart_items
            ]
        ]);
    }
}
