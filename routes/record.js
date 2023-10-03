import express from "express";
import getRecords from "../services/records/getRecords.js";
import getRecordById from "../services/records/getRecordById.js";
import createRecord from "../services/records/createRecord.js";
import updateRecordById from "../services/records/updateRecordById.js";
import deleteRecord from "../services/records/deleteRecord.js";
import authMiddleware from "../middleware/auth.js";

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
  try {
    const { genre, available } = req.query;
    const records = getRecords(genre, available);
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).send("something went wrong getting the list of records.");
  }
});

recordsRouter.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const record = getRecordById(id);

    if (!record) {
      res.status(404).send(`Record with id ${id} was not found!`);
    } else {
      res.status(200).json(record);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong getting your record by id!");
  }
});

recordsRouter.post("/", authMiddleware, (req, res) => {
  try {
    const { title, artist, year, available, genre } = req.body;
    const newRecord = createRecord(title, artist, year, available, genre);
    res.status(201).json(newRecord);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while creating new book!");
  }
});

recordsRouter.put("/:id", authMiddleware, (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while updating record by id!");
  }
});

recordsRouter.delete("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecordId = deleteRecord(id);

    if (!deletedRecordId) {
      res.status(404).send(`Record with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `Record with id ${deletedRecordId} was deleted!`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while deleting record by id!");
  }
});

export default recordsRouter;
