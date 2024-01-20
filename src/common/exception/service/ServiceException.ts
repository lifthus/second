export class ServiceException extends Error {
  public readonly statusCode: number;
  public readonly message: string;
  constructor(inp: ServiceExceptionInput) {
    super(inp.message);
    this.statusCode = inp.statusCode;
    this.message = inp.message;
  }
}

class ServiceExceptionInput {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
  ) {}
}

const NewServiceException = (
  statusCode: number,
  message: string,
): ServiceException => {
  return new ServiceException(new ServiceExceptionInput(statusCode, message));
};

export const InvalidFileException = (message?: string): ServiceException => {
  return NewServiceException(400, message || 'Invalid file');
};
