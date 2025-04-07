import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma.service";
import { RegisterDto } from "./dto/register.dto";

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, PrismaService],
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    it('should return success message when registering a user', () => {
        const dto: RegisterDto = {
          firstname: 'John',
          lastname: 'Doe',
          email: 'john@example.com',
          password: 'securepassword',
        };

    const result = authService.register(dto);

    expect(result).toEqual({ message: 'User registered successfully', userId: 1 });
  });
});