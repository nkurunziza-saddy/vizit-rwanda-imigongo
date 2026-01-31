// Payment hooks - placeholder for future payment integration
// Payment processing will be handled on the backend

// Query keys for payments
export const paymentKeys = {
  all: ["payments"] as const,
};

// Placeholder hook - payment processing moved to backend
export const usePaymentStatus = () => {
  // This hook can be extended when backend payment integration is ready
  return {
    isProcessing: false,
    status: "idle" as const,
  };
};
