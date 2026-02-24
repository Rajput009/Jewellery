export type ApiErrorCode =
  | 'AUTH_REQUIRED'
  | 'CONFIGURATION_ERROR'
  | 'VALIDATION_FAILED'
  | 'BACKEND_UNAVAILABLE'
  | 'NOT_FOUND'
  | 'UNKNOWN';

export class ApiError extends Error {
  readonly code: ApiErrorCode;
  readonly status?: number;
  override readonly cause?: unknown;

  constructor(message: string, code: ApiErrorCode, options?: { status?: number; cause?: unknown }) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = options?.status;
    this.cause = options?.cause;
  }
}

export const isApiError = (value: unknown): value is ApiError => value instanceof ApiError;

export const toApiError = (
  value: unknown,
  fallbackMessage: string,
  fallbackCode: ApiErrorCode = 'UNKNOWN',
): ApiError => {
  if (isApiError(value)) return value;
  if (value instanceof Error) return new ApiError(value.message, fallbackCode, { cause: value });
  return new ApiError(fallbackMessage, fallbackCode, { cause: value });
};
