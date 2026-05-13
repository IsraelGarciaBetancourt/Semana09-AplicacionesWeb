<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Exception;

class AuthService
{
    /**
     * Procesa el login verificando documento, cuenta y contraseña.
     */
    public function login(array $datos)
    {
        // Buscamos al usuario por su documento y que posea la cuenta especificada
        $user = User::where('tipo_documento', $datos['tipo_documento'])
            ->where('num_documento', $datos['num_documento'])
            ->whereHas('cuentas', function ($query) use ($datos) {
                $query->where('tipo_cuenta', $datos['tipo_cuenta'])
                      ->where('num_cuenta', $datos['num_cuenta']);
            })
            ->first();

        // Verificamos si existe el usuario y si la contraseña coincide
        if (! $user || ! Hash::check($datos['password'], $user->password)) {
            throw new Exception('Los datos ingresados son incorrectos o la cuenta no existe.');
        }

        // Generamos el token de Sanctum
        $token = $user->createToken('banco_api_token')->plainTextToken;

        // Retornamos la data que el controlador enviará en el JSON
        return [
            'user' => [
                'id'             => $user->id,
                'name'           => $user->name,
                'tipo_documento' => $user->tipo_documento,
                'num_documento'  => $user->num_documento,
            ],
            'token' => $token
        ];
    }

    /**
     * Revoca el token del usuario logueado
     */
    public function logout($user)
    {
        if ($user) {
            $user->currentAccessToken()->delete();
        }
    }
}