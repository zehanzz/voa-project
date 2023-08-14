import { dbUtil } from "../dbUtil.js";

export const shows = (req, res) => {

    const q = "SELECT * FROM hzb_show";

    dbUtil.query(q, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        // console.log(result);
        return res.status(200).json(result);
    });
}

export const addShow = (req, res) => {
    // INSERT INTO hzb_show (
    //     name,
    //     description,
    //     type,
    //     s_time,
    //     e_time,
    //     wchair_access,
    //     price
    //   )
    // VALUES (
    //     'Drama Show 2',
    //     'This is a drama sasdftional performances.',
    //     'Drama',
    //     '2023-04-04',
    //     '2023-04-04',
    //     '1',
    //     11
    //   );
    const q = "INSERT INTO hzb_show (name, description, type, s_time, e_time, wchair_access, price) VALUES (?, ?, ?, ?, ?, ?, ?);";
    dbUtil.query(q, [req.body.name, req.body.description, req.body.type, req.body.s_time, req.body.e_time, req.body.wchair_access, req.body.price], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        // console.log(result);
        return res.status(200).json("Show added successfully");
    });
}

export const updateShow = (req, res) => {
    const q = "UPDATE hzb_show SET name = ?, description = ?, type = ?, s_time = ?, e_time = ?, wchair_access = ?, price = ? WHERE show_id = ?;";

    dbUtil.query(q, [req.body.name, req.body.description, req.body.type, req.body.s_time, req.body.e_time, req.body.wchair_access, req.body.price, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json("Show updated successfully");
    });
}

export const deleteShow = (req, res) => {
    // console.log(req.params.id);
    const q = "DELETE FROM hzb_show WHERE show_id = ?;";
    dbUtil.query(q, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        // console.log(result);
        return res.status(200).json("Show deleted successfully");
    });
}