<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('order_id')
            ->constrained('orders')
            ->onUpdate('cascade')
            ->restrictOnDelete();
            
            $table->foreignId('product_id')
            ->constrained('products')
            ->onUpdate('cascade')
            ->restrictOnDelete();

            $table->string('product_name');
            $table->string('product_price');
            $table->string('product_discount')->default(0);
            $table->string('product_quantity');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_details');
    }
};
