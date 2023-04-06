<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(){
        
        $user = auth('sanctum')->user();
        
        return response([
            'status' => true,
            'message' => 'Cart items',
            'payload' => [
                'cart_items' => $this->allCartItems($user)
            ]
        ]);
    }

    public function store(Request $request){
        $user = auth('sanctum')->user();
        
        $cart = Cart::where([
            'user_id' => $user->id,
            'product_id' => $request->id
        ])->first();

        if($cart){
            if($cart->product_quantity < $cart->product->quantity){
                $cart->increment('product_quantity');
            }
        }else{
            $cart_item = new Cart;
            $cart_item->user_id = $user->id;
            $cart_item->product_id = $request->id;
            $cart_item->product_name = $request->name;
            $cart_item->image = $request->image;
            $cart_item->product_price = $request->price;
            $cart_item->product_discount = $request->discount;
            $cart_item->product_quantity = 1;
            $cart_item->save();
        }

        return response([
            'status' => true,
            'message' => 'Product added to cart',
            'payload' => [
                'cart_items' => $this->allCartItems($user)
            ]
        ]);
    }

    public function increase($id){
        $user = auth('sanctum')->user();
        $cart = Cart::find($id);

        if ($cart && $cart->product_quantity < $cart->product->quantity) {
            $cart->increment('product_quantity');
        }

        return response([
            'status' => true,
            'message' => 'Item incremented ',
            'payload' => [
                'cart_items' => $this->allCartItems($user)
            ]
        ]);
    }

    public function reduce($id){
        $user = auth('sanctum')->user();
        $cart = Cart::find($id);

        if ($cart && $cart->product_quantity > 1) {
            $cart->decrement('product_quantity');
        }

        return response([
            'status' => true,
            'message' => 'Item reduced from cart',
            'payload' => [
                'cart_items' => $this->allCartItems($user)
            ]
        ]);
        
    }

    public function destroy($id){
        $cart_item = Cart::find($id);

        $user = auth('sanctum')->user();

        if($cart_item){
            $cart_item->delete();

            return response([
                'status' => true,
                'message' => 'Cart item removed from cart list',
                'payload' => [
                    'cart_items' => $this->allCartItems($user)
                ]
            ]);
        }
    }


    public function removeAll()
    {
        $user = auth('sanctum')->user();
        Cart::where('user_id', $user->id)->delete();

        return response([
            'status' => true,
            'message' => 'Removed all cart items',
            'payload' => [
                'cart_items' => $this->allCartItems($user)
            ]
        ]);
    }


    public function allCartItems($user){
        
        return $cart_items = $user->carts->map(function($item){
            return collect($item)->only(['id', 'user_id', 'product_name', 'image', 'product_price', 'product_discount', 'product_quantity']);
        });

    }
}
