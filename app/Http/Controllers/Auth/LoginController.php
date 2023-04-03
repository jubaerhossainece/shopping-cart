<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
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
 
          $token = $user->createToken('riseupToken')->plainTextToken;
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
}
