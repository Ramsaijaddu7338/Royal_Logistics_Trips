import React, { useState } from 'react';
import { Calendar, Building2, Truck, X } from 'lucide-react';

interface TripFiltersProps {
  onDateFilter: (date: string) => void;
  onVehicleFilter: (vehicle: string) => void;
  onCompanyFilter: (company: string) => void;
  onClearFilters: () => void;
}

export const TripFilters: React.FC<TripFiltersProps> = ({ 
  onDateFilter, 
  onVehicleFilter,
  onCompanyFilter,
  onClearFilters
}) => {
  const [date, setDate] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [company, setCompany] = useState('');
  const [month, setMonth] = useState('');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDate(value);
    onDateFilter(value);
  };

  const handleVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setVehicle(value);
    onVehicleFilter(value);
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCompany(value);
    onCompanyFilter(value);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMonth(value);
    
    if (value) {
      const yearMonth = value.split('-');
      const firstDay = `${yearMonth[0]}-${yearMonth[1]}-01`;
      setDate(firstDay);
      onDateFilter(firstDay);
    }
  };

  const handleClear = () => {
    setDate('');
    setVehicle('');
    setCompany('');
    setMonth('');
    onClearFilters();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
      <div className="space-y-1">
        <label htmlFor="filterMonth" className="block text-sm font-medium text-gray-700 flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          Filter by Month
        </label>
        <input
          type="month"
          id="filterMonth"
          value={month}
          onChange={handleMonthChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="space-y-1">
        <label htmlFor="filterDate" className="block text-sm font-medium text-gray-700 flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          Filter by Date
        </label>
        <input
          type="date"
          id="filterDate"
          value={date}
          onChange={handleDateChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="space-y-1">
        <label htmlFor="filterVehicle" className="block text-sm font-medium text-gray-700 flex items-center">
          <Truck className="h-4 w-4 mr-1" />
          Filter by Vehicle
        </label>
        <select
          id="filterVehicle"
          value={vehicle}
          onChange={handleVehicleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Vehicles</option>
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
        <label htmlFor="filterCompany" className="block text-sm font-medium text-gray-700 flex items-center">
          <Building2 className="h-4 w-4 mr-1" />
          Filter by Company
        </label>
        <select
          id="filterCompany"
          value={company}
          onChange={handleCompanyChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Companies</option>
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
      
      <div className="flex items-end">
        <button
          onClick={handleClear}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded flex items-center transition-colors"
        >
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </button>
      </div>
    </div>
  );
};