import {Entity, model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Product
 * Product
 */
@model({name: 'Product'})
export class Product extends Entity {
  constructor(data?: Partial<Product>) {
    super(data);
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({
    type: 'number',
    format: 'int32',
    minimum: 0,
    maximum: 2147483647,
    id: true,
    generated: true
  })
  product_id?: number;

  /**
   *
   */
  @property({
    type: 'string',
  })
  name?: string;

  /**
   *
   */
  @property({
    type: 'number',
    format: 'int32',
    minimum: 0,
    maximum: 2147483647,
  })
  number: number;

}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;


