# Errors

This directory is for custom error classes and error handling utilities.

## Conventions

- Create specific error classes for different failure types
- Include error codes for programmatic handling
- Use `ERROR_MESSAGES` from `utils/constants/index.js` for user-facing strings

## Example

```javascript
// utils/errors/api-error.js
export class ApiError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
  }
}
```

## See Also

- [Project Architecture: Error Handling](../../docs/02-project-architecture.md#error-handling-strategy)
- [Troubleshooting](../../docs/15-troubleshooting.md)
