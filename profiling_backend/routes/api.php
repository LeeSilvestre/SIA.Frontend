<?php

use App\Http\Controllers\StudentFamilyInfoController;
use App\Http\Controllers\StudentLoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentProfilingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//STUDENT PROFILE HANDLING
Route::post('/login', [StudentLoginController::class, 'authenticate']);
Route::get('student',[StudentProfilingController::class,'index']);
Route::get('student/{id}',[StudentProfilingController::class,'indexId']);
Route::post('student',[StudentProfilingController::class,'upload']);
Route::put('student/edit/{id}',[StudentProfilingController::class,'edit']);
Route::delete('student/edit/{id}',[StudentProfilingController::class,'delete']);

//STUDENT FAMILYINFO
Route::get('studentfamily',[StudentFamilyInfoController::class,'getFamilyInfo']);
Route::post('studentfamily',[StudentFamilyInfoController::class,'storeFamilyInfo']);
