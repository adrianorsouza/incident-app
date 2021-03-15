<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    /**
     * Helper method that parses JsonResponse into an array.
     *
     * @param $response
     *
     * @return mixed
     */
    protected function parseJsonResponse($response)
    {
        if ($response instanceof \Illuminate\Testing\TestResponse) {
            $response = $response->getContent();
        }
        return json_decode($response, true);
    }
}
