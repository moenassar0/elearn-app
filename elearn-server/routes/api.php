<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\AnnouncementController;

Route::post("/add", [UserController::class, "store"]);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get("/courses", [CourseController::class, "getCurses"]);
Route::group(['middleware' => 'api', 'prefix' => 'auth'], function($router) {
    Route::post("/register", [AuthController::class, "register"]);
    Route::post("/login", [AuthController::class, "login"]);

    Route::get("/users", [UserController::class, "getStudents"]);
    Route::get("/instructors", [UserController::class, "getInstructors"]);
    Route::get("/instructorcourses", [UserController::class, "getInstructorCourses"]);

    Route::post("/enrolled", [CourseController::class, "getStudentsInCourse"]);
    Route::post("/addcourse", [CourseController::class, "addCourse"]);

    Route::post("/me", [AuthController::class, "me"]);
    Route::post("/studentcourses", [UserController::class, "getStudentCourses"]);
    Route::post("/assigncourse", [UserController::class, "assignCourseToInstructor"]);
    Route::post("/user", [UserController::class, "getUserFromID"]);
    
    //Enroll student
    Route::post("/enroll", [UserController::class, "enroll"]);

    //Announcements
    Route::post("/announcement", [AnnouncementController::class, "addAnnouncement"]);
    Route::post("/announcements", [AnnouncementController::class, "getAnnouncements"]);
});



