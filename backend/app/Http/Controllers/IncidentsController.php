<?php

namespace App\Http\Controllers;

use App\Http\Requests\IncidentRequest;
use App\Http\Resources\Incident as IncidentResource;
use App\Http\Resources\IncidentCollection;
use App\Models\Incident;

class IncidentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \App\Http\Resources\IncidentCollection
     */
    public function index()
    {
        $resource = Incident::latest()->get();

        return new IncidentCollection($resource);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\IncidentRequest $request
     *
     * @return \App\Http\Resources\Incident
     */
    public function store(IncidentRequest $request)
    {
        $data = $request->only(['title', 'description', 'level', 'type', 'status']);

        $resource = Incident::create($data);

        return (new IncidentResource($resource));
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return \App\Http\Resources\Incident
     */
    public function show($id)
    {
        $resource = Incident::find((int)$id);

        if (!$resource) {
            abort(404, 'Resource not found.');
        }

        return (new IncidentResource($resource));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\IncidentRequest $request
     * @param int $id
     *
     * @return \App\Http\Resources\Incident
     */
    public function update(IncidentRequest $request, $id)
    {
        $resource = Incident::find((int)$id);

        if (!$resource) {
            abort(404, 'Resource not found.');
        }

        $data = $request->only(['title', 'description', 'level', 'type', 'status']);

        $resource->title = $data['title'];
        $resource->description = $data['description'];
        $resource->level = $data['level'];
        $resource->type = $data['type'];
        $resource->status = (int)$data['status'];
        $resource->save();

        return new IncidentResource($resource);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $resource = Incident::find((int)$id);
        // Already deleted or not found?
        if (!$resource) {
            // Reset Content
            return response(null, 205);
        }

        // Destroy the resource
        $resource->delete();

        // No Content
        return response(null, 204);
    }
}
