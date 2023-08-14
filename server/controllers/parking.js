import { dbUtil } from "../dbUtil.js";

export const parking = (req, res) => {

    const q = "SELECT * FROM hzb_parking";

    dbUtil.query(q, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        // console.log(result);
        return res.status(200).json(result);
    });
}

export const addParking = (req, res) => {
    // INSERT INTO hzb_parking (
    //     lot,
    //     spot_number,
    //     time_in,
    //     time_out,
    //     fee,
    //     visitor_id
    //   )
    // VALUES (
    //     'A',
    //     33,
    //     DATE '2023-05-01',
    //     DATE '2023-05-01',
    //     50,
    //     1
    //   );
    const q = "INSERT INTO hzb_parking (lot, spot_number, time_in, time_out, fee, visitor_id) VALUES (?, ?, ?, ?, ?, ?);";
    dbUtil.query(q, [req.body.lot, req.body.spot_number, req.body.time_in, req.body.time_out, req.body.fee, req.body.visitor_id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        // console.log(result);
        return res.status(200).json("Parking added successfully");
    });
}

export const updateParking = (req, res) => {
    const q = "UPDATE hzb_parking SET lot = ?, spot_number = ?, time_in = ?, time_out = ?, fee = ?, visitor_id = ? WHERE park_id = ?;";
    dbUtil.query(q, [req.body.lot, req.body.spot_number, req.body.time_in, req.body.time_out, req.body.fee, req.body.visitor_id, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        return res.status(200).json("Parking updated successfully");
    });
}

export const deleteParking = (req, res) => {
    console.log(req.params.id);
    const q = "DELETE FROM hzb_parking WHERE park_id = ?;";
    dbUtil.query(q, [req.params.id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        }

        return res.status(200).json("Parking deleted successfully");
    });
}