document.getElementById('form').addEventListener('submit', function (evento) {
    evento.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const titulo = document.getElementById("titulo").value;
    const data_devolucao = document.getElementById("data_devolucao").value;

    const dadosDevolucao = {
        usuario: usuario,
        titulo: titulo,
        data_devolucao: data_devolucao
    };

    //url de onde tá a api
    fetch('http://localhost:3000/biblioteca/devolucao', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosDevolucao)
    })
    .then(response => {
        if (!response.ok) {
                throw new Error('Erro na rede.');
            }
        return response.json();
    })
    .then(data => {
        alert("A devolução foi feita com sucesso!");
        })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro na devolução.');
    });
});