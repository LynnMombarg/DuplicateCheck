import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth.guard';
import { AuthDTO } from '../auth.dto';
import { AuthDAO } from '../auth.dao';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        {
          provide: AuthDAO,
          useValue: jest.fn(),
        },
        {
          provide: AuthGuard,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('logout', () => {
    it('should call authService.logout()', async () => {
      // Arrange
      const userId = 'test-user-id';
      const accessToken = 'test-access-token';
      const refreshToken = 'test-refresh-token';
      const authDTO = new AuthDTO(userId, accessToken, refreshToken);
      jest.fn();
      jest.fn().mockImplementation((cb) => cb());
      jest.spyOn(authService, 'getTokensByOrgId').mockResolvedValue(authDTO);
      jest.spyOn(authService, 'logout').mockImplementation(() => {});

      // Act
      await controller.logout({ user: { userId } });

      // Assert
      expect(authService.getTokensByOrgId).toHaveBeenCalledWith(userId);
      expect(authService.logout).toHaveBeenCalledWith(userId);
    });
  });
});
