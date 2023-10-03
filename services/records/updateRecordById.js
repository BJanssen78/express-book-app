import recordData from "../../data/records.json" assert { type: "json" };

const updateRecordById = (id, title, artist, year, available, genre) => {
  const record = recordData.records.find((record) => record.id === id);

  if (!record) {
    throw new Error(`record with id ${id} was not found!`);
  }

  record.title = title ?? record.title;
  record.author = artist ?? record.artist;
  record.isbn = year ?? record.year;
  record.available = available ?? record.available;
  record.genre = genre ?? record.genre;

  return record;
};

export default updateRecordById;
