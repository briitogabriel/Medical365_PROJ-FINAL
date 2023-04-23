# 365_MANAGER

- ## Sobre

O projeto **365_MANAGER** consiste em uma API para gerenciar os atendimentos de médicos, pacientes e enfermeiros, além do cadastro dos mesmos em banco de dados.

De maneira automatizada, é possível acessar rotas via URL para as funções de cadastrar, atualizar, deletar ou consultar os registros cadastrados em seu sistema através de qualquer serviço client como Isomnia, Postman ou outros.

Vídeo com instruções de utilização disponível em: xxxxxxxxxxxx

- ## Tecnologias

A API foi elaborada utilizando NodeJS/ExpressJS em suas rotas. Os registros são armazenados no PostgreSQL usando o ORM Sequelize. Sua arquitetura MVC (Model View Controller) permite fácil uso e identificação do código.

- ## Instalando recursos

Requisitos iniciais: possuir o NodeJS, GIT e um banco PostgreSQL instalados no computador;

Inicie o versionamento GIT em um diretório local:
```bash
git init
```

Clone o repositório Github:
```bash
git clone https://github.com/briitogabriel/Medical365_PROJ-FINAL.git
cd Medical365_PROJ-FINAL
```

Instale as dependências de execução:
```bash
npm install
```
Ao clonar o repositório, identifique e renomeie o arquivo ".env-sample" para ".env", preenchendo os campos do arquivo com as variáveis de ambiente locais para acessar o seu banco de dados (previamente criado no PostgreSQL) e levantar o servidor local

Agora então, inicie seu servidor com o script abaixo (já configurado no package.json):
```bash
npm start
```

O console deve exibir a mensagem "App listenig on PORT 3333" indicando que o servidor está online.

 - ## Acessando API localmente (rotas)

Utilizando seu sistema "API Client" de preferência, acesse as rotas abaixo para realizar as tarefas a partir da raiz do servidor "localhost:3333/"

- **(POST)/api/patients**  => Cadastro de pacientes, envio de dados via body (JSON)
```bash 
  body example:
  {
	"full_name": "Maria Roberto", (STRING - não nulo)
	"gender": "F", (opções[M/F])
	"date_of_birth": "2001-12-02", (DATE YYYY-MM-DD - não nulo)
	"cpf": "547896325-10",	(STRING - não nulo)
	"phone_number": "(48)98888-7777", (STRING)
	"emergency_contact": "Fernando Roberto", (STRING - não nulo)
	"allergies": "Alérgica a tudo", (STRING)
	"special_cares": "Remédio anti alérgico", (STRING)
	"health_insurance": "Unimed" (STRING)
}
```

- **(PUT)/api/patients/:id**  => Atualizar dados de pacientes, envio de dados via body (JSON) e ID do paciente via route params
```bash 
  body example:
  {
	"full_name": "Maria Roberto Filho", (STRING - não nulo)
	"gender": "F", (opções[M/F])
	"date_of_birth": "2001-12-02", (DATE YYYY-MM-DD - não nulo)
	"cpf": "547896325-10",	(STRING - não nulo)
	"phone_number": "(48)98888-7654", (STRING)
	"emergency_contact": "Fernando Roberto", (STRING - não nulo)
	"allergies": "Alérgica a nada", (STRING)
	"special_cares": null, (STRING)
	"health_insurance": "Unimed" (STRING)
}
```

- **(PATCH)/api/patients/:id/status**  => Atualizar status do paciente, envio de dados via body (JSON) e ID do paciente via route params
```bash 
  body example:
  {
	"service_status": "NÃO ATENDIDO" (LISTA)
}
	
service_status options: ['AGUARDANDO ATENDIMENTO', 'EM ATENDIMENTO', 'NÃO ATENDIDO']
```

- **(GET)/api/patients?status=STATUSQUERY**  => Listar pacientes, **opcionalmente** passando query params (?status=STATUSQUERY) para filtrar os pacientes por status de atendimento
```bash 
  NO BODY

  query params options: ['AGUARDANDO_ATENDIMENTO', 'EM_ATENDIMENTO', 'ATENDIDO', 'NAO_ATENDIDO']
```

- **(GET)/api/patients/:id**  => Encontrar paciente pelo ID, envio de dados via route params
```bash 
  NO BODY
```

- **(DELETE)/api/patients/:id**  => Deletar paciente pelo ID, envio de dados via route params
```bash 
  NO BODY
```

