import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ApiError } from './api-error';

export async function handleApiError(error: unknown): Promise<never> {
  if (error instanceof AxiosError) {
    const apiError = ApiError.fromError(error);
    
    // Handle validation errors
    if (apiError.errors) {
      Object.values(apiError.errors).forEach(errors => {
        errors.forEach(error => toast.error(error));
      });
    } else {
      toast.error(apiError.message);
    }
    
    throw apiError;
  }
  
  // Handle unexpected errors
  const message = error instanceof Error ? error.message : 'An unexpected error occurred';
  toast.error(message);
  throw error;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}