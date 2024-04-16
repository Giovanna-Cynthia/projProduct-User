const { rejects } = require('assert');
const fs = require('fs');
const path = require('path');
const deleteUser  = require('../controllers/userController');

__filename = 'user.json';
filePath = path.join(__dirname, "..", "database", __filename);

    class UsersRepository {
        static async getUsers() {
            return new Promise((resolve, reject) => {
                fs.readFile(filePath, 'utf8', (err, data) =>{
                    if (err) {
                        if (err.code === "ENOENT") {
                            this.writeUsersToFile([])
                            return[];
                        } else {
                            reject(err);
                        }
                    } else {
                        resolve(JSON.parse(data));
                    }
                });
            });
        }

        static async writeUsersToFile(users){
            return new Promise ((resolve, reject) =>{
                fs.writeFile(filePath, JSON.stringify(users), (err) =>{
                    if (err) reject(err);
                    console.log("Data written to file: ${filePath}");
                    resolve(this.getAllUsers());
                });
            });
        }

        static async getAllUsers(){
            const users = await this.getUsers();
            return users;
        }

        static async createUser(user) {
            const users = await this.getUsers();
            user.id = users.length + 1;
            users.push(user);
            const insertDB = await this.writeUsersToFile(users);
            return insertDB;
        }

        static async getUserById(id) {
            const users = await this.getUsers();
            return users.findIndex(user => user.id === parseInt(id));
        }

        static async updateUser(id, user) {
            const users = await this.getUsers();
            const index = users.findIndex(user => user.id === parseInt(id));
            if (index === -1) {
                return null;
            }
            users[index] = user;
            const updateDB = await this.writeUsersToFile(users);
            return updateDB;
        }

        static async deleteUser(id) {
            const users = await this.getUsers();
            const index = users.findIndex(user => user.id === parseInt(id));
            if(index === -1) {
                return null;
            } else{
                users.splice(index, 1);
            }
            await this.writeUsersToFile(users);
            return index;
        }
    }
module.exports = UsersRepository;