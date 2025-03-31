import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserNotAuthorizedException } from 'common/exceptions/user-not-authorized.exception';

// TODO: create each exception
export class ProductNotFoundException extends Error {}
export class PaymentFailedException extends Error {}
export class InsufficientStockException extends Error {}

@Injectable()
export class ApiExceptionsHttpStatusCodeMapping {
  map(error: any): HttpException {
    if (error instanceof ProductNotFoundException) {
      return new HttpException(error.message, HttpStatus.NOT_FOUND);
    }

    if (error instanceof UserNotAuthorizedException) {
      return new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }

    if (error instanceof PaymentFailedException) {
      return new HttpException(error.message, HttpStatus.PAYMENT_REQUIRED);
    }

    if (error instanceof InsufficientStockException) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    // Excepción genérica para otros errores no controlados
    return new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}