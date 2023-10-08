import express from "express";
import getRecords from "../services/records/getRecords.js";
import getRecordById from "../services/records/getRecordById.js";
import createRecord from "../services/records/createRecord.js";
import updateRecordById from "../services/records/updateRecordById.js";
import deleteRecord from "../services/records/deleteRecord.js";
import authMiddleware from "../middleware/advancedAuth.js";
import NotFoundError from "../errors/NotFoundError.js";

const recordsRouter = express.Router();

const checkHeader = (req, res, next) => {
  if (req.get("X-Auth") === undefined) {
    res.status(400).send("Missing header X-Auth");
  } else {
    next();
  }
};

recordsRouter.use(checkHeader);

recordsRouter.get("/", (req, res) => {
  const { genre, available } = req.query;
  const records = getRecords(genre, available);
  res.status(200).json(records);
});

recordsRouter.get(
  "/:id",
  (req, res) => {
    const { id } = req.params;
    const record = getRecordById(id);

    res.status(200).json(record);
  },
  NotFoundError
);

recordsRouter.post("/", authMiddleware, (req, res) => {
  const { title, artist, year, available, genre } = req.body;
  const newRecord = createRecord(title, artist, year, available, genre);
  res.status(201).json(newRecord);
});

recordsRouter.put(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const { title, artist, year, available, genre } = req.body;
    const updatedRecord = updateRecordById(
      id,
      title,
      artist,
      year,
      available,
      genre
    );
    res.status(200).json(updatedRecord);
  },
  NotFoundError
);

recordsRouter.delete(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const deletedRecordId = deleteRecord(id);

    res.status(200).json({
      message: `Record with id ${deletedRecordId} was deleted!`,
    });
  },
  NotFoundError
);

export default recordsRouter;
