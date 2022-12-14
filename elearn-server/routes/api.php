<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AssignmentController;

//Outside JWT token validation middleware
Route::post("/auth/register", [AuthController::class, "register"]);
Route::post("/auth/login", [AuthController::class, "login"]);

Route::group(['middleware' => ['jwt.verify'], 'prefix' => 'auth'], function($router) {

    //UserController
    Route::post("/user", [UserController::class, "getUserFromID"]);
    Route::get("/students", [UserController::class, "getStudents"]);
    Route::get("/instructors", [UserController::class, "getInstructors"]);
    Route::get("/instructorcourses", [UserController::class, "getInstructorCourses"]);
    Route::post("/studentcourses", [UserController::class, "getStudentCourses"]);
    Route::post("/assigncourse", [UserController::class, "assignCourseToInstructor"]);
    Route::post("/enroll", [UserController::class, "enroll"]);
    Route::post("/user/delete", [UserController::class, "delete"]);
    Route::post("/user/update", [UserController::class, "updateUser"]);

    //CourseController
    Route::get("/courses", [CourseController::class, "getCourses"]);
    Route::post("/enrolled", [CourseController::class, "getStudentsInCourse"]);
    Route::post("/addcourse", [CourseController::class, "addCourse"]);
    Route::post("/course/update", [CourseController::class, "updateCourse"]);

    //AnnouncementController
    Route::post("/announcement", [AnnouncementController::class, "addAnnouncement"]);
    Route::post("/announcements", [AnnouncementController::class, "getAnnouncements"]);

    //AssignmentController
    Route::post("/assignment", [AssignmentController::class, "addAssignment"]);
    Route::post("/assignments", [AssignmentController::class, "getAssignments"]);
    Route::post("/submit", [AssignmentController::class, "submitAssignment"]);
    Route::post("/check", [AssignmentController::class, "findStudentSubmission"]);
    

    Route::post("/me", [AuthController::class, "me"]);
});



