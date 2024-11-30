# Technical Challenge
Desafio técnico para vaga de Desenvolvedor - Luizalabs

# Como executar
Clone o projeto em um diretório
* No projeto backend:
   - Faça download do .Net 6.0 sdk e Sql Server 2022, instale os dois e após isso abra um terminal na pasta backend
    execute:

       ```
       dotnet ef database update 
       ```
       
        ```
       dotnet run.
       ```
        
* No projeto frontend:
   - Faça download do npm e no terminal na pasta frontend execute:

       ```
       npm install
       ```

        ```
       npm run start
       ```

# Como testar
* o backend tem o swagger e assim consigo visualizar os endpoints e testar. Endereço http://localhost:7051/swagger/index.html
  ![image](https://github.com/user-attachments/assets/f8ea35b7-f0c8-4635-b8da-d19921dbb8b4)

* o frontend após executar os passos acima, consigo testar as funcionalidades.
  ![image](https://github.com/user-attachments/assets/f45bdd4b-432e-41d3-9c2d-528fd49f987f)

# Explicação
Minha ideia foi arquitetura em camadas, algumas caracteristicas do microsserviços e com os padrões mais utilizados como DTO, injeção de depedência e clean code.
a estrutura ficou assim:
- Controller: responsável pela validação de entrada(Dtos), processar as informações, chamar os serviços necessários e retornar respostas.
- services: na parte de envio de email estruturei como serviço.
- Data: comunicação com o banco de dados, configurei o DataContext para acessar a entidade via Entity Framework.

No frontend que é a parte que deverá interagir com o usuário, escolhi o React, que é uma biblioteca que estou tendo mais familiaridade, além disso,
tem um ótimo desempenho e a integração com o backend se tornou mais simples. As imagens que aparecem nas telas foram retiradas do: https://br.freepik.com/.
As ideias de como a tela deveriam ficar, foi desenhado utilizando o figma: https://www.figma.com/design/z0ry3WSPcfUKKuJidYy4ji/expectativa---tela-de-login?node-id=0-1&m=dev&t=HJ1mdsNnoQbBjhnX-1

