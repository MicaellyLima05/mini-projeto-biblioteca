document.getElementById('form').addEventListener('submit', function (evento) {
    evento.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const usuario = document.getElementById("usuario").value;
    const data_emprestimo = document.getElementById("data_emprestimo").value;

    const dadosEmprestimo = {
        titulo: titulo,
        usuario: usuario,
        data_emprestimo: data_emprestimo
    };

    //url de onde tá a api
    fetch('http://localhost:3000/biblioteca/emprestimo', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosEmprestimo)
    })
    .then(response => {
        if (!response.ok) {
                throw new Error('Erro na rede.');
            }
        return response.json();
    })
    .then(data => {
        alert("O empréstimo foi realizado com sucesso!");
        })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro no empréstimo.');
    });
});