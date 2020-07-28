const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dash',
    password: 'admin',
    port: 5432,
})
// const getUsers = (request, response) => {
//     const query = "SELECT * FROM dash.newtable"
//     pool.query(query, (error, results) => {
//         if (error) {
//             response.status(400).send({
//                 message: 'bad request'
//             })
//         }
//         else
//             response.status(200).send({ "response": results })
//     }
// }
const getUsers = (request, response) => {
    const query = "SELECT * FROM dash.newtable"
    console.log(query)
    pool.query(query, (error, results) => {
        if (error) {
            response.status(400).send({
                message: 'bad request'
            })
        }
        else
            response.status(200).send({ response: results.rows })
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    console.log(request.body.payload)
    const { name, shop, status, id } = request.body.payload
    if (id) {
        const query = `UPDATE dash.newtable SET name = '${name}', shop = '${shop}', status =  '${status}' WHERE id = ${id}`
        console.log(query)
        pool.query(query, (error, results, rows) => {
            if (error) {
                response.status(400).send({
                    message: 'bad request'
                })
            }
            else
                response.status(200).send({ response: request.body.payload })
        })
    }
    else {
        const query = `INSERT INTO dash.newtable (name, shop, status) VALUES ('${name}', '${shop}', '${status}')`
        console.log(query)
        pool.query(query, (error, results, rows) => {
            if (error) {
                response.status(400).send({
                    message: 'bad request'
                })
            }
            else
                response.status(200).send({ response: request.body.payload })
        })
    }

}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query(`DELETE FROM dash.newtable WHERE id = ${id}`, (error, results) => {
        if (error) {
            response.status(400).send(`errow while deleting with ID: ${id}`)
        }
        response.status(200).send({ id })
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}