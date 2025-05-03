import * as XLSX from 'xlsx';
import { Trip } from '../types';

export const generateExcel = (trips: Trip[], filters: { date: string; vehicle: string }) => {
  const wb = XLSX.utils.book_new();
  
  // Create a sheet with filtered data
  let dataToExport = [...trips];
  let sheetTitle = 'All Trips';
  
  // Apply filters if present
  if (filters.date || filters.vehicle) {
    if (filters.date) {
      // Check if this is a month filter (YYYY-MM format)
      if (filters.date.endsWith('-01')) {
        const yearMonth = filters.date.substring(0, 7); // Get YYYY-MM part
        dataToExport = dataToExport.filter(trip => trip.date.startsWith(yearMonth));
        
        // Get month name for title
        const date = new Date(filters.date);
        const monthName = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        sheetTitle = `${monthName} ${year}`;
      } else {
        dataToExport = dataToExport.filter(trip => trip.date === filters.date);
        sheetTitle = `Trips for ${filters.date}`;
      }
    }
    
    if (filters.vehicle) {
      dataToExport = dataToExport.filter(trip => trip.vehicleNo === filters.vehicle);
      sheetTitle = filters.date ? `${sheetTitle} - ${filters.vehicle}` : `${filters.vehicle} Trips`;
    }
  }
  
  // Create the filtered data sheet
  const filteredSheet = XLSX.utils.json_to_sheet(dataToExport);
  XLSX.utils.book_append_sheet(wb, filteredSheet, sheetTitle);
  
  // Create separate sheets for each vehicle
  const vehicles = Array.from(new Set(trips.map(trip => trip.vehicleNo))).filter(Boolean);
  
  vehicles.forEach(vehicle => {
    if (!vehicle) return;
    
    const vehicleTrips = trips.filter(trip => trip.vehicleNo === vehicle);
    
    // Apply date filter if present
    if (filters.date && filters.date.endsWith('-01')) {
      const yearMonth = filters.date.substring(0, 7);
      const filteredVehicleTrips = vehicleTrips.filter(trip => trip.date.startsWith(yearMonth));
      
      if (filteredVehicleTrips.length > 0) {
        const ws = XLSX.utils.json_to_sheet(filteredVehicleTrips);
        XLSX.utils.book_append_sheet(wb, ws, vehicle.toString());
      }
    } else if (vehicleTrips.length > 0) {
      const ws = XLSX.utils.json_to_sheet(vehicleTrips);
      XLSX.utils.book_append_sheet(wb, ws, vehicle.toString());
    }
  });
  
  // Create summary sheet
  const summaryData = vehicles.map(vehicle => {
    if (!vehicle) return null;
    
    let vehicleTrips = trips.filter(trip => trip.vehicleNo === vehicle);
    
    // Apply date filter for summary if present
    if (filters.date && filters.date.endsWith('-01')) {
      const yearMonth = filters.date.substring(0, 7);
      vehicleTrips = vehicleTrips.filter(trip => trip.date.startsWith(yearMonth));
    }
    
    const totalPrice = vehicleTrips.reduce((sum, trip) => sum + (parseFloat(trip.price) || 0), 0);
    const totalFuel = vehicleTrips.reduce((sum, trip) => sum + (parseFloat(trip.fuel) || 0), 0);
    
    return {
      'Vehicle No': vehicle,
      'Total Trips': vehicleTrips.length,
      'Total Fuel (L)': totalFuel.toFixed(1),
      'Total Price (₹)': totalPrice.toFixed(2)
    };
  }).filter(Boolean);
  
  if (summaryData.length > 0) {
    const summarySheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summarySheet, "Summary");
  }
  
  // Generate file name based on filters
  let fileName = 'RoyalLogistics_Trips';
  
  if (filters.date && filters.date.endsWith('-01')) {
    const date = new Date(filters.date);
    const monthName = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    fileName += `_${monthName}_${year}`;
  } else if (filters.date) {
    fileName += `_${filters.date}`;
  }
  
  if (filters.vehicle) {
    fileName += `_${filters.vehicle}`;
  }
  
  // Write to file
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};