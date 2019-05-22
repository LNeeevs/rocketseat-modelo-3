//coleta os elementos essenciais
var listElement = document.querySelector('#app tbody');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

/*var todos =[
    'Todo 1',
    'Todo 2',
    'Todo 3'
];*/

var todos = JSON.parse(localStorage.getItem('list-todos')) || [];

function renderTodos(){
    //zera a lista de elementos para quando a função for chamada denovo, trazer apenas os itens que são novos
    listElement.innerHTML = '';

    for(todo of todos){
        //cria os elementos que irao compor a tela
        var todoElement = document.createElement('tr');
        var todoText = document.createTextNode(todo);

        var todoElementA = document.createElement('td');
        var todoElementB = document.createElement('td');

        //cria o botão que irá deletar o conteudo na linha, seu texto e adiciona o texto ao elemento
        var linkElement = document.createElement('a');
        var linkText = document.createTextNode('Delete');
        linkElement.appendChild(linkText);
        linkElement.setAttribute('href', '#');
        linkElement.style.color = 'red';

        //cria o botão que irá deletar o conteudo na linha, seu texto e adiciona o texto ao elemento
        var linkElement2 = document.createElement('a');
        var linkText2 = document.createTextNode('Edit');
        linkElement2.appendChild(linkText2);
        linkElement2.setAttribute('href', '#');
        linkElement2.style.color = 'green';

        //coleta a posição do array todo dentro da estrutura todos
        var pos = todos.indexOf(todo);
        //adiciona a função onclick dentro do elemento
        linkElement.setAttribute('onclick', 'deleteTodo('+ pos +')');
        linkElement2.setAttribute('onclick', 'editValues(' + pos + ')');

        //coloca o texto dentro dos elementos td's
        todoElementA.appendChild(todoText);
        todoElementB.appendChild(linkElement);
        todoElementB.appendChild(linkElement2);

        //coloca os td's dentro do elemento TR
        todoElement.appendChild(todoElementA);
        todoElement.appendChild(todoElementB);

        //coloca o elemento com os tds inclusos dentro da lista criada
        listElement.appendChild(todoElement);
    }
}

renderTodos();

function addTodo(){
    //recupera o valor do input
    var todoText = inputElement.value;

    //adiciona o todo text no array
    todos.push(todoText);

    //apagar o texto do input
    inputElement.value = '';

    //chama a função que renderiza novamente a lista mostrando os novos itens adicionados
    renderTodos();
    saveToLocalStorage();
}

//botão chamando a função todo ao clicar, enviando o conteúdo do input para dentro da tela
buttonElement.onclick = addTodo;

function deleteTodo(pos){
    //a partir da posição em que estiver dentro do array - EX: [1][2][0]... remova essa posição
    todos.splice(pos, 1);

    //atualiza a lista com os novos itens
    renderTodos();
    saveToLocalStorage();
}

function editValues(pos){
    //solicita um novo todo para a posição desejada
    var promptText = prompt('Insert a new todo to change it and press OK:');
    
    //coleta a posição no array em que você esta
    var posicao = pos;

    //ele percebeu que, na posição em que o vetor está, o conteúdo é este...
    var teste = todos[pos];

    //então todos, na posição POS, que é a posição correta, recebe o novo texto inserido
    todos[pos] = promptText;

    renderTodos();
    saveToLocalStorage();
}

function saveToLocalStorage(){
    localStorage.setItem('list-todos', JSON.stringify(todos));
}