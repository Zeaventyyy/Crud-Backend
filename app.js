const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const POSTS_URL = process.env.POSTS_API_URL;
const USERS_URL = process.env.USERS_API_URL;

//GET POSTS API
app.get("/posts", async (req, res) => {
  try {
    const response = await axios.get(POSTS_URL);
    console.log(response);
    res.json({ message: "Success", results: response.data });
  } catch (error) {
    console.error(error);
  }
});

//POST POSTS API
app.post("/posts", async (req, res) => {
  console.log(req.body);
  try {
    const response = await axios.post(POSTS_URL, req.body);
    console.log(response);
    res.json({ message: "Success", results: response.data });
  } catch (error) {
    console.error(error);
  }
});

//EDIT POSTS API
app.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.put(`${POSTS_URL}/${id}`, req.body);
    console.log(response);
    res.json({ message: "Success", results: response.data });
  } catch (error) {
    console.error(error);
  }
});

//DELETE POSTS API
app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.delete(`${POSTS_URL}/${id}`);
    console.log(response);
    res.json({ message: "Success", results: response.data });
  } catch (error) {
    console.error(error);
  }
});

//LOGIN API
app.post("/login", async (req, res) => {
  console.log(req.body);
  const email =
    req.body.email.charAt(0).toUpperCase() + req.body.email.slice(1);
  try {
    const response = await axios.get(USERS_URL, {
      params: { email },
    });
    console.log(response);
    if (response.data.length > 0) {
      res.status(200).json({ message: "Success", results: response.data });
    } else {
      res.status(404).json({ message: "No Account found" });
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
