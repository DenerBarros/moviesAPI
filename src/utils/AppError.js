class AppError {
    message;
    statusCode;

    // método construtor é carregado automaticamente quando a classe é instanciada
    constructor(message, statusCode = 400){
    // Toda vez que alguem chamar essa classe será informada a message e o statusCode
    
    this.message = message;
    // O this faz o uso da message que vem do contrutor e joga para o contexto global da classe

    this.statusCode = statusCode;
    } 
}


module.exports = AppError;