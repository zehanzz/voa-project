import { dbUtil } from "../dbUtil.js";

export const summ = (req, res) => {
    // GET http://localhost:8080/api/summ/2023-05-01
    const q = "CALL fetch_data(?)";
    const date = req.params.date;

    dbUtil.query(q, [date], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        // console.log(result);
        return res.status(200).json(result);
    });
}