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
    price: ''
  };

  const [formData, setFormData] = useState<Trip>(initialFormState);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingTrip) {
      setFormData(editingTrip);
    } else {
      setFormData(initialFormState);
    }
  }, [editingTrip]);

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
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {error && (
        <div className="col-span-full bg-red-50 text-red-700 p-3 rounded flex items-center mb-3">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}
      
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
          <option value="Dupont">Dupont</option>
          <option value="Celanese">Celanese</option>
          <option value="IUY">IUY</option>
          <option value="Dozen">Dozen</option>
          <option value="Resource">Resource</option>
          <option value="Infinixi">Infinixi</option>
          <option value="ECLAT">ECLAT</option>
          <option value="RVM">RVM</option>
          <option value="Zomato">Zomato</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
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
          <option value="AP-39-TU-7041">AP-39-TU-7041</option>
          <option value="AP-39-TU-9347">AP-39-TU-9347</option>
          <option value="TS-08-UL-3670">TS-08-UL-3670</option>
          <option value="TS-08-UE-8211">TS-08-UE-8211</option>
          <option value="TS-08-UF-2498">TS-08-UF-2498</option>
          <option value="TS-11-UC-3116">TS-11-UC-3116</option>
          <option value="TG-16-T-0510">TG-16-T-0510</option>
        </select>
      </div>
      
      <div className="space-y-1">
        <label htmlFor="shiftTime" className="block text-sm font-medium text-gray-700">
          Shift Time
        </label>
        <input
          type="text"
          id="shiftTime"
          placeholder="e.g. 09:00 - 18:00"
          value={formData.shiftTime}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
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
          <option value="login">login</option>
          <option value="logout">logout</option>
        </select>
      </div>
      
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