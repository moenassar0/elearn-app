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

    public function submitAssignment(Request $request){
        $assignment_id = $request->assignment_id;
        $assignment = Assignment::where('_id', $assignment_id)->first();
        $student_id = auth()->user()->id;
        $submission = $request->submission;

        $newObject = (object)array('student_id' => $student_id, 'submission' => $submission);

        if($assignment->submissions){
            $submissions = $assignment->submissions;
            array_push($submissions, $newObject);
            $assignment->submissions = $submissions;
        }
        else{
            $submissions = $newObject;
            $assignment->submissions = $submissions;
        }

        $assignment->save();
        return response()->json(["assignment" => $assignment], 201);
    }

    public function findStudentSubmission(Request $request){
        $assignment_id = $request->assignment_id;
        $assignment = Assignment::where('_id', $assignment_id)->first();
        $objs = $assignment->submissions;
        foreach ($objs as $obj) {
            foreach($obj as $final){
                if($final == $request->student_id){
                    return response()->json([true], 201);
                }
            }
        }
    }
}
