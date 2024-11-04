document.getElementById('form').addEventListener('submit', function (evento) {
    evento.preventDefault();

    const name = document.getElementById("nome").value;
    const endereco = document.getElementById("endereco").value;

    const dadosUsuario = {
        endereco: endereco,
        name: name
    };

    //url de onde tá a api
    fetch('http://localhost:3000/biblioteca/usuarios/cadastro', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosUsuario)
    })
    .then(response => {
        if (!response.ok) {
                throw new Error('Erro na rede.');
            }
        return response.json();
    })
    .then(data => {
        alert("Você foi cadastrado com sucesso!");
        })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro no cadastro.');
    });
});