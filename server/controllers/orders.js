import { dbUtil } from "../dbUtil.js";

export const orders = (req, res) => {

    const q = "SELECT * FROM hzb_order";

    dbUtil.query(q, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        // console.log(result);
        return res.status(200).json(result);
    });
}