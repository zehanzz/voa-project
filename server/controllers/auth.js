import { dbUtil } from "../dbUtil.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = (req, res) => {
    console.log(req.body);
    // check if user exists
    const q = "SELECT * FROM hzb_visitor WHERE email = ?";

    dbUtil.query(q, [req.body.email], (err, result) => {
        if (err) {
            return res.status(500).json(err.sqlMessage);
        }

        if (result.length > 0) {
            return res.status(409).json("User already exists!");
        }

        // encypt password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        // insert user into db
        const q = "INSERT INTO hzb_visitor (fname, lname, gender, street, city, state, zipcode, country, email, password, cell_num, dob, type, visit_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [
            req.body.fname,
            req.body.lname,
            req.body.gender,
            req.body.street,
            req.body.city,
            req.body.state,
            req.body.zipcode,
            req.body.country,
            req.body.email,
            hashedPassword,
            req.body.cell_num,
            req.body.dob,
            req.body.type,
            req.body.visit_date
        ];

        dbUtil.query(q, values, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            return res.status(200).json("User created");
        });
    })
}

export const login = (req, res) => {
    // check if user exists
    const q = "SELECT * FROM hzb_visitor WHERE email = ?";
    dbUtil.query(q, [req.body.email], (err, result) => {
        if (err) {
            return res.status(500).json(err.sqlMessage);
        }

        if (result.length === 0) {
            return res.status(404).json("User not found!");
        }

        // check if password is correct
        const passwordMatch = bcrypt.compareSync(req.body.password, result[0].password);
        if (!passwordMatch) {
            return res.status(401).json("Wrong email or password");
        }

        // generate token
        const token = jwt.sign({ email: req.body.email }, "secret", { expiresIn: "1h" });
        const { password, ...other } = result[0];


        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other)

    });


}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User logged out");
}