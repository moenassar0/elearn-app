<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Announcement;

class AnnouncementController extends Controller
{
    public function addAnnouncement(Request $request){
        $announcement = new Announcement;
        $announcement->announcement_description = $request->announcement_description;
        $announcement->course_id = $request->course_id;
        $announcement->save();

        return response()->json(["announcement" => $announcement], 201);
    }

    public function getAnnouncements(Request $request){
        $course_id = $request->course_id;
        $announcements = Announcement::where('course_id', $course_id)->get();

        return response()->json(["announcements" => $announcements], 201);
    }
}
