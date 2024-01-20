import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Response, RestBindings, api, operation, requestBody} from '@loopback/rest';
import {ProductReserv} from '../models/product-reserv.model';
import {Product} from '../models/product.model';
import {ProductRepository, ProductReservRepository} from '../repositories';

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by <no-tag>.
 *
 */
@api({
  components: {
    schemas: {
      Product: {
        type: 'object',
        properties: {
          product_id: {
            type: 'number',
            format: 'int32',
          },
          name: {
            type: 'string',
          },
          number: {
            type: 'number',
            format: 'int32',
          },
        },
      },
      ProductReserv: {
        type: 'object',
        properties: {
          order_id: {
            type: 'string',
          },
          product_id: {
            type: 'number',
            format: 'int32',
          },
          number: {
            type: 'number',
            format: 'int32',
          },
          completed: {
            type: 'boolean',
          },
        },
      },
    },
  },
  paths: {},
})
export class OpenApiController {
  constructor(
    @repository(ProductRepository)
    private productRepo: ProductRepository,
    @repository(ProductReservRepository)
    private reservRepo: ProductReservRepository,
    @inject(RestBindings.Http.RESPONSE)
    private response: Response,

  ) { }
  /**
   *
   *
   * @param _requestBody Created courier
   */
  @operation('post', '/products/add', {
    operationId: 'addProduct',
    responses: {
      '200': {
        description: 'OK',
      },
    },
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Product',
          },
        },
      },
      description: 'Created courier',
      required: true,
    },
  })
  async addProduct(@requestBody({
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Product',
        },
      },
    },
    description: 'Created courier',
    required: true,
  }) _requestBody: Product): Promise<Product | undefined> {
    if (_requestBody.product_id) {
      const id = _requestBody.product_id
      let num = (await this.productRepo.findById(id)).number;
      await this.productRepo.updateById(id, {number: num + _requestBody.number})
      return
    } else {
      const result = await this.productRepo.create(_requestBody)
      return result
    }
  }
  /**
   *
   *
   * @param _requestBody Created reserve product
   */
  @operation('post', '/products/reserve', {
    operationId: 'reserveProducts',
    responses: {
      '200': {
        description: 'OK',
      },
    },
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ProductReserv',
          },
        },
      },
      description: 'Created reserve product',
      required: true,
    },
  })
  async reserveProducts(@requestBody({
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/ProductReserv',
        },
      },
    },
    description: 'Created reserve product',
    required: true,
  }) _requestBody: ProductReserv): Promise<ProductReserv | undefined | any> {
    const orderID = _requestBody.order_id;
    if (_requestBody.completed) {
      await this.reservRepo.updateById(orderID, {completed: true});
      return
    } else {
      if (!_requestBody.product_id) return this.response.status(404).send({
        error: "Error! The product ID is empty"
      });
      const productID = _requestBody.product_id;
      let numProduct = (await this.productRepo.findById(productID)).number;
      await this.productRepo.updateById(productID, {number: numProduct + (_requestBody.number ?? 0)})
      const result = await this.reservRepo.create(_requestBody)
      return result
    }
  }
  /**
   *
   *
   * @param _requestBody Created reserve product
   */
  @operation('delete', '/products/reserve', {
    operationId: 'deleteReserve',
    responses: {
      '200': {
        description: 'OK',
      },
    },
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ProductReserv',
          },
        },
      },
      description: 'Created reserve product',
      required: true,
    },
  })
  async deleteReserve(@requestBody({
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/ProductReserv',
        },
      },
    },
    description: 'Created reserve product',
    required: true,
  }) _requestBody: ProductReserv): Promise<undefined> {
    let orderID = _requestBody.order_id;
    let reserved = await this.reservRepo.findById(orderID);
    let productID = reserved.product_id;
    let prodNum = (await this.productRepo.findById(productID)).number
    await this.productRepo.updateById(productID, {number: prodNum + (reserved.number ?? 0)});
    await this.reservRepo.deleteById(orderID);
    return
  }
}

