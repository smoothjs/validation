import { ClassTransformOptions, plainToClass } from 'class-transformer'
import { ValidatorOptions } from 'class-validator'

export interface ValidateBodyOptions {
  transformer?: ClassTransformOptions
  validator?: ValidatorOptions
}
