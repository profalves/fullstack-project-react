import { NotFoundException } from '@nestjs/common';
import { IProduct } from 'modules/database/interfaces/product';

import { ProductRepository } from '../repositories/product';
import { ProductService } from './product';

/* eslint-disable max-len */
describe('Product/ProductService', () => {
  let productRepository: ProductRepository;
  let service: ProductService;

  const product: IProduct = {
    name: 'testProduct',
    quantity: 1,
    price: 5.55
  };

  beforeEach(async () => {
    productRepository = new ProductRepository();

    service = new ProductService(productRepository);
  });

  it('should create a product', async () => {
    jest.spyOn(productRepository, 'insert').mockImplementationOnce(product => Promise.resolve({ ...product } as any));

    const result = await service.save(product);

    expect(result).not.toBeFalsy();
    expect(result).toEqual(product);
  });

  it('should update a product', async () => {
    jest.spyOn(productRepository, 'findById').mockResolvedValueOnce({ id: 1 } as any);
    jest.spyOn(productRepository, 'update').mockImplementationOnce(product => Promise.resolve({ ...product } as any));

    const result = await service.save({ id: 1, ...product });

    expect(result).not.toBeFalsy();
    expect(result).toEqual({ id: 1, ...product });
  });

  it('should throw NotFoundException when try update a not found product', async () => {
    jest.spyOn(productRepository, 'findById').mockResolvedValueOnce(null);

    try {
      await service.save({ id: 1, ...product });
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('should remove a product', async () => {
    jest.spyOn(productRepository, 'findById').mockResolvedValueOnce({ id: 2 } as any);
    jest.spyOn(productRepository, 'remove').mockResolvedValueOnce({ id: 2 } as any);

    await service.remove(2);
  });

  it('should throw NotFoundException when try to remove a not found any product', async () => {
    jest.spyOn(productRepository, 'findById').mockResolvedValueOnce(null);

    try {
      await service.remove(2);
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
});
