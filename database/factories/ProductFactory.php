<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        return [
            'name' => $this->faker->foodName(),
            'description' => fake()->realText($maxNbChars = 200, $indexSize = 2),
            'price' => fake()->numberBetween($min = 100, $max = 2000),
            'quantity' => fake()->numberBetween($min = 10, $max = 200),
            'discount' => fake()->numberBetween($min = 0, $max = 20),
            'image' => fake()->imageUrl($width = 640, $height = 480),
        ];
    }
}
