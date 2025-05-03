import React from 'react';
import { CarFront, Download, Filter, PlusCircle, Trash2 } from 'lucide-react';
import { TripForm } from './components/TripForm';
import { TripTable } from './components/TripTable';
import { TripFilters } from './components/TripFilters';
import { AppHeader } from './components/AppHeader';
import { useTripData } from './hooks/useTripData';

function App() {
  const {
    trips,
    addTrip,
    updateTrip,
    deleteTrip,
    startEdit,
    cancelEdit,
    editingTrip,
    clearAllData,
    filteredTrips,
    filterByDate,
    filterByVehicle,
    filterByCompany,
    clearFilters,
    downloadExcel,
    totals
  } = useTripData();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <AppHeader />
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="bg-blue-600 text-white px-4 py-3 flex items-center">
            <PlusCircle className="h-5 w-5 mr-2" />
            <h2 className="text-lg font-semibold">{editingTrip ? 'Edit Trip' : 'New Trip Entry'}</h2>
            {editingTrip && (
              <button
                onClick={cancelEdit}
                className="ml-auto text-sm bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded"
              >
                Cancel Edit
              </button>
            )}
          </div>
          <div className="p-4">
            <TripForm 
              onAddTrip={addTrip} 
              onUpdateTrip={updateTrip}
              editingTrip={editingTrip}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="bg-blue-600 text-white px-4 py-3 flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            <h2 className="text-lg font-semibold">Trip Records</h2>
            <div className="ml-auto flex gap-2">
              <button 
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center transition-colors"
                onClick={downloadExcel}
              >
                <Download className="h-4 w-4 mr-1" />
                Download Excel
              </button>
              <button 
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center transition-colors"
                onClick={clearAllData}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear All
              </button>
            </div>
          </div>
          <div className="p-4">
            <TripFilters 
              onDateFilter={filterByDate}
              onVehicleFilter={filterByVehicle}
              onCompanyFilter={filterByCompany}
              onClearFilters={clearFilters}
            />
            <TripTable 
              trips={filteredTrips} 
              onDeleteTrip={deleteTrip}
              onEditTrip={startEdit}
              totals={totals}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;