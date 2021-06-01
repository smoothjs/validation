import { Hook } from '@smoothjs/smooth'
import { ValidateFunction } from 'ajv'
import { ValidationException } from './exceptions/validation'
import { getAjvInstance } from './utils'

export function ValidateHeader(
  name: string,
  schema: object,
  options: { required?: boolean } = {}
): ClassDecorator & MethodDecorator {
  return Hook((request: any, response: any, next: Function) => {
    const required = options.required ?? true

    name = name.toLowerCase()

    let validateSchema: ValidateFunction | undefined

    if (typeof validateSchema === 'undefined') {
      validateSchema = getAjvInstance().compile({
        properties: {
          [name]: schema,
        },
        required: required ? [name] : [],
        type: 'object',
      })
    }

    if (typeof validateSchema !== 'undefined' && !validateSchema(request.headers)) {
      next(new ValidationException(validateSchema.errors || []))
    }

    next()
  })
}
