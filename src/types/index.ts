import Decimal from 'decimal.js'

export type BigNumber = Decimal.Value | number | string

export * from './sui'
export * from './burn'
