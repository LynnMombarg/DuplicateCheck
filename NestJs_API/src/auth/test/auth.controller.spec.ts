import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth.guard';
import { AuthDTO } from '../dto/auth.dto';
import { AuthDAO } from '../auth.dao';

describe('AuthController', () => {
  let controller: AuthController;

  const mockedAuthService = {
    login: jest.fn(),
  };
  const mockedAuthGuard = {

  };
  const mockedJwtService = {

  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockedAuthService,
        },
        {
          provide: AuthGuard,
          useValue: mockedAuthGuard,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        }
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('callback', () => {
    it('should call', () => {
     // Arrange
     const code = 'code';
     const res = {user: {}};

     // Act
      controller.callback(code, res);

     // Assert
      expect(mockedAuthService.login).toHaveBeenCalled();
    });
  });
});
