<?php
namespace App\Http\Controllers;
use App\Models\{Patient,PatientDocument};use Illuminate\Http\Request;use Illuminate\Support\Facades\{Auth,Storage};
class PatientDocumentController extends Controller{
 public function store(Request $r,Patient $patient){$d=$r->validate(['title'=>'required|string|max:255','category'=>'required|in:lab,prescription,imaging,identity,discharge,other','file'=>'required|file|mimes:pdf,jpg,jpeg,png,webp|max:10240']);$file=$r->file('file');$path=$file->store("patients/{$patient->id}",'public');$patient->documents()->create(['title'=>$d['title'],'category'=>$d['category'],'path'=>$path,'mime_type'=>$file->getMimeType(),'size'=>$file->getSize(),'uploaded_by'=>Auth::id()]);return back()->with('success','سند بیمار ذخیره شد.');}
 public function destroy(PatientDocument $document){Storage::disk('public')->delete($document->path);$document->delete();return back();}
}
