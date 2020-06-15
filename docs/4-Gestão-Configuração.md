# Gestão de Configuração

> Nesta parte, apresentamos como foi realizada a
> gestão de configuração do projeto. Isto é, como a ferramenta de
> controle de versão foi configurada, bem como a hospedagem da
> plataforma.

## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o
[Git](https://git-scm.com/), sendo que o [Github](https://github.com)
foi utilizado para hospedagem do repositório `organizacao-de-rotina`.

O projeto segue a seguinte convenção para o nome de branchs:

- `master`: versão estável já testada do software
- `unstable`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software
- `doc`: versão de desenvolvimento da documentação

Quanto à gerência de issues, o projeto adota a seguinte convenção para
etiquetas:

- `bugfix`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

## Hospedagem

> O site utiliza a plataforma do [Heroku](https://devcenter.heroku.com/start) como ambiente de hospedagem do >site do projeto .Ele por sua vez foi conectado ao github do projeto assim seu branch `master` que ao ser >alterado, por uma submissão (push) efetuada via git, a versão do código na hospedagem do Heroku também será >alterado automaticamente.
>
> O site é mantido no ambiente da URL:
> https://organizacao-de-rotina.herokuapp.com/
