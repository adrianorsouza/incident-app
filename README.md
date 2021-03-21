INCIDENT APP
============

Simples RESTFul API e SPA _(Single Page Application)_ App para gerenciar incidentes 
desenvolvido com seguinte stack:

#### Frontend

Framework/Lib      | _
------------------ | ---------------
ReactJS            | UI Interfaces
Redux              | Data Store
React Router       | Routing
Material UI        | UI Framework
Formik             | Data Validation


#### Backend

Framework/Software | _
------------------ | ---------------
Laravel            | REST API
MySQL              | Storage

#### Infraestrutura

Plataforma         | _
------------------ | ---------------
Docker             | Containerized development workflow


## Instruções para teste/dev ambiente local

### Requisitos para executar este projeto localmente

- Git - https://git-scm.com
- Docker - https://www.docker.com

_Por questões de simplicidade, este projeto utiliza um simples Docker setup 
para execução em ambiente local/desenvolvimento **não recomendado para produção**._ 

## Setup Básico (Docker)

Clonar este projeto localmente:

    git clone git@github.com:adrianorsouza/incident-app.git


Start Docker Compose:
    
    cd incident-app

    docker-compose up -d

Após o start completo de todos os containers abra o browser e acesse o seguinte endereço: 

http://localhost:3000


## Backend Setup

Após start up dos containers o MySQL database estará pronto para receber conexões, no entanto, 
é necessário efetuar o _migration_ da tabela `incidents` para o funcionamento correto
do app, conforme detalhado a seguir.


### Database Migrations

Execute o comando artisan migration no `backend` container: 

    docker-compose exec api bash -c "php artisan migrate:install" 
    docker-compose exec api bash -c "php artisan migrate:status"
    docker-compose exec api bash -c "php artisan migrate"


### Database seed 'fake' data

O comando abaixo irá popular o database com dados fictícios de incidentes para melhor 
simular os testes com a interface do frontend:

    docker-compose exec api bash -c "php artisan db:incident -n 100"

Remover todos os registros na tabela `incidents`:

    docker-compose exec api bash -c "php artisan db:incident --wipe"


## API Docs 

Incident REST API Docs pode ser acessada via [Postman](https://www.postman.com) no seguinte endereço: 

https://documenter.getpostman.com/view/4934683/Tz5v3avj


### Unit Tests (Backend)
    
    docker-compose exec api bash -c "php artisan test"

```
PASS  Tests\Feature\IncidentControllerTest
✓ list incidents
✓ validation create new incident with empty data
✓ validation create incident with invalid data
✓ create incident
✓ casting result type
✓ show incident item
✓ show incident item not found
✓ update incident not found
✓ validation update item
✓ update incident
✓ delete incident item

Tests:  11 passed
Time:   1.28s
```

> _Por questões de simplicidade e praticidade frontend não possui unit possui testes_


### Data Structure / Validation

Não foi considerado alguma regra de negócio para validação de dados, no entanto, 
user input possuí o mínimo necessário para validação dos dados.

Column       | Type       | Max Length          | Default  | Required | Obs
-------------|------------|---------------------| -------- | -------- | -----
title        | varchar    | 255                 | NULL     | Sim      | --
description  | text       | 500                 | NULL     | Sim      | (suporta ate 4096 bytes).
level        | varchar    | 10                  | NULL     | Sim      | high, medium, low
type         | varchar    | 10                  | NULL     | Sim      | alarm, incident, others.
status       | tinyint    | 1                   | 1        | Sim      | 0, 1.


## Author

[**Adriano Rosa**](https://adrianorosa.com)

## Licence

Copyright © 2021, Adriano Rosa  <info@adrianorosa.com>  
All rights reserved.

For the full copyright and license information, please view the LICENSE
file that was distributed within the source root of this project.
