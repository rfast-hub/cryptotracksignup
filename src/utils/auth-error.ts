import { AuthError, AuthApiError } from "@supabase/supabase-js";

export const getAuthErrorMessage = (error: unknown): string => {
  if (error instanceof AuthApiError) {
    if (error.message.includes("already registered")) {
      return "Please try signing in instead, or use a different email address.";
    }
    
    if (error.message.includes("rate_limit")) {
      const waitTimeMatch = error.message.match(/after (\d+) seconds/);
      const waitTime = waitTimeMatch ? waitTimeMatch[1] : "60";
      return `For security purposes, please wait ${waitTime} seconds before trying again.`;
    }
  }
  
  return error instanceof AuthError ? error.message : "Failed to process signup. Please try again.";
};