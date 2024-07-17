# Jogo da Velha com Torneio em Node.js

Este é um jogo da velha que foi desenvolvido para o curso de Tecnologia em sistemas para internet, que suporta um torneio com até 12 jogadores. Os jogadores são registrados, competem em partidas, e são eliminados quando perdem. O vencedor é determinado após vários rounds de competição.

## Funcionalidades

- Registro de até 12 jogadores.
- Armazenamento e recuperação dos nomes dos jogadores de jogos anteriores.
- Organização de torneios com partidas entre jogadores da mesma categoria.
- Atualização de categorias dos jogadores após cada partida.
- Eliminação de jogadores quando perdem.
- Visualização do tabuleiro de jogo e controle de jogadas.
- Verificação automática de vitórias e empates.

## Estrutura do Projeto

- `jogo_da_velha.js`: Arquivo principal com a lógica do jogo e do torneio.
- `dados/`: Diretório para armazenar os nomes dos jogadores.

## Instalação

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
2. Clone este repositório:
   ```sh
   git clone https://github.com/gustavors1608/jogo_da_velha_node.git
   cd jogo_da_velha_node
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```

## Uso

Para iniciar o torneio, execute o seguinte comando:
```sh
node jogo_da_velha.js
```

## Exemplo de Execução

Aqui está um exemplo de como o jogo é executado:

1. O usuário é solicitado a informar quantos jogadores irão participar.
2. Os jogadores são registrados com seus nomes.
3. O torneio é configurado e as partidas são jogadas entre os jogadores da mesma categoria.
4. O vencedor de cada partida avança para a próxima categoria, enquanto o perdedor é eliminado.
5. O torneio continua até que um jogador seja coroado como vencedor.

## Regras do Torneio

- Os jogadores são registrados com nomes e atribuídos a uma categoria inicial.
- Em cada rodada, os jogadores da mesma categoria competem entre si.
- O vencedor de cada partida avança para a próxima categoria.
- O perdedor é eliminado do torneio.
- O torneio continua até que restem dois jogadores na categoria mais alta.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.



