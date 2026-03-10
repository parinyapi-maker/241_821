const bodyParser = require('body-parser');
const express = require('express')
const mysql = require('mysql2/promise')
const app = express();

const port = 8000

app.use(bodyParser.json())
let users = []
let counter = 1

let conn = null
const initDBConnection = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8821
    })
}

app.get('/users',async (req,res) => {
    const results = await conn.query("SELECT * FROM users")
    res.json(results[0])
})

// app.get('/testdb-new', async (req, res) => { 
//     try {
//         const tempConn = await mysql.createConnection({
//             host: 'localhost',
//             user: 'root',
//             password: 'root',
//             database: 'webdb', 
//             port: 8821
//         });

//         const [results] = await tempConn.query('SELECT * FROM users');
//         await tempConn.end(); // ควรปิด connection ทุกครั้งที่สร้างใหม่
//         res.json(results); // ส่ง results ทั้งหมด
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Database query error' });
//     }
// });


// //path = /test
// app.get('/test',(req,res) => {

//     //let users = {
//     //    name: 'John Doe',
//     //    age: 30,
//     //    email: 'johndoe@example.com'
//     //}

//     res.json(users);
// });
const validateData = (userData) => {
    let errors = [];
    if (!userData.firstname) {
        errors.push('กรุณากรอกชื่อ');
    }
    if (!userData.lastname) {
        errors.push('กรุณากรอกนามสกุล');
    }
    if (!userData.age) {
        errors.push('กรุณากรอกอายุ');
    }
    if (!userData.gender) {
        errors.push('กรุณาเลือกเพศ');
    }
    if (!userData.interests) {
        errors.push('กรุณาเลือกความสนใจอย่างน้อย 1 อย่าง');
    }
    if (!userData.description) {
        errors.push('กรุณากรอกคำอธิบายเกี่ยวกับตัวคุณ');
    }
    return errors;
}

//path = POST /user
app.post('/users',async (req,res) => {
    try{
        let user = req.body
        const errors = validateData(user);
        if (errors.length > 0) {
            throw {
                message: 'Invalid user data',
                errors: errors
            }
        }
        const results = await conn.query('INSERT INTO users SET ?',user)
    console.log('results:',results)
    res.json({
        message: 'User created successfully',
        data: results[0]
    })
    } catch (error) {
        const errorMessage = error.message || 'Error creating user';
        const errors = error.errors || [];
        console.error('Error creating user:', error.message);
        res.status(500).json({
            message: 'errorMessage',
            error: error
        })
    }
})
//path GET /users/:id สำหรับ get ข้อมูล user ที่มี id ตรงกับที่ส่งมา
app.get('/users/:id',async (req,res) => {
    try {
        let id = req.params.id
        const results = awaitconn.query('SELECT * FROM users WHERE id = ?',id)
        if(results[0].length == 0 ) {
            throw {statusCode: 404, message: 'User not found'};
        }
        res.json(results[0][0]);
    }
    catch (error) {
        console.error('Error fetching user:',error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error fetching user',
            error: error.message
        });
    }
})

// PUT
app.put('/users/:id', async (req,res) => {
    try {
        let id = req.params.id
        let updatedUser = req.body;
        const results = await conn.query('UPDATE users SE ? WHERE id = ?',[updatedUser,id])
        if (results[0].affectedRows == 0) {
            throw { statusCode: 404, message: 'User not found'};
        }
        res.json({
            message: 'User updated successfully',
            data: updatedUser
        });
    }
    catch (error) {
        console.error('Error updating user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error updating user',
            error: error.message
        })
    }
});
// DELETE /users/:id สำหรับลบ user ที่มี id ตรงกับที่ส่งมา
app.delete('/users/:id', async (req,res) => {
    try {
        let id = req.params.id
        const results = await conn.query('DELETE FROM users WHERE id = ?',id)
        if (results[0].affectedRows == 0) {
            throw { statusCode: 404, message: 'User not found'};
        }
        res.json({
            message: 'User deleted successfully'
        });
    }
    catch(error) {
        console.error('Error deleting user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
})


    // let user = req.body;
    // users.id(user);
    // counter += 1;
    // users.push(user);
    // res.json({
    //     message: "User added successfully",
    //     user: user });
    // })

    //path = PUT /user/:id
    // app.put('/user/:id', (req, res) => {
    // let id = req.params.id;
    // let updatedUser = req.body;

    //     //user จาก id ที่ส่งมา
    //     let selectedIndex = users.findIndex(user => user.id == id);

    //     //อัพเดตข้อมูล user
    //     if (updatedUser.name) {
    //         users[selectedIndex].name = updatedUser.name;
    //     }
    //     if (updatedUser.email) {
    //         users[selectedIndex].email = updatedUser.email;
    //     }

    //     users[selectedIndex] = {
    //         ...users[selectedIndex],
    //         name: updatedUser.name || users[selectedIndex].name,
    //         email: updatedUser.email || users[selectedIndex].email
    //     };

    //     //ส่งข้อมูล update ส่ง response กลับไป
    //     res.json({
    //         message: 'User updated successfully',
    //         data:{
    //             user: updatedUser,
    //             indexUpdated: selectedIndex
    //         }
    //     })
    //     res.send(selectedIndex + '');
    //     res.send(id);
    // })
    //path DELETE /user/:id
//     app.delete('/user/:id', (req, res) => {
//     let id = req.params.id;
//     let selectedIndex = users.findIndex(user => user.id == id);
//     if (selectedIndex !== -1) {
//         users.splice(selectedIndex, 1);
//         res.json({
//             message: 'User deleted successfully',
//             indexDeleted: selectedIndex
//         });
//     } else {
//         res.status(404).json({
//             message: 'User not found'
//         });
//     }
// }); 

app.listen(port, async () => {
    await initDBConnection()
    console.log(`Server is running on port ${port}`)
})