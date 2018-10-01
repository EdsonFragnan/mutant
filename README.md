# mutant

Aplicação rodando no Heroku.

# Testes Unitários + Coverage
- Observação - Para rodar os teste unitários, precisa subir uma instância do mongoDB
* Banco
- use mutante
* Collection
- db.createCollection('mutante');
* Comandos
- npm run coverage (Testes + Coverage)
- npm start (Rodar a Aplicação)
- npm test (Apenas o teste do MochaJs)

# Rotas

- https://app-mutant.herokuapp.com/stats - GET
- https://app-mutant.herokuapp.com/mutant - POST

* Resposta "Forbidden"
- Body
{
	"adn":["ATGCGA",
          "CAGTGC",
          "TTCCCT",
          "AGAAGG",
          "CCCCTA",
          "TCACTG"]
}
* Resposta "OK"
- Body
{
	"adn":["ATGCGA",
          "CAGTGC",
          "TTATGT",
          "AGAAGG",
          "CCCCTA",
          "TCACTG"]
}


