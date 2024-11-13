const Car = require('../models/Car');

// Create a new car
exports.createCar = async (req, res) => {
  try {
    const { title, description, tags, images } = req.body;
    const car = new Car({
      user: req.user.id,
      title,
      description,
      tags,
      images,
    });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
};

// Get all cars for the logged-in user
exports.getUserCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user.id });
    res.json(cars);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
};

// Search cars by keyword
exports.searchCars = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const cars = await Car.find({
      user: req.user.id,
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { tags: { $regex: keyword, $options: 'i' } },
      ],
    });
    res.json(cars);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
};

// Get a specific car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
};

// Update a car by ID
exports.updateCar = async (req, res) => {
  try {
    const { title, description, tags, images } = req.body;
    let car = await Car.findById(req.params.id);
    if (!car || car.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Car not found' });
    }
    car = await Car.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, tags, images } },
      { new: true }
    );
    res.json(car);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
};

// Delete a car by ID
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Car not found' });
    }
    await Car.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Car removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
};