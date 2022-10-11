<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Auth;
use Validator;

class AuthController extends Controller
{
    public function register(Request $request){

        //Validate user credentials 
        $validator = Validator::make($request->all(),[
            'f_name' => 'required',
            'l_name' => 'required',
            'email' => 'required',
            'user_type' => 'required',
            'password' => 'required'
        ]);

        if($validator->fails())
            return response()->json($validator->errors()->toJson(), 400);

        $user = User::create(array_merge($validator->validated(), ['courses' => []],['password' => bcrypt($request->password)]));
    
        return response()->json(["result" => "ok", 'user added:' => $user], 201);
    }

    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json(['user' => auth()->user(), 'token' => $this->respondWithToken($token)]);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

}
