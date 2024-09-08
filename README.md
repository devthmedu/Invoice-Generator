
# Projeto de Gestão de Faturas

## Visão Geral

O projeto de gestão de faturas é uma aplicação web destinada a gerar e gerenciar faturas de forma eficiente. Ele permite visualizar uma prévia da fatura, adicionar e editar produtos, e imprimir ou gerar um PDF da fatura. A interface foi desenvolvida com React e utiliza bibliotecas modernas para garantir uma experiência de usuário fluida e responsiva.

## Funcionalidades

- **Visualização de Fatura:** Exibe uma prévia da fatura com informações detalhadas.
- **Gerenciamento de Produtos:** Adiciona, edita e remove produtos da fatura.
- **Cálculo Automático do Total:** Calcula automaticamente o total da fatura com base na quantidade e preço dos produtos.
- **QR Code:** Gera um QR Code para a fatura que pode ser utilizado para referência rápida.
- **Impressão e PDF:** Permite imprimir a fatura ou gerar um PDF utilizando a funcionalidade do React-to-Print.
- **Interface Responsiva:** Adapta-se a diferentes tamanhos de tela para uma melhor experiência em dispositivos móveis e desktops.

## Estrutura do Projeto

- `src/`
  - `components/`
    - `InvoicePreview/` - Componente para a visualização da fatura.
    - `ProductForm/` - Componente para o formulário de adição/edição de produtos.
    - `ActionButton/` - Componente para botões de ação reutilizáveis.
    - `Template/` - Componente para o layout da fatura e geração do PDF.
  - `App.js` - Arquivo principal do React que configura e renderiza os componentes.
  - `index.js` - Ponto de entrada da aplicação React.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção da interface de usuário.
- **Material-UI**: Biblioteca de componentes React que segue as diretrizes de design do Material Design.
- **React-to-Print**: Biblioteca para impressão e geração de PDFs.
- **QRCode.react**: Biblioteca para gerar QR Codes.
- **Lucide Icons**: Biblioteca de ícones para interfaces modernas.

## Instalação

Para rodar o projeto localmente, siga as instruções abaixo:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/projeto-faturas.git
   cd projeto-faturas
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm start
   ```

   O projeto estará disponível em [http://localhost:3000](http://localhost:3000).

## Uso

1. **Visualização da Fatura:**
   - Acesse o componente `InvoicePreview` para ver uma prévia da fatura.

2. **Gerenciamento de Produtos:**
   - Utilize o componente `ProductForm` para adicionar ou editar produtos na fatura.

3. **Impressão e PDF:**
   - Clique no botão de impressão para gerar uma versão imprimível da fatura.

4. **QR Code:**
   - Visualize o QR Code gerado que está associado à fatura.

## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir para o projeto, por favor, siga estas etapas:

1. Fork o repositório.
2. Crie uma branch para suas alterações (`git checkout -b minha-nova-feature`).
3. Faça commit das suas alterações (`git commit -am 'Adiciona nova feature'`).
4. Push para a branch (`git push origin minha-nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto é licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
