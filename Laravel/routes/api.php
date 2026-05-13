<?php

use App\Http\Controllers\CuentaController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

// Login público
Route::post('/login', [LoginController::class, 'login']);

Route::apiResource('cuentas', CuentaController::class);

Route::get('cuentas-resumen', [CuentaController::class, 'resumen']);

// Rutas protegidas
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [LoginController::class, 'logout']);


});