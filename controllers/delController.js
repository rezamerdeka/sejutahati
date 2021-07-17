const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.delUser = async (req,res,next) => {

    try{

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

        const [row] = await conn.execute(
            "DELETE FROM `users` WHERE `id`=?",
            [decoded.id]
        );

        if(row.length > 0){
            return res.json({
                user:row[0]
            });
        }

	res.status(200).json({
	    message: "User berhasil di delete",
	});
	
        res.json({
            message:"User tidak di temukan"
        });

    }
    catch(err){
        next(err);
    }
}
