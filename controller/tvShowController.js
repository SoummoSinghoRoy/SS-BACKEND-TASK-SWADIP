const { validationResult } = require('express-validator');
const fs = require('fs');

const TvShows = require('../model/TvShows');

exports.allTvShowsGetController = async (req, res) => {
  const { page, limit } = req.query;
  const currentPage = parseInt(page) || 1;
  const itemsPerPage = parseInt(limit) || 10;
  const skip = (currentPage - 1) * itemsPerPage;

  try {
    const allTvShows = await TvShows.find().skip(skip).limit(itemsPerPage)
    const totalTvShows = await TvShows.countDocuments();
    const tvShows = allTvShows.reverse()

    if(allTvShows.length !== 0) {
      res.status(200).json({
        tvShows,
        totalTvShows,
        itemsPerPage,
        currentPage,
        totalPages: totalTvShows / itemsPerPage
      })
    } else {
      res.status(200).json({
        tvShows: `Shows not found`
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: '500 - Internal server error'
    })
  }
}

exports.createTvShowsPostController = async (req, res) => {
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
    const newTvShows = new TvShows({
      title, actor, actress, director, producer, releaseDate, duration, detail,
      poster: posterUpload
    })
    await newTvShows.save()
    res.status(200).json({
      Message: "Show added successfull",
      newTvShows
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: '500 - Internal server error'
    })
  }
}

exports.singleTvShowsGetController = async (req, res) => {
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

exports.tvShowEditPutController = async (req, res) => {
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

exports.tvShowDeleteController = async (req, res) => {
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
        Message: "Show successfully deleted",
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