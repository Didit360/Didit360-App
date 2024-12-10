export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static isApiError(error: any): error is ApiError {
    return error instanceof ApiError;
  }

  static fromError(error: any): ApiError {
    if (error.response) {
      const { data, status } = error.response;
      return new ApiError(
        data.message || 'An error occurred',
        status,
        data.errors
      );
    }
    return new ApiError(error.message || 'Network error');
  }
}