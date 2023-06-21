const { validationResult } = require('express-validator');
const fs = require('fs');

const Movie = require('../model/Movie');

exports.allMovieGetController = async (req, res) => {
  const { page, limit } = req.query;
  const currentPage = parseInt(page) || 1;
  const itemsPerPage = parseInt(limit) || 10;
  const skip = (currentPage - 1) * itemsPerPage;
  try {
    const allmovies = await Movie.find().skip(skip).limit(itemsPerPage)
    const totalMovies = await Movie.countDocuments();
    const movies = allmovies.reverse()

    if(allmovies.length !== 0) {
      res.status(200).json({
        movies,
        totalMovies,
        itemsPerPage,
        currentPage,
        totalPages: totalMovies / itemsPerPage
      })
    } else {
      res.status(200).json({
        movies: `Movies not found`
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: '500 - Internal server error'
    })
  }
}

exports.createMoviePostController = async (req, res) => {
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
    const newMovie = new Movie({
      title, actor, actress, director, producer, releaseDate, duration, detail,
      poster: posterUpload
    })
    await newMovie.save()
    res.status(200).json({
      Message: "Movie added successfully",
      newMovie
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: '500 - Internal server error'
    })
  }
}

exports.singleMovieGetController = async (req, res) => {
  const { movieId } = req.params;
  try {
    const movie = await Movie.findOne({_id: movieId})
    if(movie) {
      res.status(200).json({
        movie,
      })
    }else {
      res.status(404).json({
        Message: "Movie not found"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: '500 - Internal server error'
    })
  }
}

exports.movieEditPutController = async (req, res) => {
  const { title, actor, actress, director, producer, releaseDate, duration, detail } = req.body;
  const { movieId } = req.params;
  const movie = await Movie.findOne({ _id: movieId })

  const errors = validationResult(req).formatWith(err => err.msg)
  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.mapped()
    })
  }
  try {
    if(movie) {
      const updatedData = { title, actor, actress, director, producer, releaseDate, duration, detail }
      const updatedMovie = await Movie.findByIdAndUpdate(
        { _id: movie._id },
        { $set: updatedData },
        { new: true }
      )
      res.status(200).json({
        msg: "Movie updated successfully",
        updatedMovie
      })
    }else {
      res.status(404).json({
        Message: "Movie not found"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: '500 - Internal server error'
    })
  }
}

exports.movieDeleteController = async (req, res) => {
  const { movieId } = req.params;
  const movie = await Movie.findOne({ _id: movieId })

  try {
    if(movie) {
      const deletedMovie = await Movie.findOneAndDelete({ _id: movie._id })
      fs.unlink(`public${movie.poster}`, (err) => {
        if(err) {
          throw err
        }
      })
      res.status(200).json({
        Message: "Movie successfully deleted",
        deletedMovie
      })
    }else {
      res.status(404).json({
        Message: "Movie not found"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: '500 - Internal server error'
    })
  }
}