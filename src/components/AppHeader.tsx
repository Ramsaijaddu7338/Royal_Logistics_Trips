import React from 'react';
import { Truck } from 'lucide-react';

export const AppHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <Truck className="h-7 w-7 text-blue-600 mr-2" />
        <h1 className="text-2xl font-bold text-blue-600">Royal Logistics</h1>
      </div>
      <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
        Daily Trip Management
      </div>
    </div>
  );
};