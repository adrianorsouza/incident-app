<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Incident extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        /**@var \App\Models\Incident $this*/
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'level' => $this->level,
            'type' => $this->type,
            'status' => $this->status,
            'created_at' => $this->created_at,
            '_links' => [
                'parent' => route('incident.index'),
                'self' => route('incident.show', ['incident' => $this->id])
            ]
        ];
    }
}
