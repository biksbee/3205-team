import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { LinksService } from '../links.service';
import { LinksModel } from '../models/links.model';
import { IpAddressesModel } from '../models/ip-addresses.model';
import { ConfigService } from '@nestjs/config';

describe('LinksService', () => {
  let service: LinksService;
  let model: typeof LinksModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinksService,
        {
          provide: getModelToken(LinksModel),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getModelToken(IpAddressesModel),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<LinksService>(LinksService);
    model = module.get<typeof LinksModel>(getModelToken(LinksModel));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new short link', async () => {
      const dto = { fingerprint: 'testFingerprint', originalUrl: 'https://example.com', expiresAt: '1h', };
      const mockResponse = { shortUrl: 'https://short.ly/abc123' };

      jest.spyOn(model, 'create').mockResolvedValue(mockResponse as any);

      const result = await service.create(dto);

      expect(model.create).toHaveBeenCalledWith({
        fingerprint: 'testFingerprint',
        originalUrl: 'https://example.com',
        expiresAt: '1h',
        shortUrl: expect.any(String), // Ensure a short URL is generated
      });
      expect(result).toEqual(mockResponse);
    });
  });

  // describe('redirect', () => {
  //   it('should find the original URL by short URL', async () => {
  //     const mockShortUrl = 'https://short.ly/abc123';
  //     const mockResponse = { originalUrl: 'https://example.com' };
  //
  //     jest.spyOn(model, 'findOne').mockResolvedValue(mockResponse as any);
  //
  //     const result = await service.redirect(mockShortUrl);
  //
  //     expect(model.findOne).toHaveBeenCalledWith({
  //       where: { shortUrl: mockShortUrl },
  //     });
  //     expect(result).toEqual(mockResponse);
  //   });
  // });
});
