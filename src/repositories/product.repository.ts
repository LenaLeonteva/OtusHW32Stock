import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {StockDataSource} from '../datasources';
import {Product, ProductRelations} from '../models';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.product_id,
  ProductRelations
> {
  constructor(
    @inject('datasources.stock') dataSource: StockDataSource,
  ) {
    super(Product, dataSource);
  }
}
