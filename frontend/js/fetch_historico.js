document.getElementById('form').addEventListener('submit', function (evento) {
    evento.preventDefault();

    const usuario = document.getElementById("usuario").value;

    const dadosHistorico = {
        usuario: usuario
    }

    async function organizaURL(usuario) {

        const url = new URL('http://localhost:3000/biblioteca/usuarios/emprestimos');
        url.searchParams.append('usuario', usuario);

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

        const dados = await response.json();
        
         // Limpa o conteúdo anterior
         const h3Container = document.getElementById('h3');
         h3Container.innerHTML = '';

         // Exibe os títulos
         dados.forEach(obj => {
             const h3 = document.createElement('h3');
             h3.innerText = `Título: ${obj.titulo}`;
             h3Container.appendChild(h3);
         });

         console.log(dados);

    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

organizaURL(usuario);

});