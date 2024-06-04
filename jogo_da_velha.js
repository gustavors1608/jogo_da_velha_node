/*
jogo da velha com mais de 2 participantes, pode ir registrando jogadores(max 10), se vai eliminando quem perder, 
a cada vez que alguem ganhar sobre a categoria do jogador, e inicia com outros 2 que estejam com a categoria inicial etc, e elimina que zerar a categoria(atribuido quando perde)

categorias exemplo:
gamer1    gamer2     gamer3     gamer4      gamer5     gamer6      gamer7    gamer8
  1         0          0          1           0          1           1         0
  |_________|          |__________|           |__________|           |_________|
  gamer1=0                 gamer4=2               gamer6=2         gamer7=2
  |_______________________________|                      |___________|
            gamer4 = 3                                    gamer7 = 3
                |______________________________________________|
                                        |
                                        |
                                        |
                                GANHADOR È O GAMER7


tarefas:

gustavo: sistema do torneio e regras gerais
adriano: funcao para adicionar o "X" ou "O" ao array, funcao para exibir o array da partida, funcao para o user atribuir o ponto dele (X ou O) a determinada posição

regras torneio:
- quem ganhar em uma chave, so joga quem ja ganhou em outra chave, ou seja quem ja estiver na mesma categoria
- quem vai iniciar a partida é escolhido de maneira aleatoria


*/



const readline = require("readline-sync");
const fs = require('node:fs');
const progress_bar = require('cli-progress');
var figlet = require("figlet");


const n_max_gamers = 12;
var n_gamer_atual = 0;

var partida = new Array();// cada partida tem os seguintes dados: gamer1: i,gamer2: j,pontuacao: [['', '', ''], ['', '', ''], ['', '', '']],

var gamer = new Array();


function set_names_gamers(n_gamer) {
    var local_nome = "./dados/nome_gamer" + n_gamer + ".txt";
    var nome_memoria = "";

    if (fs.existsSync(local_nome) == true) {
        nome_memoria = fs.readFileSync(local_nome);
    }

    var question_nome = "";
    if (nome_memoria != "") { question_nome = "(ou se desejar usar seu nome da ultima partida: " + nome_memoria + " pressione ENTER)  "; }

    gamer[n_gamer].nome = readline.question("Qual o nome do jogador numero " + n_gamer + "? " + question_nome)
    if (gamer[n_gamer].nome !== "") {
        //vai usar o nome escrito
        fs.writeFileSync(local_nome, gamer[n_gamer].nome);
    } else {
        //usar o nome da memoria
        if (nome_memoria !== "") {  
            gamer[n_gamer].nome = nome_memoria.toString();
        }else{
            //nao teve nome nem nada na memoria
            console.log("Entrada invalida, insira o nome novamente!")
            set_names_gamers(n_gamer);
        }
    }
    gamer[n_gamer].categoria = 1;
}

function config_partidas(partida) {
    //une os jogadores da mesma categoria(enquanto houver),se nao houver mais pares na mesma categoria encerra o torneio,
    // pois ja vai ter um vencedor provavelmente 
    //e atribui ao array partida(.push) 

    const jogadores_pareados = new Set();

    for (let i = 1; i <= n_gamer_atual; i++) {
        //se esse jogador ja foi pareado ou ele perdeu, pula pro proximo loop
        if (jogadores_pareados.has(i) || gamer[i].categoria === 0) continue;
        for (let j = i + 1; j <= n_gamer_atual; j++) {
            if (!jogadores_pareados.has(j) && gamer[j].categoria == gamer[i].categoria) {// nao foi pareado ainda e ta na mesma categoria que o anterior

                jogadores_pareados.add(i);
                jogadores_pareados.add(j);


                partida.push({
                    gamer1: i,
                    gamer2: j,
                    ganhador: 0,
                    pontuacao: [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']],
                });

                break; // Sai do loop interno após encontrar um par
            }
        }
    }

    return partida;

}


const sleep = (millis) => {
    var stop = new Date().getTime();
    while (new Date().getTime() < stop + millis) { }
};

function random_num(min, max) {
    return Math.random() * (max - min) + min;
}

function exibir_tabuleiro(tabuleiro) {
    console.log("-------------");
    for (let i = 0; i < 3; i++) {
      let linha = "| ";
      for (let j = 0; j < 3; j++) {
        linha += tabuleiro[i][j] + " | ";
      }
      console.log(linha);
      console.log("-------------");
    }
  }

function obter_posicao(tabuleiro, jogador, nome) {
    let linha, coluna;
  
    do {
      linha = parseInt(readline.question(nome+"("+jogador+"), qual a linha? (1 a 3): "));
      coluna = parseInt(readline.question(nome+"("+jogador+"), qual a coluna? (1 a 3): "));

  
      // Validação da entrada do usuário
      if (isNaN(linha) || isNaN(coluna) || linha < 1 || linha > 3 ||coluna < 1 ||coluna > 3 ||tabuleiro[linha - 1][coluna - 1] !== " ") {
        console.log("Posição inválida. Tente novamente.");
      }
    } while (isNaN(linha) || isNaN(coluna) || linha < 1 ||linha > 3 ||coluna < 1 ||coluna > 3 ||tabuleiro[linha - 1][coluna - 1] !== " ");
  
    tabuleiro[linha - 1][coluna - 1] = jogador;
}
  
function preencheu(tabuleiro) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (tabuleiro[i][j] == " ") {
          return false; // Encontrou uma célula vazia, tabuleiro não preenchido
        }
      }
    }
    return true; // Todas as células estão preenchidas
}

