<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;

class CourseController extends Controller
{
    public function getCurses(){
        $courses = Course::select('*')->get();
        return response()->json(['courses' => $courses], 201);
    }
}
