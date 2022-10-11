<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Assignment;

class AssignmentController extends Controller
{
    public function addAssignment(Request $request){
        $assignment = new Assignment;
        $assignment->assignment_description = $request->assignment_description;
        $assignment->date = $request->date;
        $assignment->course_id = $request->course_id;
        $assignment->save();

        return response()->json(["assignment" => $assignment], 201);
    }

    public function getAssignments(Request $request){
        $course_id = $request->course_id;
        $assignment = Assignment::where('course_id', $course_id)->get();

        return response()->json(["assignment" => $assignment], 201);
    }
}
