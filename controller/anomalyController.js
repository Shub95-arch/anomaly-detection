const catchAsync = require('../utils/catchAsync');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const socketIO = require('socket.io');
const AppError = require('../utils/appError');
const { time } = require('console');

exports.getAnomaly = catchAsync(async (req, res, next) => {
  let time_taken = Date.now();
  if (!req.file) {
    return next(new AppError(`No file has been uploaded`, 400));
  }

  const formData = new FormData();
  formData.append('file', fs.createReadStream(req.file.path));

  const response = await axios.post(
    `http://127.0.0.1:5000/detect_anomalies?method=${req.params.method}`,
    formData,
    {
      headers: {
        ...formData.getHeaders(),
      },
    }
  );
  const result = response.data;
  time_taken = `${(Date.now() - time_taken) / 1000} sec`;
  res.status(200).json({
    status: 'success',
    data: {
      time_taken,
      result,
    },
  });
});
