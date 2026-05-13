<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(Request $request)
    {
        $datos = $request->validate([
            'tipo_cuenta'    => 'required|string',
            'num_cuenta'     => 'required|string',
            'tipo_documento' => 'required|string',
            'num_documento'  => 'required|string',
            'password'       => 'required|string',
        ]);

        try {
            // Delegamos la lógica de negocio al servicio
            $resultado = $this->authService->login($datos);
            
            return response()->json([
                'success' => true, 
                'message' => 'Login exitoso',
                'data'    => $resultado
            ], 200);

        } catch (\Exception $e) {
            // Retornamos el error con la misma estructura que usas en CuentaController
            return response()->json([
                'success' => false, 
                'message' => $e->getMessage()
            ], 401);
        }
    }

    public function logout(Request $request)
    {
        try {
            $this->authService->logout($request->user());
            
            return response()->json([
                'success' => true, 
                'message' => 'Sesión cerrada correctamente'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false, 
                'message' => 'Ocurrió un error al cerrar la sesión'
            ], 400);
        }
    }
}