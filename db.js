const fs = require('fs/promises');
const path = require('path');

class DatabaseConnection {
    constructor(dbURL) {
        this.db = null;
        this.dbURL = dbURL;
    }

   async read(){
        const data = await fs.readFile(this.dbURL, 'utf-8');
        this.db = JSON.parse(data);
    }

    async write(){
        if (this.db){
            await fs.writeFile(this.dbURL, JSON.stringify(this.db));
        }
    }

    async getBd(){
        if (!this.db){
            await this.read();
        }
        return this.db;
    }
}

const connection = new DatabaseConnection(path.resolve(process.env.DB_URL));

module.exports = connection;
