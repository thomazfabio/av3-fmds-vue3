const connection = require('./db');

const sqlInsert = 'INSERT INTO `collaborator`(`first_name`, `task_function`, `description`) VALUES (?, ?, ?)';

async function insertCollaborator(data, callback) {
    const values = [data.name, data.function, data.description];
    connection.execute(sqlInsert, values, (err, result, fields) => {
        if (err instanceof Error) {
            console.log(err);
            callback(err, null, null); // Chamando o callback com o erro
            return;
        }
        console.log(result);
        callback(null, result, fields); // Chamando o callback com os resultados e campos
    });
}

//função get all
const sqlGetAll = 'SELECT * FROM collaborator';
async function getAllCollaborator(callback) {
    connection.execute(sqlGetAll, (err, result, fields) => {
        if (err instanceof Error) {
            console.log(err);
            callback(err, null, null); // Chamando o callback com o erro
            return;
        }
        console.log(result);
        callback(null, result); // Chamando o callback com os resultados e campos
    });
}
//função get by id
const sqlGetById = 'SELECT * FROM collaborator WHERE id = ?';
async function getCollaboratorById(id, callback) {
    connection.execute(sqlGetById, [id], (err, result, fields) => {
        if (err instanceof Error) {
            console.log(err);
            callback(err, null, null); // Chamando o callback com o erro
            return;
        }
        console.log(result);
        callback(null, result); // Chamando o callback com os resultados e campos
    });
}

//função delete by id
const sqlDeleteById = 'DELETE FROM collaborator WHERE id = ?';
async function deleteCollaboratorById(id, callback) {
    connection.execute(sqlDeleteById, [id], (err, result, fields) => {
        if (err instanceof Error) {
            console.log(err);
            callback(err, null, null); // Chamando o callback com o erro
            return;
        }
        console.log(result);
        console.log(fields);
        console.log('delete agora');
        callback(null, result); // Chamando o callback com os resultados e campos
    });
}

// função update by id
const sqlUpdateById = 'UPDATE collaborator SET first_name = ?, task_function = ?, description = ? WHERE id = ?';
async function updateCollaboratorById(id, name, task_function, description, callback) {
    connection.execute(sqlUpdateById, [name, task_function, description, id], (err, result, fields) => {
        if (err instanceof Error) {
            console.log(err);
            callback(err, null, null); // Chamando o callback com o erro
            return;
        }
        console.log(result);
        console.log(fields);
        console.log('update agora');
        callback(null, result); // Chamando o callback com os resultados e campos
    });
}



module.exports = { insertCollaborator, getAllCollaborator, getCollaboratorById, deleteCollaboratorById, updateCollaboratorById };