- **(POST)/api/doctors**  => Cadastro de médicos, envio de dados via body (JSON)
```bash 
  body example:
  {
	"full_name": "Luiz Almeida", (STRING - não nulo)
	"gender": "M", (opções[M/F])
	"date_of_birth": "1980-01-01", (DATE YYYY-MM-DD - não nulo)
	"cpf": "123.456.789-00", (STRING - não nulo)
	"phone_number": "(11) 99999-9999", (STRING)
	"formation_institution": "UNIP", (STRING - não nulo)
	"crm_uf_registry": "12345/SP", (STRING - não nulo)
	"specialization": "Clínico Geral" (LISTA - não nulo)
}

specialization options: ['Clínico Geral', 'Anestesia', 'Dermatologia', 'Ginecologia', 'Neurologia', 'Pediatra', 'Psiquiatria', 'Ortopedia']
```

- **(PUT)/api/doctors/:id**  => Atualizar dados de médicos, envio de dados via body (JSON) e ID do médico via route params
```bash 
  body example:
  {
	"full_name": "Luiz Almeida", (STRING - não nulo)
	"gender": "M", (opções[M/F])
	"date_of_birth": "1980-01-01", (DATE YYYY-MM-DD - não nulo)
	"cpf": "12345678900", (STRING - não nulo)
	"phone_number": "(11) 88888-9999", (STRING)
	"formation_institution": "UFSC", (STRING - não nulo)
	"crm_uf_registry": "12345/SP", (STRING - não nulo)
	"specialization": "Psiquiatria" (LISTA - não nulo)
}

specialization options: ['Clínico Geral', 'Anestesia', 'Dermatologia', 'Ginecologia', 'Neurologia', 'Pediatra', 'Psiquiatria', 'Ortopedia']
```

- **(PATCH)/api/doctors/:id/status**  => Atualizar status do médico no sistema, envio de dados via body (JSON) e ID do médico via route params
```bash 
  body example:
  {
	"system_status": "Ativo" (LISTA)
}
	
system_status options: ['Ativo', 'Inativo']
```

- **(GET)/api/doctors?status=STATUSQUERY**  => Listar médicos, **opcionalmente** passando query params (?status=STATUSQUERY) para filtrar os médicos por status no sistema
```bash 
  NO BODY

  query params options: ['ATIVO', 'INATIVO']
```

- **(GET)/api/doctors/:id**  => Encontrar médico pelo ID, envio de dados via route params
```bash 
  NO BODY
```

- **(DELETE)/api/doctors/:id**  => Deletar médico pelo ID, envio de dados via route params
```bash 
  NO BODY
```

- **(POST)/api/nurses**  => Cadastro de enfermeiros, envio de dados via body (JSON)
```bash 
  body example:
  {
	"full_name": "Luiz Almeida", (STRING - não nulo)
	"gender": "M", (opções[M/F])
	"date_of_birth": "1980-01-01", (DATE YYYY-MM-DD - não nulo)
	"cpf": "123.456.789-00", (STRING - não nulo)
	"phone_number": "(11) 99999-9999", (STRING)
	"formation_institution": "UNIP", (STRING - não nulo)
	"cofen_uf_registry": "12345/SP", (STRING - não nulo)
}
```

- **(PUT)/api/nurses/:id**  => Atualizar dados de médicos, envio de dados via body (JSON) e ID do médico via route params
```bash 
  body example:
  {
	"full_name": "Luiz Almeida", (STRING - não nulo)
	"gender": "M", (opções[M/F])
	"date_of_birth": "1980-01-01", (DATE YYYY-MM-DD - não nulo)
	"cpf": "123.456.789-00", (STRING - não nulo)
	"phone_number": "(11) 99999-9999", (STRING)
	"formation_institution": "UNIP", (STRING - não nulo)
	"cofen_uf_registry": "12345/SP", (STRING - não nulo)
}
```

- **(GET)/api/nurses**  => Listar todos enfermeiros
```bash 
  NO BODY
```

- **(GET)/api/nurses/:id**  => Encontrar enfermeiro pelo ID, envio de dados via route params
```bash 
  NO BODY
```

- **(DELETE)/api/nurses/:id**  => Deletar enfermeiro pelo ID, envio de dados via route params
```bash 
  NO BODY
```

- **(POST)/api/services**  => Cadastrar novo atendimento, relacionando médico e paciente que estão envolvidos, envio de dados via body (JSON)
- Necessário informar os IDs existentes de ambos os envolvidos.
- Ao concluir a requisição na rota, o status do paciente é automaticamente alterado para "ATENDIDO" e a contabilização do total de atendimentos de ambos é acrescida em +1.
```bash 
  {
	"doctor_id": 1,
	"patient_id": 4
}
```

- **(GET)/api/services**  => Listar todos atendimentos realizados e seus envolvidos
```bash 
  NO BODY
```