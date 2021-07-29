const express = require('express')
const router = express.Router();
const Playlist = require('../models/playlist-model.js');
const { AuthVerification } = require('../middlewares/AuthVerification');

router.use(AuthVerification)

router.route('/:userId')
    .get(async (req, res) => {
        try {
            const { userId } = req.params;
            const response = await Playlist.findOne({ userId })
            // .populate('playlist.list')
            if (response) {
                return res.status(201).json({ success: true, data: response })
            }
            res.status(201).json({ success: true, data: { userId, playList: [] } })

        } catch (err) {
            console.log("error fetching playlist: ", err)
            res.status(500).json({ success: false, message: "failed to fetch playlist data." })
        }
    })
    .post(async (req, res) => {
        try {
            const { userId } = req.params;
            console.log("req.body(post /userId", req.body)
            const { videoId, name: playlistName, defaultPlayList } = req.body;
            // const findUser = await Playlist.findOne({ userId })

            const findUser = await Playlist.findOne({ userId })
            if (findUser) {
                // const findPlaylist = findUser.playlist.find(i => i._id.toString() === playlistId)
                findUser.playList.push({ name: playlistName, list: [videoId] })
                const savedItem = await findUser.save()

                const findId = savedItem.playList.find(item => item.name === playlistName)
                // console.log("findId.name: ", findId._id)

                return res.status(201).json({ success: true, message: "successfully added into new playlist", data: findId })
            }

            let newItem = {}
            if (playlistName === "Watch Later" || playlistName === "Liked Videos" && defaultPlayList === true) {
                console.log("i'm here !!!!!!!!!!!!!!!!!!!!!!!")
                if (playlistName === "Watch Later") {
                    newItem = new Playlist({
                        userId,
                        playList: [
                            {
                                name: "Watch Later",
                                list: [videoId],
                                defaultPlayList: true
                            },
                            {
                                name: "Liked Videos",
                                list: [],
                                defaultPlayList: true
                            }
                        ]
                    })
                } else {
                    console.log("making like videos")
                    newItem = new Playlist({
                        userId,
                        playList: [
                            {
                                name: "Watch Later",
                                list: [],
                                defaultPlayList: true
                            },
                            {
                                name: "Liked Videos",
                                list: [videoId],
                                defaultPlayList: true
                            }
                        ]
                    })

                }
            }
            else {
                newItem = new Playlist({
                    userId,
                    playList: [
                        {
                            name: "Watch Later",
                            list: [],
                            defaultPlayList: true
                        },
                        {
                            name: "Liked Videos",
                            list: [],
                            defaultPlayList: true
                        },
                        {
                            name: playlistName,
                            list: [videoId],
                        },
                    ]
                })
            }

            await newItem.save()
            return res.status(201).json({ success: true, message: "successfully created new playlist", data: newItem })

        } catch (err) {
            console.log("error: ", err)
            res.status(500).json({ success: false, message: "failed to uplaod data", err: err });
        }
    })
    .delete(async (req, res) => {
        try {
            const { userId } = req.params;
            const { playlistId } = req.body;

            const findUser = await Playlist.findOne({ userId })
            if (findUser) {
                findUser.playList.pull({ _id: playlistId })
                await findUser.save()
                return res.status(201).json({ success: true, message: "successfully added new playlist" })
            }
            res.status(404).json({ success: false, message: "failed to find user" })
        } catch (err) {
            res.status(500).json({ success: false, message: "failed to upload data" })
        }
    })

router.route('/:userId/:playlistId')
    .post(async (req, res) => {
        try {
            const { userId, playlistId } = req.params;
            const { videoId } = req.body;
            const findUser = await Playlist.findOne({ userId })
            if (findUser) {
                const findPlaylist = findUser.playList.find(i => i._id.toString() === playlistId)
                findPlaylist.list.push(videoId)
                await findUser.save()
                return res.status(201).json({ success: true, message: "successfully updated database" })
            }
            return res.status(404).json({ success: false, message: "No user found" })
        } catch (err) {
            console.log("error adding video to playlist: ", err)
            res.status(500).json({ success: false, message: "failed to upload data" })
        }
    })
    .patch(async (req, res) => {

        try {
            const { userId, playlistId } = req.params;
            const { newName } = req.body;
            const findUser = await Playlist.findOne({ userId })
            if (findUser) {
                const findPlaylist = findUser.playList.find(i => i._id.toString() === playlistId)
                findPlaylist.name = newName;
                await findUser.save()
                return res.status(200).json({ success: true, message: "successfully updated playlist name" })
            }
            return res.status(404).json({ success: false, message: "No user found" })
        } catch (err) {
            console.log("error changing playlist name: ", err)
            res.status(500).json({ success: false, message: "failed to change playlist name" })
        }

    })
    .delete(async (req, res) => {
        try {
            const { userId, playlistId } = req.params;
            const { videoId } = req.body;
            const findUser = await Playlist.findOne({ userId })
            if (findUser) {
                const findPlaylist = findUser.playList.find(i => i._id.toString() === playlistId)
                findPlaylist.list.pull(videoId)
                await findUser.save()
                return res.status(200).json({ success: true, message: "successfully removed from playlist" })
            }
            return res.status(404).json({ success: false, message: "No user found" })
        } catch (err) {
            console.log("error adding video to playlist: ", err)
            res.status(500).json({ success: false, message: "failed to upload data" })
        }
    })

module.exports = router;