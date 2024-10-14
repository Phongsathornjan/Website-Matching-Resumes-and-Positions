const mongoose = require("mongoose");
const appointment = require("../../model/appointment");

const getAppointmentById = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      message: "not found userId",
    });
  }

  let Appointment = await appointment.find({
    userId: new mongoose.Types.ObjectId(userId),
  }).populate('PostId', 'Position').populate('HrId', 'companyName').populate('userId', 'first_name last_name email')

  if (Appointment.length == 0) {
    Appointment = await appointment.find({
      HrId: new mongoose.Types.ObjectId(userId),
    }).populate('PostId', 'Position').populate('HrId', 'companyName').populate('userId', 'first_name last_name email')
  }else {
    return res.status(200).json(Appointment)
  }

  if (Appointment.length == 0) {
    return res.status(404).json({ message: 'No found appointment' });
  }

  res.status(200).json(Appointment)
};

module.exports = getAppointmentById;
