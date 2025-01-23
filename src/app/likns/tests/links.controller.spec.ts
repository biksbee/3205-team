import { Test, TestingModule } from '@nestjs/testing';
import { LinksController } from '../links.controller';
import { LinksService } from '../links.service';
import { CreateShortLinkDto } from '../links.dto';

describe('LinksController', () => {
  let controller: LinksController;
  let service: LinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinksController],
      providers: [
        {
          provide: LinksService,
          useValue: {
            create: jest.fn(),
            redirect: jest.fn(),
          },
        },
        {
          provide: 'IpAddressesModelRepository',
          useValue: {}, // Мок-объект для зависимости
        }
      ],
    }).compile();

    controller = module.get<LinksController>(LinksController);
    service = module.get<LinksService>(LinksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call LinksService.create with correct data', async () => {
      const dto: CreateShortLinkDto = { originalUrl: 'https://example.com' };
      const mockResponse = { shortUrl: 'https://short.ly/abc123' };

      jest.spyOn(service, 'create').mockResolvedValue(mockResponse);

      const result = await controller.create(dto, { fingerprint: { hash: 'testFingerprint' } } as any);

      expect(service.create).toHaveBeenCalledWith({
        fingerprint: 'testFingerprint',
        ...dto,
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
