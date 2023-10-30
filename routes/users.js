import { Router } from "express";
import notFoundError from "../errors/NotFoundError.js";
import getUserOrders from "../services/users/getUserOrders.js";

const router = Router();

router.get(
  "/:id/orders",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userOrders = await getUserOrders(id);

      res.status(200).json(userOrders);
    } catch (error) {
      next(error);
    }
  },
  notFoundError
);

export default router;
