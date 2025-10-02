<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class StaffFactory extends Factory
{
    public function definition(): array
    {
        $roles = ['doctor','nurse','pharmacist','admin','lab','dentist','emergency','gynecology','inpatient','service'];

        return [
            'full_name' => $this->faker->name,
            'role' => $this->faker->randomElement($roles),
            'phone' => $this->faker->phoneNumber,
            'base_salary' => $this->faker->numberBetween(3000,10000),
        ];
    }
}
