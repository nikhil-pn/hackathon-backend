const express = require("express");

const router = express.Router();
const Playlist = require("../models/playListModel")
const { isAuthenticated } = require("../middlewares/auth");

router.get("/",isAuthenticated, async (req, res) => {
  try {
    const getAllPlaylist = await Playlist.findAll();
    if (!getAllPlaylist) {
      return res.status(404).json({ err: "cant find playlist" });
    }
    if (getAllPlaylist) {
      return res.status(200).json({ result: getAllPlaylist });
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});
router.get("/:id",isAuthenticated, async (req, res) => {
  try {
    const getPlaylist = await Playlist.findOne({
      where: { id: req.params.id},
    });
    if (!getPlaylist) {
      return res.status(404).json({ err: "cant find playlist" });
    }
    if (getPlaylist) {
      return res.status(200).json({ result: getPlaylist });
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});

router.put("/:id",isAuthenticated, async (req, res) => {
  try {
    const getPlaylist = await Playlist.findOne({
      where: { id: req.params.id},
    });
    if (!getPlaylist) {
      return res.status(404).json({ err: "cant find playlist" });
    }
    if (getPlaylist) {

      const {name, description} =req.body
      
      const updatedPlaylist = await getPlaylist.update({ name: name, description: description })

      await updatedPlaylist.save()
      
      return res.status(200).json({ result: updatedPlaylist});
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});

router.post("/",isAuthenticated, async (req, res) => {
  try {
    const {name, description} =req.body

    const playlistsong = {
      name,
      description
    } 
    
    const savePlaylist = await Playlist.create(playlistsong)
    if(savePlaylist){
      return res.status(500).json({ res : savePlaylist });
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});

module.exports = router;
