const jwt = require('jsonwebtoken');
const db_connection = require("../dbConnection").promise();

exports.updateUser = async (req, res, next) => {
  
try {
  
    if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
       ){
            return res.status(422).json({
                message: "Token tidak ada",
            });
       }

        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

    	const [row] = await db_connection.execute(
        "SELECT * FROM `users` WHERE `id`=?",
        [decoded.id]
        );

        if (row.length === 0) {
        return res.status(404).json({
            message: "Invalid User ID",
          });
        }

        if (req.body.username) row[0].username = req.body.username;

        const [update] = await db_connection.execute(
          "UPDATE `users` SET `username`=? WHERE `id`=?",
            [row[0].username, decoded.id]
        );

        if (update.affectedRows === 1) {
          return res.json({
         message: "Username berhasil di update",
        });
   }  
   }
   catch (err) {
       next(err);
   }
}


