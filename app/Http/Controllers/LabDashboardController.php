<?php
namespace App\Http\Controllers;use App\Models\LabOrder;use Inertia\Inertia;
class LabDashboardController extends Controller{public function __invoke(){return Inertia::render('Hospital/Lab',['orders'=>LabOrder::with(['items.test','doctor','patient'])->latest()->limit(200)->get()]);}}
