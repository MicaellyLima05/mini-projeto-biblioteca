document.getElementById('form').addEventListener('submit', function (evento) {
    evento.preventDefault();

    const titulo = document.getElementById("titulo").value;

    const dadosConsulta = {
        titulo: titulo
    }

    async function organizaURL(titulo) {

        const url = new URL('http://localhost:3000/biblioteca/livros/consulta');
        url.searchParams.append('titulo', titulo);

    try {
        const response = await fetch(url, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json', 

            }
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const mensagem = await response.json();
        document.getElementById('h3').innerText = mensagem
        console.log(mensagem);

    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

organizaURL(titulo);

});