import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Trip } from '../types';

interface TripTableProps {
  trips: Trip[];
  onDeleteTrip: (id: string) => void;
  onEditTrip: (trip: Trip) => void;
  totals: {
    fuel: number;
    price: number;
  };
}

export const TripTable: React.FC<TripTableProps> = ({ trips, onDeleteTrip, onEditTrip, totals }) => {
  if (trips.length === 0) {
    return (
      <div className="bg-gray-50 p-6 text-center rounded border border-gray-200 mt-4">
        <p className="text-gray-500">No trip records found. Add a new trip to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-4 border border-gray-200 rounded">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trip ID</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Type</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle No</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift Time</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift Type</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Escort</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fuel (L)</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (₹)</th>
            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {trips.map((trip) => (
            <tr key={trip._id} className="hover:bg-gray-50">
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{trip.date}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{trip.company}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{trip.location}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{trip.tripId}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{trip.vehicleType}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{trip.vehicleNo}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{trip.shiftTime || '-'}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{trip.shiftType}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{trip.escort}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{trip.fuel || '-'}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{trip.price || '-'}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 text-center">
                <div className="flex justify-center space-x-2">
                  <button 
                    onClick={() => onEditTrip(trip)} 
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Edit trip"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => onDeleteTrip(trip._id!)} 
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Delete trip"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-100">
          <tr>
            <td colSpan={9} className="px-3 py-2 text-right text-sm font-medium">Total:</td>
            <td className="px-3 py-2 text-sm font-medium">{totals.fuel.toFixed(1)}</td>
            <td className="px-3 py-2 text-sm font-medium">{totals.price.toFixed(2)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};