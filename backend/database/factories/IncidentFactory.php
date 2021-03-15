<?php

namespace Database\Factories;

use App\Models\Incident;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class IncidentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Incident::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->realText(40),
            'description' => $this->faker->text(200),
            'level' => head($this->faker->shuffle(['high', 'medium', 'low'])),
            'type' => head($this->faker->shuffle(['alarm', 'incident', 'others'])),
            'status' => head($this->faker->shuffle([0, 1])),
            //'created_at' => Carbon::now()->subDays(1)->subSeconds(10),
            'created_at' => $this->faker->dateTimeBetween(5),
        ];
    }
}
