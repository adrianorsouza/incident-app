<?php

use App\Models\Incident;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

/*
 * Artisan command to seed fake data into the database
 *
 * @usage $ php artisan db:incident -n 100
 *
 * The command above will produce 100 lines inserted into the table.
 * */
Artisan::command('db:incident {n?} {--wipe}', function ($n = 20, $wipe = null){
    $table = (new Incident())->getTable();
    if ($wipe) {
        $count = DB::table('incidents')->delete();
        if ($count) {
            $this->info(sprintf('Removed %s rows from %s', $count, $table));
        } else {
            $this->info(sprintf('Table %s is empty', $table));
        }
    } else {
        $res = \App\Models\Incident::factory($n)->create();
        $this->info(sprintf("Populated ${n} items within %s table.", $table));
    }
});
