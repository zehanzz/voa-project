import { dbUtil } from "../dbUtil.js";

export const getLists = (req, res) => {
    console.log(req.body);
    const q = "SELECT * FROM ?";

    dbUtil.query(q, [req.query.table], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        return res.status(200).json(result);
    });
}

export const getList = (req, res) => {

}

export const addList = (req, res) => {

}

export const deleteList = (req, res) => {

}

export const updateList = (req, res) => {

}