export class HttpError extends Error {
  constructor(
    public statusCode: number, 
    message: string
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

// Exportação padrão também (opcional)
export default HttpError;