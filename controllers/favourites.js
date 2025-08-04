import { pool } from "../database/pg.js";

// POST /favourites
export const addToFavourites = async (req, res) => {
    const userId = req.user.id;
    const { dishId } = req.body;

    if (!dishId) return res.status(400).json({ message: "Dish ID is required" });

    try {
        const result = await pool.query(
            "INSERT INTO favourites (user_id, dish_id) VALUES ($1, $2) RETURNING *",
            [userId, dishId]
        );
        res.status(201).json({ message: "Added to favourites", favourite: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};

// GET /favourites
export const getFavourites = async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await pool.query(
            "SELECT * FROM favourites WHERE user_id = $1",
            [userId]
        );
        res.status(200).json({ favourites: result.rows });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};

// DELETE /favourites/:dishId
export const removeFromFavourites = async (req, res) => {
    const userId = req.user.id;
    const dishId = req.params.dishId;

    try {
        const result = await pool.query(
            "DELETE FROM favourites WHERE user_id = $1 AND dish_id = $2 RETURNING *",
            [userId, dishId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Favourite not found" });
        }

        res.status(200).json({ message: "Removed from favourites", removed: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};
