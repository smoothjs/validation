import { BadRequestException, Class, Hook } from '@smoothjs/smooth'
import { ValidateBodyOptions } from './interfaces'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { isArrowFunction } from './utils'
import { ValidationException } from './exceptions/validation'

export function ValidateBody(
  cl: Class,
  options: ValidateBodyOptions = {}
): ClassDecorator & MethodDecorator {
  return Hook(async (request: any, response: any, next: Function) => {
    if (typeof request.body !== 'object' || request.body === null) {
      next(new BadRequestException('The request body should be a valid JSON object or array.'))
    }

    const localCls = isArrowFunction(cl) ? cl(request) : cl
    const instance = plainToClass(localCls, request.body, options.transformer)
    const errors = await validate(instance, options.validator)

    if (errors.length > 0) {
      next(new ValidationException(errors))
    }

    request.body = instance

    next()
  })
}
