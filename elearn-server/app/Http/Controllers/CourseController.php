<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;

class CourseController extends Controller
{
    public function addCourse(Request $request)
    {
        if(!auth()->user()){
            return response()->json(["result" => 'not authurized']);
        }
        $course = new Course;
 
        $course->course_name = $request->course_name;
        $course->course_description = $request->course_description;
        $course->course_code = $request->course_code;

        $course->save();
 
        return response()->json(["result" => "ok", 'course added:' => $course], 201);
    }

    public function getCurses(){
        $courses = Course::select('*')->get();
        return response()->json(['courses' => $courses], 201);
    }
}
