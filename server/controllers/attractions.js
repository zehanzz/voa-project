import { dbUtil } from "../dbUtil.js";

export const attractions = (req, res) => {

    const q = "SELECT * FROM hzb_attract";

    dbUtil.query(q, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        // console.log(result);
        return res.status(200).json(result);
    });
}

export const addAttraction = (req, res) => {

    const q = "INSERT INTO hzb_attract (name, description, type, status, cpacity,  min_height, duration, section) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";

    dbUtil.query(q, [
        req.body.name,
        req.body.description,
        req.body.type,
        req.body.status,
        req.body.cpacity,
        req.body.min_height,
        req.body.duration,
        req.body.section
    ], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        // console.log(result);
        return res.status(200).json("Attraction added successfully");
    });
}

export const updateAttraction = (req, res) => {
    const q = "UPDATE hzb_attract SET name = ?, description = ?, type = ?, status = ?, cpacity = ?, min_height = ?, duration = ?, section = ? WHERE attract_id = ?;";

    dbUtil.query(q, [req.body.name, req.body.description, req.body.type, req.body.status, req.body.cpacity, req.body.min_height, req.body.duration, req.body.section, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json("Attraction updated successfully");
    });
}

export const deleteAttraction = (req, res) => {
    console.log(req.params.id);
    const q = "DELETE FROM hzb_attract WHERE attract_id = ?;";
    dbUtil.query(q, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        console.log(result);
        return res.status(200).json("Attraction deleted successfully");
    });
}