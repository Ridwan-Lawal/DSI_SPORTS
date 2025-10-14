export function userErrorMessageForGet(statusCode: number): string {
  switch (statusCode) {
    case 400:
      return "Invalid request. Please check your input and try again.";

    case 401:
      return "You need to be signed in to perform this action.";

    case 403:
      return "You do not have permission to perform this action.";

    case 404:
      return "The requested resource was not found.";

    case 405:
      return "This method is not allowed.";

    case 409:
      return "This resource already exists or conflicts with an existing resource.";

    case 422:
      return "Validation error. Please check your input.";

    case 429:
      return "Too many requests. Please try again later.";

    // 5xx Server Errors
    case 500:
      return "An internal server error occurred. Please try again later.";

    case 502:
      return "Bad gateway. The server is temporarily unavailable.";

    case 503:
      return "Service temporarily unavailable. Please try again later.";

    case 504:
      return "Gateway timeout. The request took too long to process.";

    default:
      // Handle unexpected status codes
      if (statusCode >= 400 && statusCode < 500) {
        return "Client error occurred. Please check your request.";
      } else if (statusCode >= 500) {
        return "Server error occurred. Please try again later.";
      } else {
        return "An unexpected error occurred.";
      }
  }
}
