const { user } = require("../models/schema");

const handleGetAllUsers = async (req, res) => {
  const a = await user.find();
  return res.status(200).json(a);
};
const handleGetByIDUsers = async (req, res) => {
  const { na } = req.params;
  const data = await user.find({ firstName: na });
  console.log(data);
  return res.status(200).json(data);
};

const handlePostUsers = async (req, res) => {
  const body = req.body;
  await user.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    jobTitle: body.jobTitle,
  });
  return res.status(200).json(body);
};

const handleDeleteAllUsers = async (req, res) => {
  await user.deleteMany({});
  return res.status(200).send(`Data Deleted Sucessfully`);
};
const handleDeleteUserById = async (req, res) => {
  const { na } = req.params;
  await user.deleteOne({ firstName: na });
  return res.send("Data Deleted");
};

const handlePatchUser = async (req, res) => {
  try {
    const { na } = req.params;
    let data = await user.findOne({ firstName: na });
    if (!data) {
      throw new Error("no name exist!");
    }
    const body = req.body;
    console.log(req.body);
    for (a in body) {
      data[a] = body[a];
    }
    await data.save();
    return res.send("Data Updated sucessfully");
  } catch (err) {
    console.log(err);
    res.status(401).send(err.message);
  }
};

module.exports = {
  handleDeleteAllUsers,
  handleDeleteUserById,
  handleGetAllUsers,
  handleGetByIDUsers,
  handlePatchUser,
  handlePostUsers,
};
