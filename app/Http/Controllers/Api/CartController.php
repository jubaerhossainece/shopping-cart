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

    public function store(Request $request){
        $user = auth('sanctum')->user();
        $cart_item = new Cart;
        $cart_item->user_id = $user->id;
        $cart_item->product_id = $request->id;
        $cart_item->product_name = $request->name;
        $cart_item->image = $request->image;
        $cart_item->product_price = $request->price;
        $cart_item->product_discount = $request->discount;
        $cart_item->product_quantity = 1;
        $cart_item->save();

        $cart_items = Cart::select('id', 'user_id', 'product_name', 'image', 'product_price', 'product_discount', 'product_quantity')->get();

        return response([
            'status' => true,
            'message' => 'Product added to cart',
            'payload' => [
                'cart_items' => $cart_items
            ]
        ]);
    }


    public function destroy($id){
        $cart_item = Cart::find($id);

        if($cart_item){
            $cart_item->delete();

            $cart_items = Cart::select('id', 'user_id', 'product_name', 'image', 'product_price', 'product_discount', 'product_quantity')->get();

            return response([
                'status' => true,
                'message' => 'Cart item removed from cart list',
                'payload' => [
                    'cart_items' => $cart_items
                ]
            ]);
        }
    }
}
