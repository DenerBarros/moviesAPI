// Fazendo o import do sqlite
const sqlite3 = require("sqlite3"); // responsável pelo drive
const sqlite = require("sqlite"); // responsável pela conexão

// Usando uma biblioteca para resolver os endereços
const path = require("path")

async function sqliteConnection(){
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"), // Local onde ficará salvo
        driver: sqlite3.Database
    });

    return database;
}

module.exports = sqliteConnection;