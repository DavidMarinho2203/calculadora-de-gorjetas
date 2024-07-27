// Obtendo o formulário
const form = document.querySelector('form');
// obtendo os locais de resposta.
const resultado = document.querySelectorAll('.local__Resultado');

// Atribuindo a variavel que vai armazenar o valor personalizado
let valorPersonalizado

// Criando alguns eventos
window.addEventListener('keydown', e => funcaoParaQuandoCLicarEnter(e)) // adiciona um evento para o clicar no teclado
document.querySelector('button[type=reset]').addEventListener('click', funcaoParaResetar) // adiciona de evento para o botão resetar
document.getElementById('inQntPessoas').addEventListener('focus', funcaoParaFocarNoInput) // adiciona de evento para o input (entrada de foco) do id de quantidade de pessoas
document.getElementById('inQntPessoas').addEventListener('blur', funcaoParaDesforcarNoInput) // adiciona de evento para o input (saidada do foco) do id de quantidade de pessoas
document.querySelectorAll('icone__flutuante').forEach(icone => icone.addEventListener('click', funcaoParaFocarNoElementoIrmao)) // adiciona de evento para os icones de dinheiro e pessoa
document.querySelectorAll('.button').forEach(button => button.addEventListener('click', funcaoParaOsBotesDePorcentagem)) // adiciona de evento para os botoes de porcentagem

// funções
// função para quando clicar no enter
function funcaoParaQuandoCLicarEnter(e){
    if (e.key === 'Enter') {
        e.preventDefault(); // Previna o comportamento padrão do Enter

        // obtendo os valores da conta, da % e da quantidade de pessoas
        const conta = Number(document.getElementById('inValor').value);
        // obtendo o valor personalizado caso exista e caso o input esteja vazio retorna 0
        const porcentagem = Number(document.getElementById('inPersonalizado').value) || valorPersonalizado
        const pessoas = Number(document.getElementById('inQntPessoas').value);

        if (pessoas == 0) { // se o valor da quantidade de pessoas for 0
            const error = document.querySelector('.error') // seleciona o elemento de erro
            error.style.display = 'flex' // exibe o elemento de erro

            const qntPessoas = document.getElementById('inQntPessoas') // seleciona o elemento de quantidade de pessoas

            qntPessoas.style.borderColor = 'red' // adiciona uma borda vermelha ao elemento de quantidade de pessoas

            funcaoParaFocarNoInput
            funcaoParaDesforcarNoInput
            return;

        } else if (conta <= 0 || (porcentagem <= 0 || porcentagem == undefined) || pessoas <= 0) { // se o valor da conta for 0 ou o valor da porcentagem for 0 ou o valor da quantidade de pessoas for 0
            alert('Por favor, digite um valor válido para todos os campos') // exibe uma mensagem de alerta
            return;

        } else { // se todos os valores forem válidos
            let valorGorjeta = (conta * (porcentagem / 100) / pessoas) // calcula o valor da gorjeta
            resultado[0].innerHTML = `$${valorGorjeta.toFixed(2)}` // exibe o valor da gorjeta
            resultado[1].innerHTML = `$${(conta / pessoas + valorGorjeta).toFixed(2)}` // exibe o valor total
            document.querySelector('button[type=reset]').disabled = false // habilita o botão resetar
            document.querySelector('button[type=reset]').style.color = 'hsl(0, 0%, 100%)'

        }
    }
}

function funcaoParaFocarNoElementoIrmao(elemento) {
    if (elemento.alt === "imagem do dollar") {
        document.getElementById('inValor').focus()
    } else {
        document.getElementById('inQntPessoas').focus()
    }
}

function funcaoParaResetar() {
    location.reload()
}

function funcaoParaFocarNoInput() {
    if (document.querySelector('.error').style.display == 'flex') {
        document.querySelector('.error').style.display = 'none'
    }
    document.getElementById('inQntPessoas').style.borderColor = 'hsl(172, 67%, 45%)';

}

function funcaoParaDesforcarNoInput() {
    document.getElementById('inQntPessoas').style.borderColor = 'transparent';
}

function funcaoParaOsBotesDePorcentagem() {
    const localPersonalizado = document.getElementById('inPersonalizado')
    const buttons = document.querySelectorAll('.button')

    if (this.classList.contains('ativo')) { // se o botão estiver ativo
        this.classList.remove('ativo') // remove o ativo
        localPersonalizado.disabled = false // habilita o input
        valorPersonalizado = 0 // zera o valor
    } else if (localPersonalizado.value != "" || localPersonalizado.value != 0) { // se o botão estiver inativo e o input não estiver vazio
        buttons.forEach(button => { // percorre todos os botoes
            button.disabled = true // desabilita o botão
        })

        localPersonalizado.style.borderColor = 'red' // coloca a borda vermelha

    } else { // se o botão estiver inativo e o input estiver vazio
        buttons.forEach(button => { // percorre todos os botoes
            button.disabled = false // habilita o botão
        })
        buttons.forEach(button => { // percorre todos os botoes
            button.classList.remove('ativo') // remove o ativo
        })
        this.classList.add('ativo') // adiciona o ativo
        localPersonalizado.disabled = true // desabilita o input
        localPersonalizado.style.borderColor = '' // remove a borda vermelha
        valorPersonalizado = Number(this.getAttribute('value')) // pega o valor do botão
    }

}

