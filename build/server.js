"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
// statt import fs from ’fs’;
const fs = fs_1.default.promises;
// type of fs gets inferred through baseFS.promises
//https://stackoverflow.com/questions/34628305/using-promises-with-fs-readfile-in-a-loop
const app = express_1.default();
const port = 3000;
app.use('/test', express_1.default.static('public/test')); //eg http://localhost:3000/api/test/index.html
app.use(express_1.default.json());
let database = new Array();
let maxUser = 0;
function User_number() {
    let num = -1;
    database.forEach(() => { num++; });
    return num;
}
let maxList = 0;
function List_number() {
    let num = -1;
    database.forEach(user => user.lists.forEach(() => ++num));
    return num;
}
let maxTask = 0;
function Task_number() {
    let num = -1;
    database.forEach(user => user.lists.forEach(list => list.tasks.forEach(() => ++num)));
    return num;
}
async function readdata() {
    try {
        const data = JSON.parse(await fs.readFile('data/database.json', 'utf-8')); //must specify the encoding 
        data.forEach((user) => { database.push(user); });
        console.log(database[1]);
        console.log(database[0].lists[0]);
        console.log(database[0].lists[0].tasks);
        //have to pue these inside cuz max numbers must be calculated after databased is initiallized.
        maxUser = User_number();
        maxList = List_number();
        maxTask = Task_number();
    }
    catch (e) {
        console.log('error: ', e);
    }
}
readdata();
/*(async () => {
    const content = JSON.parse(await readdata());
    console.log(content);
    content.forEach((user: user)=>{database.push(user);});
})(); //auto call */
//https://stackoverflow.com/questions/40593875/using-filesystem-in-node-js-with-async-await
async function rewrite(data) {
    await fs.writeFile('data/database.json', JSON.stringify(data, null, 4), 'utf-8');
}
app.route('/api/users')
    .get(function (req, res) {
    const ids = [];
    for (const id in database) {
        ids.push(database[id].userID); //you can push to const arr, its not reassignment
    }
    res.send(JSON.stringify(ids)); //cant loop send or have multiple send
})
    .post(function (req, res) {
    const name = req.body.name;
    if (typeof (name) !== 'string') {
        res.status(400).end(JSON.stringify({ error: 'wrong input value types' }));
    }
    else {
        database.push({ user: name, userID: ++maxUser, lists: [] });
        rewrite(database);
        res.status(201).send(JSON.stringify(database[maxUser]));
    }
});
app.route('/api/users/:userID')
    .get(function (req, res) {
    const ID = parseInt(req.params.userID);
    if (isNaN(ID) || ID > maxUser || ID < 0) {
        res.status(404).end(JSON.stringify({ error: 'wrong URL or parameter dosen\'t exits in database' }));
    }
    else {
        res.send(JSON.stringify(database[ID]));
    }
})
    .patch(function (req, res) {
    const ID = parseInt(req.params.userID);
    const name = req.body.name;
    if (typeof (name) !== 'string') {
        res.status(400).end(JSON.stringify({ error: 'wrong input value types' }));
    }
    if (isNaN(ID) || ID > maxUser || ID < 0) {
        res.status(404).end(JSON.stringify({ error: 'wrong URL or parameter dosen\'t exits in database' }));
    }
    else {
        database[ID].user = name;
        rewrite(database);
        res.send(JSON.stringify(database[ID]));
    }
})
    .delete(function (req, res) {
    const ID = parseInt(req.params.userID);
    if (isNaN(ID) || ID > maxUser || ID < 0) {
        res.status(404).end(JSON.stringify({ error: 'wrong URL or parameter dosen\'t exits in database' }));
    }
    else {
        database = database.filter(i => {
            if (i.userID !== ID) { //i auto iterates all user obj 
                return true;
            }
            return false;
        });
        rewrite(database);
        res.send(JSON.stringify(database));
    }
});
app.route('/api/users/:userID/lists')
    .get(function (req, res) {
    const ID = parseInt(req.params.userID);
    const ids = [];
    if (isNaN(ID) || ID > maxUser || ID < 0) {
        res.status(404).end(JSON.stringify({ error: 'wrong URL or parameter dosen\'t exits in database' }));
    }
    else {
        for (const list in database[ID].lists) {
            ids.push(database[ID].lists[list].listID);
        }
        res.send(JSON.stringify(ids));
    }
})
    .post(function (req, res) {
    const ID = parseInt(req.params.userID);
    const name = req.body.name;
    if (typeof (name) !== 'string') {
        res.status(400).end(JSON.stringify({ error: 'wrong input value types' }));
    }
    if (isNaN(ID) || ID > maxUser || ID < 0) {
        res.status(404).end(JSON.stringify({ error: 'wrong URL or parameter dosen\'t exits in database' }));
    }
    else {
        const unique_listlen = database[ID].lists.length;
        database[ID].lists.push({ name: name, listID: ++maxList, tasks: [] });
        rewrite(database);
        res.status(201).send(JSON.stringify(database[ID].lists[unique_listlen]));
    }
});
app.route('/api/users/:userID/lists/:listID')
    .get(function (req, res) {
    const userID = parseInt(req.params.userID);
    const listID = parseInt(req.params.listID);
    if (isNaN(userID) || userID > maxUser || userID < 0 || isNaN(listID) || listID > maxList || listID < 0) {
        res.status(404).end(JSON.stringify({ error: 'wrong URL or parameter dosen\'t exits in database' }));
    }
    else {
        database[userID].lists.forEach(list => {
            if (list.listID === listID) {
                res.send(JSON.stringify(list));
            }
        });
    }
})
    .patch(function (req, res) {
    const userID = parseInt(req.params.userID);
    const listID = parseInt(req.params.listID);
    const name = req.body.name;
    if (typeof (name) !== 'string') {
        res.status(400).end(JSON.stringify({ error: 'wrong input value types' }));
    }
    if (isNaN(userID) || userID > maxUser || userID < 0 || isNaN(listID) || listID > maxList || listID < 0) {
        res.status(404).end(JSON.stringify({ error: 'wrong URL or parameter dosen\'t exits in database' }));
    }
    else {
        database[userID].lists.forEach(list => {
            if (list.listID === listID) {
                list.name = name;
                rewrite(database);
                res.send(JSON.stringify(list));
            }
        });
    }
})
    .delete(function (req, res) {
    const userID = parseInt(req.params.userID);
    const listID = parseInt(req.params.listID);
    if (isNaN(userID) || userID > maxUser || userID < 0 || isNaN(listID) || listID > maxList || listID < 0) {
        res.status(404).end(JSON.stringify({ error: 'wrong URL or parameter dosen\'t exits in database' }));
    }
    else {
        database[userID].lists = database[userID].lists.filter(i => {
            if (i.listID !== listID) {
                return true;
            }
            return false;
        });
        rewrite(database);
        res.send(JSON.stringify(database[userID].lists));
    }
});
app.route('/api/users/:userID/lists/:listID/tasks')
    .get(function (req, res) {
    const userID = parseInt(req.params.userID);
    const listID = parseInt(req.params.listID);
    const ids = [];
    if (isNaN(userID) || userID > maxUser || userID < 0 || isNaN(listID) || listID > maxList || listID < 0) {
        res.status(404).send(JSON.stringify({ error: 'wrong URL or parameter dosen\'t exits in database' }));
    }
    else {
        database[userID].lists.forEach(list => {
            if (list.listID === listID) {
                for (const task in list.tasks) {
                    ids.push(list.tasks[task].taskID);
                }
                res.send(JSON.stringify(ids));
            }
        });
    }
})
    .post(function (req, res) {
    const userID = parseInt(req.params.userID);
    const listID = parseInt(req.params.listID);
    const name = req.body.name;
    if (typeof (name) !== 'string') {
        res.status(400).end(JSON.stringify({ error: 'wrong input value types' }));
    }
    if (isNaN(userID) || userID > maxUser || userID < 0 || isNaN(listID) || listID > maxList || listID < 0) {
        res.status(404).end(JSON.stringify({ error: 'wrong URL or parameter dosen\'t exits in database' }));
    }
    else {
        database[userID].lists.forEach(list => {
            if (list.listID === listID) {
                const unique_tasklen = list.tasks.length;
                list.tasks.push({ name: name, taskID: ++maxTask, done: false });
                rewrite(database);
                res.status(201).send(JSON.stringify(list.tasks[unique_tasklen]));
            }
        });
    }
});
app.route('/api/users/:userID/lists/:listID/tasks/:taskID')
    .get(function (req, res) {
    const userID = parseInt(req.params.userID);
    const listID = parseInt(req.params.listID);
    const taskID = parseInt(req.params.taskID);
    if (isNaN(userID) || userID > maxUser || userID < 0 || isNaN(listID) || listID > maxList || listID < 0 || isNaN(taskID) || taskID > maxTask || taskID < 0) {
        res.status(404).send(JSON.stringify({ error: 'wrong URL or parameter dosen\'t exits in database' }));
    }
    else {
        database[userID].lists.forEach(list => {
            if (list.listID === listID) {
                list.tasks.forEach(task => {
                    if (task.taskID === taskID) {
                        res.send(JSON.stringify(task));
                    }
                });
            }
        });
    }
})
    .patch(function (req, res) {
    const userID = parseInt(req.params.userID);
    const listID = parseInt(req.params.listID);
    const taskID = parseInt(req.params.taskID);
    const name = req.body.name;
    const done = req.body.done;
    if (typeof (done) !== 'boolean' || typeof (name) !== 'string') {
        res.status(400).end(JSON.stringify({ error: 'wrong input value types' }));
    }
    if (isNaN(userID) || userID > maxUser || userID < 0 || isNaN(listID) || listID > maxList || listID < 0 || isNaN(taskID) || taskID > maxTask || taskID < 0) {
        res.status(404).end(JSON.stringify({ error: 'wrong URL or parameter dosen\'t exits in database' }));
    }
    else {
        database[userID].lists.forEach(list => {
            if (list.listID === listID) {
                list.tasks.forEach(task => {
                    if (task.taskID === taskID) {
                        task.name = name;
                        task.done = done;
                        rewrite(database);
                        res.send(JSON.stringify(task));
                    }
                });
            }
        });
    }
})
    .delete(function (req, res) {
    const userID = parseInt(req.params.userID);
    const listID = parseInt(req.params.listID);
    const taskID = parseInt(req.params.taskID);
    if (isNaN(userID) || userID > maxUser || userID < 0 || isNaN(listID) || listID > maxList || listID < 0 || isNaN(taskID) || taskID > maxTask || taskID < 0) {
        res.status(404).end(JSON.stringify({ error: 'wrong URL or parameter dosen\'t exits in database' }));
    }
    else {
        database[userID].lists.forEach(list => {
            if (list.listID === listID) {
                list.tasks = list.tasks.filter(i => {
                    if (i.taskID !== taskID) {
                        return true;
                    }
                    return false;
                });
            }
        });
        rewrite(database);
        res.send(database[userID].lists[listID].tasks);
    }
});
app.get('/api/multiuser', function (req, res) {
    const multiuser = true;
    res.send(JSON.stringify(multiuser));
});
app.get('/api/max_ids', function (req, res) {
    const ids = { userID: maxUser, listID: maxList, taskID: maxTask };
    res.send(JSON.stringify(ids));
});
app.listen(port, () => console.log(`app listening on port ${port}!`));
