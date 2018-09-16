Dado("que eu possuo o seguinte participante") do |table|                      
    @participante = table.rows_hash
    puts @participante
  end                                                                           
                                                                                
  Quando("faço o cadastro deste novo contato") do     
    visit 'http://localhost:3000'
    find('#full-name').set(@participante[:nome])
    find('#date-birth').set(@participante[:data_nascimento])
    nacionalidade = find('#nacionality')
    nacionalidade.click
    nacionalidade.click
    nacionalidade.find('option', text: @participante[:nacionalidade]).select_option
    find('#city').set(@participante[:cidade])
    uf = find('#uf')
    uf.find('option', text: @participante[:uf]).select_option
    
    find('#father-name').set(@participante[:nome_do_pai])
    find('#mother-name').set(@participante[:nome_da_mae])
    find('#rg').set(@participante[:rg])
    find('#orgao-emissor').set(@participante[:orgao_emissor])
    find('#cpf').set(@participante[:cpf])
    find('#cep').set(@participante[:cep])
    find('#rua').set(@participante[:logradouro])
    find('#numero').set(@participante[:numero_endereco])
    find('#bairro').set(@participante[:bairro])
    find('#complemento').set(@participante[:complemento])
    find('#cidade').set(@participante[:cidade])
    uf_endereco = find('#uf-endereco')
    uf_endereco.find('option', text: @participante[:uf_endereco]).select_option
    
    find('#cadastrar').click
     
     
  end                                                                           
                                                                                
  Entao("devo ver a mensagem de sucesso {string}") do |mensagem|                  
    msg = find('.s-alert-success ')
    expect(msg.text).to eql mensagem
  end                                                                           