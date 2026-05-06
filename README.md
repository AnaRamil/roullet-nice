# 🎲 Roulette Nice

Um gerador de números aleatórios elegante e intuitivo com interface moderna e animações suaves.

## 📋 Descrição

**Roulette Nice** é uma aplicação web que permite sorteiar números de forma simples e personalizada. Com um design sofisticado em tons de roxo e gradientes, a aplicação oferece uma experiência visual agradável e funcionalidades robustas para diferentes necessidades de sorteio.

## ✨ Características

- 🎯 **Sorteio Personalizável**: Configure quantidade, valor mínimo e máximo
- 🔄 **Sem Repetição**: Opção para sorteios sem números repetidos
- 💾 **Persistência**: Configurações salvas automaticamente no navegador
- 🎬 **Animações**: Resultados apresentados com animações fluidas e atrativas
- 📊 **Contador de Sorteios**: Rastreia sorteios consecutivos em tempo real
- 📱 **Responsivo**: Funciona perfeitamente em desktop e dispositivos móveis
- 🔐 **Seguro**: Usa criptografia nativa do navegador (crypto API)

## 🚀 Como Usar

1. **Defina os Parâmetros**:
   - **Quantidade**: Quantos números deseja sortear (1 ou mais)
   - **Mínimo**: Valor mínimo do intervalo (≥ 0)
   - **Máximo**: Valor máximo do intervalo

2. **Opções Adicionais**:
   - Ative "Não Repetir" para garantir que nenhum número apareça duas vezes

3. **Clique em "SORTEAR"**: Visualize o resultado com animação

4. **Sorteie Novamente**: Use o botão "Sortear Novamente" para mais sorteios rápidos sem resetar o formulário

5. **Voltar ao Início**: Clique em "Voltar" para resetar tudo

## 💻 Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Design responsivo com gradientes e animações
- **JavaScript (Vanilla)**: Lógica sem dependências externas
- **Web Storage API**: Persistência de dados local
- **Crypto API**: Geração segura de números aleatórios

## 📁 Estrutura do Projeto

```
roulette-nice/
├── index.html          # Estrutura HTML
├── script.js           # Lógica da aplicação
├── style.css           # Estilos e animações
├── assets/
│   └── Shapes.png      # Textura de fundo
└── README.md           # Este arquivo
```

## 🎨 Design

A aplicação apresenta uma interface moderna com:

- **Paleta de Cores**: Roxo, rosa, azul e verde em tons sofisticados
- **Tipografia**: Fontes "Sora", "Roboto Flex" e "Roboto Mono"
- **Animações**: Efeitos de transição suave e pop nas animações de resultado
- **Layout**: Coluna dupla em desktop, responsivo em mobile

## 🔧 Configurações Padrão

| Campo       | Padrão   | Mínimo   | Máximo               |
| ----------- | -------- | -------- | -------------------- |
| Quantidade  | 1        | 1        | Depende do intervalo |
| Mínimo      | 1        | 0        | Qualquer             |
| Máximo      | 100      | > Mínimo | Qualquer             |
| Sem Repetir | Desativo | -        | -                    |

## ⚙️ Requisitos

- Navegador moderno com suporte a:
  - JavaScript ES6+
  - Web Storage API
  - Crypto API
  - CSS3 (Grid, Flexbox, Gradientes)

## 📝 Validações

A aplicação realiza validações automáticas:

- Quantidade deve ser no mínimo 1
- Mínimo deve ser ≥ 0
- Máximo deve ser > Mínimo
- Quantidade não pode exceder o intervalo disponível
- Com "não repetir", a quantidade não pode exceder o intervalo

## 🎲 Lógica de Contagem

O contador de sorteios funciona assim:

- Cada sorteio rápido (< 1.2s) incrementa o contador
- Após 1.2s de inatividade, o contador reinicia em 1
- Exibe como "1º RESULTADO", "2º RESULTADO", etc.

## 📱 Responsividade

- **Desktop** (> 820px): Layout com duas colunas
- **Tablet** (≤ 820px): Layout de coluna única
- **Mobile** (≤ 480px): Otimizado para telas pequenas

## 💡 Funcionalidades Futuras

- [ ] Histórico de sorteios
- [ ] Exportar resultados
- [ ] Temas personalizados
- [ ] Estatísticas de distribuição
- [ ] Modo escuro/claro

## 📄 Licença

Projeto de formação Desenvolvimento Fullstack da Faculdade de Tecnologia Rocketseat.

## 👤 Autor

**Ana Paula Ramil**  
GitHub: [@AnaRamil](https://github.com/AnaRamil)

---

Desenvolvido com ❤️ e JavaScript puro.
