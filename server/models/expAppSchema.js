const mongoose = require('mongoose');

const expAppSchema = new mongoose.Schema({
  appid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'appointments'
  },

  appointmentid:{
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true
},

date: {
    type: Date,
    required:true,
},

start: {
    type: String,
    required: true
},

end: {
    type: String,
    required: true
},

email:{
    type: String,
    required: true
}
});

const exps = new mongoose.model("expiredAppointments", expAppSchema);

module.exports = exps;