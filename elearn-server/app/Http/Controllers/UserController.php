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
            if(!in_array($request->course_id, $courses)){
                array_push($courses, $request->course_id);
                $user->courses = $courses;
            }
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

    public function getInstructorCourses(){
        $id = auth()->user()->id;
        $user = User::where('_id', $id)->first();

        //Using courseID fetch the course data from the course table
        if($user->courses){
            $courses = $user->courses;
            for($i = 0; $i < count($courses); $i++){
                $course = Course::where('_id', $courses[$i])->first();
                $courses[$i] = $course;
            }
            return response()->json(['courses' => $courses]);
        }
        return response()->json(['courses' => 'empty']);
    }

    public function enroll(Request $request){
        $student_id = $request->student_id;
        $course_id = $request->course_id;

        $user = User::where('_id', $student_id)->first();
        if($user->courses){
            $courses = $user->courses;
            if(!in_array($course_id, $courses)){
                array_push($courses, $course_id);
                $user->courses = $courses;
            }
        }
        else{
            $courses = [];
            array_push($courses, $course_id);
            $user->courses = $courses;
        }

        $user->save();
        
        return response()->json(['user' => $user]);
    }
}
