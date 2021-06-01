import { BadRequestException } from '@smoothjs/smooth'
import { ErrorObject } from 'ajv'
import { ValidationError } from 'class-validator'

export class ValidationException extends BadRequestException {
  constructor(errors: ValidationError[] | ErrorObject<string, Record<string, any>, unknown>[]) {
    super()

    const data = {}
    errors.forEach((error: ValidationError | ErrorObject<string, Record<string, any>, unknown>) => {
      if (error instanceof ValidationError) {
        data[error.property] = error.constraints
      } else {
        data[error.params.missingProperty] = error.message
      }
    })

    this.data = data
  }
}
