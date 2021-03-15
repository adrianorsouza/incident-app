<?php

namespace Tests\Feature;

use App\Models\Incident;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class IncidentControllerTest extends TestCase
{
    use WithFaker;

    public function test_list_incidents()
    {
        $response = $this->get(route('incident.index'));
        $response->assertStatus(200);
    }

    public function test_validation_create_new_incident_with_empty_data()
    {
        $payload = [];
        $response = $this->postJson(route('incident.store'), $payload);
        $response->assertStatus(422);

        $errors = $this->parseJsonResponse($response);

        $this->assertArrayHasKey('message', $errors);
        $this->assertArrayHasKey('errors', $errors);

        $this->assertArrayHasKey('title', $errors['errors']);
        $this->assertArrayHasKey('description', $errors['errors']);
        $this->assertArrayHasKey('description', $errors['errors']);
        $this->assertArrayHasKey('level', $errors['errors']);
        $this->assertArrayHasKey('type', $errors['errors']);
        $this->assertArrayHasKey('status', $errors['errors']);
    }

    public function test_validation_create_incident_with_invalid_data()
    {
        $payload = [
            'title' => $this->faker->realText(300), // INVALID LONG TEXT
            'description' => $this->faker->realText(700), // INVALID LONG TEXT
            'level' => 'FOO', // INVALID NOT ALLOWED
            'type' => 'BAR', // INVALID NOT ALLOWED
            'status' => 'BAZ', // INVALID NOT ALLOWED
        ];

        $response = $this->postJson(route('incident.store'), $payload);
        $response->assertStatus(422);

        $errors = $this->parseJsonResponse($response);

        // Validate title length
        $this->assertArrayHasKey('title', $errors['errors']);
        $this->assertEquals(trans('validation.max.string', ['attribute' => 'title', 'max' => 255]), $errors['errors']['title'][0]);

        // Validate description length
        $this->assertArrayHasKey('description', $errors['errors']);
        $this->assertEquals(trans('validation.max.string', ['attribute' => 'description', 'max' => 500]), $errors['errors']['description'][0]);

        // Validate level input format
        $this->assertArrayHasKey('level', $errors['errors']);
        $this->assertEquals(trans('validation.in', ['attribute' => 'level']), $errors['errors']['level'][0]);

        // Validate type input format
        $this->assertArrayHasKey('type', $errors['errors']);
        $this->assertEquals(trans('validation.in', ['attribute' => 'type']), $errors['errors']['type'][0]);

        // Validate status input format
        $this->assertArrayHasKey('status', $errors['errors']);
        $this->assertEquals(trans('validation.numeric', ['attribute' => 'status']), $errors['errors']['status'][0]);
    }

    /**
     * Test create new incident.
     */
    public function test_create_incident()
    {
        $payload = Incident::factory()->make([
            'level' => 'high',
            'type' => 'alarm',
            'status' => 1,
        ])->toArray();

        $response = $this->postJson(route('incident.store'), $payload);
        $response->assertStatus(201);

        $result = $this->parseJsonResponse($response);

        $this->assertArrayHasKey('data', $result);;
        $this->assertArrayHasKey('_links', $result['data']);
        $this->assertArrayHasKey('parent', $result['data']['_links']);
        $this->assertArrayHasKey('self', $result['data']['_links']);

        $this->assertEquals($payload['title'], $result['data']['title']);
        $this->assertEquals($payload['description'], $result['data']['description']);
        $this->assertEquals($payload['level'], $result['data']['level']);
        $this->assertEquals($payload['type'], $result['data']['type']);
        $this->assertEquals($payload['status'], $result['data']['status']);
        return $result['data'];
    }

    /**
     * @depends test_create_incident
     */
    public function test_casting_result_type($result)
    {
        $this->assertIsString($result['title']);
        $this->assertIsString($result['description']);
        $this->assertIsString($result['level']);
        $this->assertContains($result['level'], ['high', 'medium', 'low']);
        $this->assertIsString($result['type']);
        $this->assertContains($result['type'], ['alarm', 'incident', 'others']);
        $this->assertIsNumeric($result['status']);
    }

    /**
     * @depends test_create_incident
     */
    public function test_show_incident_item($payload)
    {
        $response = $this->get(route('incident.show', ['incident' => $payload['id']]));
        $response->assertStatus(200);

        $result = $this->parseJsonResponse($response);

        $this->assertArrayHasKey('data', $result);;
        $this->assertArrayHasKey('_links', $result['data']);
        $this->assertArrayHasKey('parent', $result['data']['_links']);
        $this->assertArrayHasKey('self', $result['data']['_links']);

        return $result['data'];
    }

    public function test_show_incident_item_not_found()
    {
        $response = $this->get(route('incident.show', ['incident' => 'INVALID_ID']));
        $response->assertStatus(404);
    }


    public function test_update_incident_not_found()
    {
        $response = $this->get(route('incident.update', ['incident' => 'INVALID_ID']));
        $response->assertStatus(404);
    }

    /**
     * @depends test_show_incident_item
     */
    public function test_validation_update_item($payload)
    {
        $response = $this->putJson(route('incident.update', ['incident' => $payload['id']]));
        $response->assertStatus(422);

        $errors = $this->parseJsonResponse($response);

        $this->assertArrayHasKey('message', $errors);
        $this->assertArrayHasKey('errors', $errors);

        $this->assertArrayHasKey('title', $errors['errors']);
        $this->assertArrayHasKey('description', $errors['errors']);
        $this->assertArrayHasKey('level', $errors['errors']);
        $this->assertArrayHasKey('type', $errors['errors']);
        $this->assertArrayHasKey('status', $errors['errors']);
    }

    /**
     * @depends test_show_incident_item
     */
    public function test_update_incident($payload)
    {
        // Overwrite the payload with the updated data
        $payload['title'] = 'PHPUnit title updated!';
        $payload['description'] = 'PHPUnit description updated!';
        $payload['level'] = 'low';
        $payload['type'] = 'others';
        $payload['status'] = 0;

        $response = $this->putJson(route('incident.update', ['incident' => $payload['id']]), $payload);
        $response->assertStatus(200);

        $result = $this->parseJsonResponse($response)['data'];

        $this->assertEquals($result['title'], $payload['title']);
        $this->assertEquals($result['description'], $payload['description']);
        $this->assertEquals($result['level'], $payload['level']);
        $this->assertEquals($result['type'], $payload['type']);
        $this->assertEquals($result['status'], $payload['status']);

        return $result;
    }

    /**
     * @depends  test_update_incident
     */
    public function test_delete_incident_item($payload)
    {
        $response = $this->delete(route('incident.destroy', ['incident' => $payload['id']]));
        $response->assertStatus(204);

        // Replay Request
        $response = $this->delete(route('incident.destroy', ['incident' => $payload['id']]));
        $response->assertStatus(205);
    }
}
