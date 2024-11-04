document.getElementById('form').addEventListener('submit', function (evento) {
    evento.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const exemplares = document.getElementById("exemplares").value;

    const dadosLivro = {
        titulo: titulo,
        autor: autor,
        exemplares: exemplares
    };

    //url de onde tá a api
    fetch('http://localhost:3000/biblioteca/livros/cadastro', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosLivro)
    })
    .then(response => {
        if (!response.ok) {
                throw new Error('Erro na rede.');
            }
        return response.json();
    })
    .then(data => {
        alert("O livro foi cadastrado com sucesso!");
        })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro no cadastro.');
    });
});