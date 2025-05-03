import { useCallback } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

export const useAlerts = () => {
  const showAlert = useCallback((message: string, type: AlertType = 'info') => {
    const alertDiv = document.createElement('div');
    
    // Set class based on alert type
    let bgColor = 'bg-blue-100 text-blue-800 border-blue-300'; // info
    
    if (type === 'success') {
      bgColor = 'bg-green-100 text-green-800 border-green-300';
    } else if (type === 'error') {
      bgColor = 'bg-red-100 text-red-800 border-red-300';
    } else if (type === 'warning') {
      bgColor = 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
    
    // Style the alert
    alertDiv.className = `fixed top-4 right-4 p-4 rounded border ${bgColor} shadow-md z-50 transition-all duration-300 transform translate-x-full`;
    alertDiv.textContent = message;
    
    // Add to DOM
    document.body.appendChild(alertDiv);
    
    // Animate in
    setTimeout(() => {
      alertDiv.style.transform = 'translateX(0)';
    }, 10);
    
    // Automatically remove after 3 seconds
    setTimeout(() => {
      alertDiv.style.transform = 'translateX(full)';
      alertDiv.style.opacity = '0';
      
      // Remove from DOM after animation
      setTimeout(() => {
        alertDiv.remove();
      }, 300);
    }, 3000);
  }, []);
  
  return { showAlert };
};