function esvaziar_array(tabuleiro) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        tabuleiro[i][j] = " ";
      }
    }
}

function categorias_existentes(gamer) {
    const categorias = new Set();
    for (let i = 0; i < gamer.length; i++) {
        categorias.add(gamer[i].categoria);
    }
    return Array.from(categorias);
}
  

function jogo_main(n_partida,n_partida_total, partida, gamer) {
    //dados sobre a partida e jogadores
    var id_jogador_1 = partida[n_partida].gamer1;
    var id_jogador_2 = partida[n_partida].gamer2;
    var nome_jogador_1 = gamer[id_jogador_1].nome;
    var nome_jogador_2 = gamer[id_jogador_2].nome;
    var array_partida = partida[n_partida].pontuacao; // [['', '', ''], ['', '', ''], ['', '', '']]
    var jogador_atual = 1;


    // randomizar quem vai comecar a partida ( jogador 1 ou 2)(quem comeca vai comecar com o valor X);
    jogador_atual = random_num(1,2);
    
    while (true) {//enquanto nao tiver um ganhador definido, fica rodando o loop
        console.clear();

        console.log((n_partida_total) + "° partida será entre:");
        console.log(nome_jogador_1 + "   >---VS---<   " + nome_jogador_2 + "\n");

        var simbolo_jogador_atual = "";
        var nome_jogador_atual = "";
        if (jogador_atual == 1) {
            simbolo_jogador_atual = "X";
            nome_jogador_atual = nome_jogador_1;
        }else{
            simbolo_jogador_atual = "O";
            nome_jogador_atual = nome_jogador_2;
        }


        // exibir o array formatado
        exibir_tabuleiro(array_partida);

        // pedir para o jogador que vai começar atribuir o ponto dele (X ou O) a determinada posição (linha 3, coluna 2...) adicionar o "X" ou "O", na determinada posicao que ele escolheu ao array da partida
        obter_posicao(array_partida, simbolo_jogador_atual, nome_jogador_atual); 

        if(verificar_vitoria(partida,simbolo_jogador_atual, n_partida) == true){
            
            console.clear();
            exibir_tabuleiro(array_partida);

            console.log("\n\nJogador "+nome_jogador_atual+" ganhou");

            //elimina o jogador que perdeu, e sobre a categoria do ganhador
            if (jogador_atual == 2) { //se o ganhador foi o 2, elimina o 1 e sobre a categoria do 2
                gamer[id_jogador_1].categoria = 0;
                console.log(gamer[id_jogador_1].nome+" foi eliminado ");

                gamer[id_jogador_2].categoria = gamer[id_jogador_2].categoria + 1;
                console.log(gamer[id_jogador_2].nome+" subiu para a categoria "+gamer[id_jogador_2].categoria);
            }else{
                gamer[id_jogador_2].categoria = 0;
                console.log(gamer[id_jogador_2].nome+" foi eliminado ");

                gamer[id_jogador_1].categoria = gamer[id_jogador_1].categoria + 1;
                console.log(gamer[id_jogador_1].nome+" subiu para a categoria "+gamer[id_jogador_1].categoria);
            }
            sleep(4000);
            break;
        }
        //verifica se ja preencheu a tabela e nao teve ganhadores(empatou)
        if(preencheu(array_partida)){
            //se preencheu, e chegou aqui (nao teve ganhador), entao empatou
            console.log("Opaa, parece que houve um EMPATE, vamos jogar denovo "+nome_jogador_1+" e "+nome_jogador_2);
            sleep(1500);
            esvaziar_array(array_partida);
        }

        //inverte o jogador
        if(jogador_atual == 1){jogador_atual = 2}else{jogador_atual = 1}
    }
    
}

