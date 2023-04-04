<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|min:4',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:4'
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $result = $user->save();

        if($result){
            $token = $user->createToken('riseupToken')->plainTextToken;
            $response = [
                'user' => $user,
                'token' => $token
            ];

            return response([
                'status' => true,
                'message' => 'You have successfully registered.',
                'payload' => $response
            ]);
        }else{
            return response([
                'status' => false,
                'message' => 'registration failed.'
            ], 422);
        }
    }


    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:4'
        ]);

        $user = User::where([
            'email' => $request->email,
        ])->first();

        if(!$user || !Hash::check($request->password, $user->password)){
            return response([
                'status' => false,
                'message' => 'Credentials did not match!'
            ], 401);
         }
 
        $token = $user->createToken(Str::random(20))->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token
        ];

         return response([
            'status' => true,
            'message' => 'Login successful!',
            'payload' => $response
        ], 200);
    }


    public function authentication(){
        
        if(auth('sanctum')->user()){
            return response([
                'status' => true
            ]);
        }else{
            return response([
                'status' => false
            ],422);
        }
    }


    public function logout(){
        
        auth('sanctum')->user()->tokens()->delete();

        return response([
            'message' => 'You are logged out now!',
            'status' => true
        ]);
    }
}
