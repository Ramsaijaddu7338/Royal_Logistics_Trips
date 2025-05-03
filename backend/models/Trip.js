import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  date: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  tripId: { type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleNo: { type: String, required: true },
  shiftTime: String,
  shiftType: String,
  escort: String,
  fuel: String,
  price: String
}, {
  timestamps: true
});

export const Trip = mongoose.model('Trip', tripSchema);