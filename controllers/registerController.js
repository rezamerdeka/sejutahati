const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbConnection').promise();

exports.register = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await conn.execute(
            "SELECT `username` FROM `users` WHERE `username`=?",
            [req.body.username]
          );

        if (row.length > 0) {
            return res.status(201).json({
                message: "Username tidak tersedia",
            });
        }

        const hashPass = await bcrypt.hash(req.body.password, 12);

        const [rows] = await conn.execute('INSERT INTO `users`(`username`,`password`) VALUES(?,?)',[
            req.body.username,
            hashPass
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "Username berhasil di daftarkan",
            });
        }
        
    }catch(err){
        next(err);
    }
}
