import { dbUtil } from "../dbUtil.js";

export const store = (req, res) => {

    const q = "SELECT * FROM hzb_store";

    dbUtil.query(q, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        // console.log(result);
        return res.status(200).json(result);
    });
}

export const addStore = (req, res) => {
    // INSERT INTO hzb_store (
    //     name,
    //     category,
    //     description,
    //     menu_item,
    //     unit_price
    //   )
    // VALUES (
    //     'Food Stall 2',
    //     'Food Stall',
    //     'This is another food stall selling snacks and beverages.',
    //     'Fries',
    //     3
    //   );
    const q = "INSERT INTO hzb_store (name, category, description, menu_item, unit_price) VALUES (?, ?, ?, ?, ?);";
    dbUtil.query(q, [req.body.name, req.body.category, req.body.description, req.body.menu_item, req.body.unit_price], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        // console.log(result);
        return res.status(200).json("Store added successfully");
    });
}

export const updateStore = (req, res) => {
    const q = "UPDATE hzb_store SET name = ?, category = ?, description = ?, menu_item = ?, unit_price = ? WHERE store_id = ?;";
    dbUtil.query(q, [req.body.name, req.body.category, req.body.description, req.body.menu_item, req.body.unit_price, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json("Store updated successfully");
    });
}

export const deleteStore = (req, res) => {
    const q = "DELETE FROM hzb_store WHERE store_id = ?;";
    dbUtil.query(q, [req.params.id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        return res.status(200).json("Store deleted successfully");
    });
}