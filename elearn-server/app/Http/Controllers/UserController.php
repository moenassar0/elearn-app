<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Course;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $user = new User;
 
        $user->f_name = $request->f_name;
        $user->l_name = $request->l_name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->user_type = $request->user_type;

        $user->save();
 
        return response()->json(["result" => "ok", 'user added:' => $user], 201);
    }

    public function getStudents(){
        $users = User::where('user_type', 'Student')->get();
        return response()->json(['instructors' => $users], 201);
    }

    public function getInstructors(){
        $users = User::where('user_type', 'Instructor')->get();
        return response()->json(['instructors' => $users], 201);
    }

    public function getStudentCourses(Request $request){
        $user = User::where('_id', $request->_id)->first();

        return response()->json([$user->courses]);
    }

    public function assignCourseToInstructor(Request $request){
        $user = User::where('_id', $request->instructor_id)->first();
        //print_r($user);
        if($user->courses){
            $courses = $user->courses;
            array_push($courses, $request->course_id);
            $user->courses = $courses;
        }
        else{
            $courses = [];
            array_push($courses, $request->course_id);
            $user->courses = $courses;
        }

        $user->save();
        
        $course = Course::where('_id', $request->course_id)->first();
        $course->instructor = $request->instructor_id;
        $course->save();

        return response()->json([$user]);
    }

    public function getUserFromID(Request $request){
        $user = User::where('_id', $request->instructor_id)->first();
        return response()->json(['user' => $user]);
    }
}
