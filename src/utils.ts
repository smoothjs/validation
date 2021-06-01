import { Config } from '@smoothjs/config'
import { Class } from '@smoothjs/smooth'

const Ajv = require('ajv')
const config = new Config()

export function isArrowFunction(value: any): value is (controller: any) => Class {
  return !Object.prototype.hasOwnProperty.call(value, 'prototype')
}

export function getAjvInstance(): any {
  return new Ajv({
    $data: config.get('ajv.$data'),
    allErrors: config.get('ajv.allErrors', 'boolean'),
    coerceTypes: config.get('ajv.coerceTypes', true),
    removeAdditional: config.get('ajv.removeAdditional', true) as boolean | 'all' | 'failing',
    useDefaults: config.get('ajv.useDefaults', true) as boolean | 'empty' | 'shared',
  })
}