function verificar_vitoria(partida, simbolo_verificar,partida_atual) {
    //verifica se o jogador atual ganhou
    //verifica as linhas
    for (let i = 0; i < 3; i++) {
        if (partida[partida_atual].pontuacao[i][0] == partida[partida_atual].pontuacao[i][1] && partida[partida_atual].pontuacao[i][1] == partida[partida_atual].pontuacao[i][2] && partida[partida_atual].pontuacao[i][0] == simbolo_verificar) {
            return 1;
        }
    }
    //verifica as colunas
    for (let i = 0; i < 3; i++) {
        if (partida[partida_atual].pontuacao[0][i] == partida[partida_atual].pontuacao[1][i] && partida[partida_atual].pontuacao[1][i] == partida[partida_atual].pontuacao[2][i] && partida[partida_atual].pontuacao[0][i] == simbolo_verificar) {
            return 1;
        }
    }
    //verifica as diagonais
    if (partida[partida_atual].pontuacao[0][0] == partida[partida_atual].pontuacao[1][1] && partida[partida_atual].pontuacao[1][1] == partida[partida_atual].pontuacao[2][2] && partida[partida_atual].pontuacao[0][0] == simbolo_verificar) {
        return 1;
    }
    if (partida[partida_atual].pontuacao[0][2] == partida[partida_atual].pontuacao[1][1] && partida[partida_atual].pontuacao[1][1] == partida[partida_atual].pontuacao[2][0] && partida[partida_atual].pontuacao[0][2] == simbolo_verificar) {
        return 1;
    }
    return 0;
}



function torneio_main(gamer,partida) {


    console.clear();
    console.log("Olá seja bem vindo ao jogo da velha!!! \n");

    //obtem o numero de jogadores
    do {
        n_gamer_atual = parseInt(readline.question("Quantos jogadores vao participar? (numero par e no maximo " + n_max_gamers + " jogadores)  "));
    } while (n_gamer_atual % 2 !== 0 && n_gamer_atual < n_max_gamers);//se for diferente de par, pede de novo

    //cria os jogadores( adiciona itens ao array)
    console.log("\nCriando jogadores ...")
    const bar_create_gamers = new progress_bar.SingleBar({}, progress_bar.Presets.shades_classic);
    bar_create_gamers.start(n_gamer_atual, 0);

    for (let i = 0; i <= n_gamer_atual; i++) {
        bar_create_gamers.update(i);
        gamer.push({
            nome: "",
            categoria: 0
        });
        sleep(200);
    }

    bar_create_gamers.stop();
    console.log("");

    //define os nomes dos x jogadores
    console.log("Aqui trabalhamos com nomes!!! ")
    for (let i = 1; i <= n_gamer_atual; i++) {
        set_names_gamers(i);
    }


    //quantas partidas serao para essa quantidade de jogadores
    const n_partidas_totais = n_gamer_atual - 1;


    //configurando partidas
    console.log("\nConfigurando partidas");
    const bar_create_partidas = new progress_bar.SingleBar({}, progress_bar.Presets.shades_classic);
    bar_create_partidas.start(n_partidas_totais, 0);

    //monta as chaves de quem jogará com quem, maneira visual, usando simulacao de dados reais 
    partida = config_partidas(partida) // configura as chaves
    bar_create_partidas.update(n_partidas_totais);
    bar_create_partidas.stop();
    
    
    console.log('\nOs oponentes nesta categoria serão os seguintes:')
    for (let n_partida = 0; n_partida < partida.length; n_partida++) {
        var nome_gamer1 = gamer[partida[n_partida].gamer1].nome;
        var nome_gamer2 = gamer[partida[n_partida].gamer2].nome;

        console.log((n_partida + 1) + "° partida será entre:");
        console.log(nome_gamer1 + "   >---VS---<   " + nome_gamer2 + "\n");

        //montar desenho de arvore abaixo?
    }

    console.log('\nProntos para a partida?');

    var partidas_restantes = 1;
    var numero_da_partida_total = 0;
    //inicia as partidas e executa as mesmas
    while(partidas_restantes !== 0){
        numero_da_partida_total++;
        var arr_categorias_existentes = categorias_existentes(gamer);
        partidas_restantes = (n_partidas_totais - arr_categorias_existentes[1]);//ex: total de partidas:3 e a categoria atual é 3

        //se nao tiver mais categorias numero 1, entao pode começar a calcular as categorias maiores
        if(arr_categorias_existentes.includes(1) == false){partida = config_partidas(partida);}//configura as partidas para todos os jogadores da mesma categoria

        console.log("A categoria numero "+arr_categorias_existentes[1]+" irá competir agora");
        sleep(2000);
        for (let n_partida = 0; n_partida < partida.length; n_partida++) {//executa todas as partidas da determinada categoria
            var nome_gamer1 = gamer[partida[n_partida].gamer1].nome;
            var nome_gamer2 = gamer[partida[n_partida].gamer2].nome;
            sleep(3000);
            console.clear();

            jogo_main(n_partida,numero_da_partida_total, partida, gamer);
        }

        partida.length = 0;//apaga todos os itens do array pois agora subiu a categoria

    }

    //encerrou jogo, tem um ganhador ja, mas quem é?
    figlet("PARABENS !!", function (err, data) {
        console.log(data);
        });
}





torneio_main(gamer, partida);



