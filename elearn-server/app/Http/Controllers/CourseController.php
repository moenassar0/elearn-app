<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\User;

class CourseController extends Controller
{
    public function addCourse(Request $request)
    {
        if(!auth()->user()){
            return response()->json(["result" => 'not authurized']);
        }
        $course = new Course;
 
        $course->course_name = $request->course_name;
        $course->instructor = '';
        $course->course_description = $request->course_description;
        $course->course_code = $request->course_code;

        $course->save();
 
        return response()->json(["result" => "ok", 'course added:' => $course], 201);
    }

    public function getCurses(){
        $courses = Course::select('*')->get();

        foreach($courses as $course){
            if($course->instructor){
                $instructor = User::where('_id', $course->instructor)->where('user_type', 'Instructor')->first();
                $course->instructor = $instructor;
            }
        }
        return response()->json(['courses' => $courses], 201);
    }

    public function getStudentsInCourse(Request $request){
        $course_id = $request->course_id;
        if(!isset($course_id))
            return response()->json(['students' => ''], 400);
        $students = [];
        $allStudents = User::where('user_type', 'Student')->get();

        for($i = 0; $i < count($allStudents); $i++){
            if(in_array($course_id, $allStudents[$i]->courses)){
                array_push($students, $allStudents[$i]);
            }
        }
        return response()->json(['students' => $students], 201);
    }
}
