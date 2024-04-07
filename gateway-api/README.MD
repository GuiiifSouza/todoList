# Gateway API

## Visão Geral

Este projeto implementa um Gateway API, servindo como um ponto de interconexão entre clientes e serviços de back-end e front-end. Ele gerencia e redireciona as requisições recebidas, facilitando uma comunicação eficiente e centralizada.

## Benefícios do Uso de um Gateway API

A utilização de um Gateway API oferece diversas vantagens:

1. **Simplificação Arquitetônica**: Centraliza a entrada de requisições, simplificando a infraestrutura de rede e otimizando o roteamento.
2. **Aprimoramento da Segurança**: Implementa medidas de proteção contra ataques de DDoS e DoS, servindo como base para a implementação de estratégias de segurança avançadas como WAF (Web Application Firewall).
3. **Flexibilidade**: Promove a evolução e manutenção independentes dos serviços de front-end e back-end, minimizando o impacto das mudanças.
4. **Controle Centralizado**: Centraliza os logs e as políticas de uso, proporcionando uma visão clara e controle sobre as operações das aplicações.
5. **Escalabilidade**: Oferece a capacidade de expandir e adaptar serviços conforme necessário para atender à demanda crescente.

## Funcionamento

- As requisições destinadas ao caminho `/api` são automaticamente encaminhadas para os serviços de back-end correspondentes.
- Outras requisições são redirecionadas para o serviço de front-end, permitindo o acesso aos recursos da interface de usuário.

## Começando

Para iniciar o Gateway API:

```bash
npm install
cp ./env.example ./env
npm start
```

O servidor estará operacional na porta especificada pela variável de ambiente GATEWAY_PORT.

## Pasta de Logs
Os logs das requisições feitas são armazenados na pasta logs, organizados por data. Cada arquivo de log é nomeado com o padrão access-YYYY-MM-DD.log, onde YYYY-MM-DD representa a data em que as requisições foram feitas.

## Licença

Este projeto está licenciado sob a Licença MIT. Verifique o arquivo LICENSE para mais detalhes.

