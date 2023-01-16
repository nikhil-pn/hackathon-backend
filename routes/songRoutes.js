const express = require("express");
require("dotenv").config();
const router = express.Router();

const axios = require("axios");

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

async function getAccessToken() {
  try {
    const response = await axios({
      url: "https://accounts.spotify.com/api/token",
      method: "post",
      params: {
        grant_type: "client_credentials",
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: SPOTIFY_CLIENT_ID,
        password: SPOTIFY_CLIENT_SECRET,
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
}
//get all songs
router.get("/", async (req, res) => {
  try {
    console.log("reached here");
    const token = await getAccessToken();
    console.log("token", token);

    const response = await axios.get(
      "https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const track = await response;
    res.send(response.data);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});

// // Get song by id

router.use("/:id", async (req, res) => {
  const token = await getAccessToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/tracks/${req.params.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  res.send(response.data);
});
// // Search for songs

router.get("/search", async (req, res) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${req.query.q}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});

module.exports = router;
