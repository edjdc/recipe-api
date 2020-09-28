export default class ResponseError extends Error {
  private status: number;

  public constructor(message?: string, status = 400) {
    super(message);
    this.status = status;
  }

  public Status(): number {
    return this.status;
  }
}
