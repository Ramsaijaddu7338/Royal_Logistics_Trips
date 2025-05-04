import { useState, useEffect, useCallback } from 'react';
import { Trip } from '../types';
import { useAlerts } from './useAlerts';
import { generateExcel } from '../utils/excelUtils';

export const useTripData = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [filters, setFilters] = useState({ date: '', vehicle: '', company: '' });

  const { showAlert } = useAlerts();
  const apiUrl = import.meta.env.VITE_API_URL;

  // Load data from API on initial render
  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/trips`);
      const data = await response.json();
      setTrips(data);
    } catch (error) {
      console.error('Failed to fetch trips:', error);
      showAlert('Failed to load trips data', 'error');
    }
  };

  // Update filtered trips when trips or filters change
  useEffect(() => {
    let result = [...trips];

    if (filters.date) {
      if (filters.date.endsWith('-01')) {
        const yearMonth = filters.date.substring(0, 7);
        result = result.filter(trip => trip.date.startsWith(yearMonth));
      } else {
        result = result.filter(trip => trip.date === filters.date);
      }
    }

    if (filters.vehicle) {
      result = result.filter(trip => trip.vehicleNo === filters.vehicle);
    }

    if (filters.company) {
      result = result.filter(trip => trip.company === filters.company);
    }

    setFilteredTrips(result);
  }, [trips, filters]);

  // Calculate totals
  const totals = filteredTrips.reduce(
    (acc, trip) => {
      return {
        fuel: acc.fuel + (parseFloat(trip.fuel) || 0),
        price: acc.price + (parseFloat(trip.price) || 0),
      };
    },
    { fuel: 0, price: 0 }
  );

  // Add new trip
  const addTrip = useCallback(async (trip: Trip) => {
    try {
      const response = await fetch(`${apiUrl}/api/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trip),
      });

      if (!response.ok) throw new Error('Failed to add trip');

      await fetchTrips();
      showAlert('Trip added successfully!', 'success');
    } catch (error) {
      console.error('Failed to add trip:', error);
      showAlert('Failed to add trip', 'error');
    }
  }, [apiUrl, showAlert]);

  // Delete trip
  const deleteTrip = useCallback(async (id: string) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        const response = await fetch(`${apiUrl}/api/trips/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete trip');

        await fetchTrips();
        showAlert('Trip deleted successfully!', 'success');
      } catch (error) {
        console.error('Failed to delete trip:', error);
        showAlert('Failed to delete trip', 'error');
      }
    }
  }, [apiUrl, showAlert]);

  // Clear all data
  const clearAllData = useCallback(async () => {
    if (window.confirm('Are you sure you want to delete ALL trip data? This cannot be undone.')) {
      try {
        const response = await fetch(`${apiUrl}/api/trips`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to clear data');

        await fetchTrips();
        showAlert('All data has been cleared!', 'success');
      } catch (error) {
        console.error('Failed to clear data:', error);
        showAlert('Failed to clear data', 'error');
      }
    }
  }, [apiUrl, showAlert]);

  // Filter functions
  const filterByDate = useCallback((date: string) => {
    setFilters(prev => ({ ...prev, date }));
  }, []);

  const filterByVehicle = useCallback((vehicle: string) => {
    setFilters(prev => ({ ...prev, vehicle }));
  }, []);

  const filterByCompany = useCallback((company: string) => {
    setFilters(prev => ({ ...prev, company }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ date: '', vehicle: '', company: '' });
  }, []);

  // Download Excel for filtered trips only
  const downloadExcel = useCallback(() => {
    if (filteredTrips.length === 0) {
      showAlert('No filtered trip data to export', 'error');
      return;
    }

    try {
      generateExcel(filteredTrips, filters);
      showAlert('Excel file downloaded successfully!', 'success');
    } catch (error) {
      console.error('Failed to generate Excel:', error);
      showAlert('Failed to generate Excel file', 'error');
    }
  }, [filteredTrips, filters, showAlert]);

  return {
    trips,
    filteredTrips,
    addTrip,
    deleteTrip,
    clearAllData,
    filterByDate,
    filterByVehicle,
    filterByCompany,
    clearFilters,
    downloadExcel,
    totals
  };
};
