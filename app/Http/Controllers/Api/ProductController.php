<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(){
        $products = Product::select('id', 'name', 'price', 'discount', 'image')
        ->get();

        return response()->json([
            'status' => true,
            'message' => 'Product list',
            'payload' => [
                'products' => $products
            ]
        ]);
    }
}
