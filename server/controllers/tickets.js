import { dbUtil } from "../dbUtil.js";

export const tickets = (req, res) => {

    const q = "SELECT * FROM hzb_tickets";

    dbUtil.query(q, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        // console.log(result);
        return res.status(200).json(result);
    });
}

export const addTicket = (req, res) => {
    // INSERT INTO hzb_tickets (method, prch_date, vist_date, type, price, visitor_id)
    // VALUES ('Online', '2023-05-01', '2023-06-30', 'Child', 20, 1);
    const q = "INSERT INTO hzb_tickets (method, prch_date, vist_date, type, price, visitor_id) VALUES (?, ?, ?, ?, ?, ?)";

    dbUtil.query(q, [req.body.method, req.body.prch_date, req.body.vist_date, req.body.type, req.body.price, req.body.visitor_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        console.log(result);
        return res.status(200).json("Ticket puchased successfully");
    });
}