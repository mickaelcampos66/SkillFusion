import { Injectable } from '@nestjs/common';

export type MessageUtilType = {
  statusCode: number;
  success: boolean;
  message: string;
};

@Injectable()
export class MessageUtil {
  constructor(
    private readonly _statusCode: number,
    private readonly _success: boolean,
    private readonly _message: string,
  ) {}

  public toJSON(): MessageUtilType {
    return {
      statusCode: this.statusCode,
      success: this.success,
      message: this.message,
    };
  }

  public toString(): string {
    return JSON.stringify({
      statusCode: this.statusCode,
      success: this.success,
      message: this.message,
    });
  }

  public get statusCode(): number {
    return this._statusCode;
  }

  public get success(): boolean {
    return this._success;
  }

  public get message(): string {
    return this._message;
  }
}
