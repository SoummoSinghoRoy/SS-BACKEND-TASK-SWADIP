const { validationResult } = require('express-validator');
const fs = require('fs');

const TvShows = require('../model/TvShows');

exports.allTvShowGetController = async (req, res) => {
  const { page, limit } = req.query;
  const currentPage = parseInt(page) || 1;
  const itemperpage = parseInt(limit) || 10;
  const skip = (currentPage - 1) * itemperpage;
  try {
    const allTvShow = await TvShows.find().skip(skip).limit(itemperpage)
    const totalTvShows = await TvShows.countDocuments()
    const tvShows = allTvShow.reverse()
    if(allTvShow.length !== 0) {
      res.status(200).json({
        tvShows,
        totalTvShows,
        currentPage,
        itemperpage,
        totalPages: totalTvShows / itemperpage
      })
    } else {
      res.status(200).json({
        shows: `Shows not found`
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: '500 - Internal server error'
    })
  }
}

exports.createTvShowPostController = async (req, res) => {
  const { title, actor, actress, director, producer, releaseDate, duration, detail } = req.body;
  const messages = validationResult(req).formatWith(err => err.msg)
  const errors = messages.array()

  if(!req.file) {
    errors.push(`Must attach a valid picture`)
    return res.status(400).json({
      errors
    })
  }
  if(!messages.isEmpty()) {
    if(req.file) {
      fs.unlinkSync(req.file.path)
    }
    return res.status(400).json({
      errors
    })
  }
  try {
    const posterUpload = `/uploads/${req.file.filename}`;
    const newShow = new TvShows({
      title, actor, actress, director, producer, releaseDate, duration, detail,
      poster: posterUpload
    })
    await newShow.save()
    res.status(200).json({
      Message: "Show added successfull",
      newShow
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: '500 - Internal server error'
    })
  }
}

exports.singleTvShowGetController = async (req, res) => {
  const { showId } = req.params;
  try {
    const show = await TvShows.findOne({_id: showId})
    if(show) {
      res.status(200).json({
        show,
      })
    }else {
      res.status(404).json({
        Message: "Show not found"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: '500 - Internal server error'
    })
  }
}

exports.TvShowEditPutController = async (req, res) => {
  const { title, actor, actress, director, producer, releaseDate, duration, detail } = req.body;
  const { showId } = req.params;
  const show = await TvShows.findOne({ _id: showId })

  const errors = validationResult(req).formatWith(err => err.msg)
  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.mapped()
    })
  }
  try {
    if(show) {
      const updatedData = { title, actor, actress, director, producer, releaseDate, duration, detail }
      const updatedShow = await TvShows.findByIdAndUpdate(
        { _id: show._id },
        { $set: updatedData },
        { new: true }
      )
      res.status(200).json({
        msg: "Show updated successfully",
        updatedShow
      })
    }else {
      res.status(404).json({
        Message: "Show not found"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: '500 - Internal server error'
    })
  }
}

exports.TvShowDeleteController = async (req, res) => {
  const { showId } = req.params;
  const show = await TvShows.findOne({ _id: showId })

  try {
    if(show) {
      const deletedShow = await TvShows.findOneAndDelete({ _id: show._id })
      fs.unlink(`public${show.poster}`, (err) => {
        if(err) {
          throw err
        }
      })
      res.status(200).json({
        Message: "Showsuccessfully deleted",
        deletedShow
      })
    }else {
      res.status(404).json({
        Message: "Show not found"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: '500 - Internal server error'
    })
  }
}