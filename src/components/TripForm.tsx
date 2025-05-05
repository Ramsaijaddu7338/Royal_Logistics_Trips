import React, { useState, useEffect } from 'react';
import { AlertCircle, PlusCircle, Save } from 'lucide-react';
import { Trip } from '../types';

interface TripFormProps {
  onAddTrip: (trip: Trip) => void;
  onUpdateTrip: (trip: Trip) => void;
  editingTrip: Trip | null;
}

export const TripForm: React.FC<TripFormProps> = ({ onAddTrip, onUpdateTrip, editingTrip }) => {
  const initialFormState: Trip = {
    date: new Date().toISOString().split('T')[0],
    company: 'Dupont',
    location: '',
    tripId: '',
    vehicleType: 'Sedan',
    vehicleNo: '',
    shiftTime: '',
    shiftType: '',
    escort: 'No',
    fuel: '',
    price: '',
  };

  const [formData, setFormData] = useState<Trip>(initialFormState);
  const [error, setError] = useState<string | null>(null);

  // State for time picker
  const [hour, setHour] = useState('07');
  const [minute, setMinute] = useState('30');
  const [period, setPeriod] = useState('AM');

  useEffect(() => {
    if (editingTrip) {
      setFormData(editingTrip);
      // Parse existing shiftTime if it exists
      if (editingTrip.shiftTime) {
        const timeParts = editingTrip.shiftTime.split(' ');
        if (timeParts.length === 2) {
          const [time, period] = timeParts;
          const [h, m] = time.split(':');
          setHour(h.padStart(2, '0'));
          setMinute(m.padStart(2, '0'));
          setPeriod(period);
        }
      }
    } else {
      setFormData(initialFormState);
      // Reset time picker
      setHour('00');
      setMinute('00');
      setPeriod('AM');
    }
  }, [editingTrip]);

  useEffect(() => {
    // Update formData.shiftTime whenever hour, minute, or period changes
    setFormData(prev => ({
      ...prev,
      shiftTime: `${hour}:${minute} ${period}`
    }));
  }, [hour, minute, period]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.location || !formData.tripId || !formData.vehicleNo) {
      setError('Please fill in all required fields');
      return;
    }

    if (editingTrip) {
      onUpdateTrip(formData);
    } else {
      onAddTrip(formData);
      setFormData(initialFormState);
      // Reset time picker after submit
      setHour('00');
      setMinute('00');
      setPeriod('AM');
    }
  };

  // Generate hours options (07-12, 01-06)
  const hours = [
    
    '01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11', '12'
  ];

  // Generate minutes options (30-36 as shown in the image, but we'll do 00-59)
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {error && (
        <div className="col-span-full bg-red-50 text-red-700 p-3 rounded flex items-center mb-3">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      {/* Date */}
      <div className="space-y-1">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Company */}
      <div className="space-y-1">
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <select
          id="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {['Dupont', 'Celanese', 'IUY', 'Dozen', 'Resource', 'Infinixi', 'ECLAT', 'RVM', 'Zomato', 'Other'].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div className="space-y-1">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Trip ID */}
      <div className="space-y-1">
        <label htmlFor="tripId" className="block text-sm font-medium text-gray-700">
          Trip ID
        </label>
        <input
          type="text"
          id="tripId"
          value={formData.tripId}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Vehicle Type */}
      <div className="space-y-1">
        <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">
          Vehicle Type
        </label>
        <select
          id="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Van">Van</option>
        </select>
      </div>

      {/* Vehicle Number */}
      <div className="space-y-1">
        <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">
          Vehicle No #
        </label>
        <select
          id="vehicleNo"
          value={formData.vehicleNo}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Vehicle</option>
          {[
            "AP-39-TU-7041", "AP-39-TU-9347", "TS-08-UL-3670",
            "TS-08-UE-8211", "TS-08-UF-2498", "TS-11-UC-3116", "TG-16-T-0510"
          ].map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* Shift Time */}
      <div className="space-y-1">
        <label htmlFor="shiftTime" className="block text-sm font-medium text-gray-700">
          Shift Time
        </label>
        <div className="flex gap-2">
          <select
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {hours.map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
          <select
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {minutes.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      {/* Shift Type */}
      <div className="space-y-1">
        <label htmlFor="shiftType" className="block text-sm font-medium text-gray-700">
          Shift Type
        </label>
        <select
          id="shiftType"
          value={formData.shiftType}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Shift Type</option>
          <option value="login">Login</option>
          <option value="logout">Logout</option>
        </select>
      </div>

      {/* Escort */}
      <div className="space-y-1">
        <label htmlFor="escort" className="block text-sm font-medium text-gray-700">
          Escort
        </label>
        <select
          id="escort"
          value={formData.escort}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* Fuel */}
      <div className="space-y-1">
        <label htmlFor="fuel" className="block text-sm font-medium text-gray-700">
          Fuel (Liters)
        </label>
        <input
          type="number"
          id="fuel"
          step="0.1"
          value={formData.fuel}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Price */}
      <div className="space-y-1">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price (₹)
        </label>
        <input
          type="number"
          id="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <div className="col-span-full">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center transition-colors"
        >
          {editingTrip ? (
            <>
              <Save className="h-5 w-5 mr-2" />
              Update Trip
            </>
          ) : (
            <>
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Trip
            </>
          )}
        </button>
      </div>
    </form>
  );
};
