#language: pt

Funcionalidade: Cadastrar um novo participante
    Como um usuário
    posso realizar um novo cadastro
    para poder gerenciar todos os participantes

    Esquema do Cenario: Novo participante
    Dado que eu possuo o seguinte participante
        |nome|<nome_completo>|
        |data_nascimento|<data_nascimento>|
        |nacionalidade|<nacionalidade>|
        |cidade|<cidade>|
        |uf|<uf>|
        |nome_do_pai|<nome_do_pai>|
        |nome_da_mae|<nome_da_mae>|
        |rg|<rg>|
        |orgao_emissor|<orgao_emissor>|
        |cpf|<cpf>|
        |estado_civil|<estado_civil>|
        |cep|<cep_endereco>|
        |logradouro|<logradouro_endereco>|
        |numero_endereco|<numero_endereco>|
        |bairro|<bairro_endereco>|
        |complemento|<complemento_endereco>|
        |cidade|<cidade_endereco>|
        |uf_endereco|<uf_endereco>|
    Quando faço o cadastro deste novo contato
    Entao devo ver a mensagem de sucesso "Participante cadastrado com sucesso."
    
    Exemplos:
    |nome_completo|data_nascimento|nacionalidade|cidade|uf|nome_do_pai|nome_da_mae|rg|orgao_emissor|cpf|estado_civil|cep_endereco|logradouro_endereco|numero_endereco|bairro_endereco|complemento_endereco|cidade_endereco|uf_endereco|
    |Marcelo de Oliveira Santos|17/10/1986|Brasil|Florianopolis|SC|Jorge de Oliveira Santos| Marcia Regina Santos|4170083|SSP-SC|053.522.299-80|Casado|88047700|Rua test sem fim|999|Carianos|Fundos|FLorianopolis|SC|
