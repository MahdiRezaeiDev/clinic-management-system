<?php
namespace Database\Seeders;
use App\Models\{Bed,LabTest,Room,Ward};
use Illuminate\Database\Seeder;
class HospitalCoreSeeder extends Seeder
{
    public function run():void
    {
        foreach ([['CBC','شمارش کامل خون','Hematology','',500],['FBS','قند خون ناشتا','Biochemistry','mg/dL',300],['UA','آزمایش ادرار','Urinalysis','',350],['HB','هموگلوبین','Hematology','g/dL',250]] as [$code,$name,$category,$unit,$price]) LabTest::updateOrCreate(compact('code'),compact('name','category','unit','price'));
        foreach ([['عمومی','general'],['نسایی ولادی','maternity'],['اطفال','pediatric']] as [$name,$type]) {
            $ward=Ward::updateOrCreate(compact('name'),compact('type'));
            for($r=1;$r<=2;$r++){$room=Room::updateOrCreate(['ward_id'=>$ward->id,'number'=>(string)$r],['type'=>'standard']);for($b=1;$b<=3;$b++)Bed::updateOrCreate(['room_id'=>$room->id,'number'=>(string)$b],['daily_rate'=>1000]);}
        }
    }
}
