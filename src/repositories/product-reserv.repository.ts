import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {StockDataSource} from '../datasources';
import {ProductReserv, ProductReservRelations} from '../models';

export class ProductReservRepository extends DefaultCrudRepository<
  ProductReserv,
  typeof ProductReserv.prototype.order_id,
  ProductReservRelations
> {
  constructor(
    @inject('datasources.stock') dataSource: StockDataSource,
  ) {
    super(ProductReserv, dataSource);
  }
}
