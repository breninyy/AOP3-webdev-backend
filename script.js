document.addEventListener('DOMContentLoaded', () => {
    const btnCarregar = document.getElementById('btn-carregar-produtos');
    const containerProdutos = document.getElementById('lista-produtos');

    if (btnCarregar) {
        btnCarregar.addEventListener('click', carregarProdutos);
    }

    function carregarProdutos() {
        containerProdutos.innerHTML = '<p>Carregando produtos...</p>';

        const xhr = new XMLHttpRequest();
        const url = 'https://fakestoreapi.com/products?limit=3'; 
        
        xhr.open('GET', url, true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const produtos = JSON.parse(xhr.responseText);
                        renderizarProdutos(produtos);
                    } catch (error) {
                        console.error('Erro ao processar os dados da API:', error);
                        containerProdutos.innerHTML = '<p>Erro ao processar os produtos.</p>';
                    }
                } else {
                    console.error('Erro na requisição. Status:', xhr.status);
                    containerProdutos.innerHTML = '<p>Erro ao comunicar com o servidor. Tente novamente.</p>';
                }
            }
        };

        xhr.send();
    }

    function renderizarProdutos(produtos) {
        containerProdutos.innerHTML = ''; 

        produtos.forEach(produto => {
            const divProduto = document.createElement('div');
            divProduto.style.border = '1px solid #ccc';
            divProduto.style.margin = '10px 0';
            divProduto.style.padding = '10px';
            
            divProduto.innerHTML = `
                <h4>${produto.title}</h4>
                <p><strong>Preço:</strong> $ ${produto.price}</p>
                <p><small>${produto.category}</small></p>
            `;
            
            containerProdutos.appendChild(divProduto);
        });
    }
});