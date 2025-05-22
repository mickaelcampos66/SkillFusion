import { IUserWithLinks } from 'src/interface/IUser';

export const mockUser = {
  id: 1,
  firstname: 'John',
  lastname: 'Doe',
  email: 'john.doe@example.com',
  phone_number: '1234567890',
  address: '123 Test Street',
  role_id: 1,
};

export const mockUserArray = [mockUser];

export const mockPagination = {
  page: 1,
  limit: 25,
  total_count: 1,
  total_pages: 1,
};

export const mockUserWithLinks: IUserWithLinks = {
  id: 1,
  firstname: 'John',
  lastname: 'Doe',
  email: 'john.doe@example.com',
  // password: 'hashed-password',
  phone_number: '1234567890',
  address: '123 Test Street',
  role_id: 1,
  role: undefined,
  posts: [],
  messages: [],
  courses: [],
  links: {
    self: '/users/1',
    role: '/roles/1',
  },
};

export const mockUserWithLinksArray: IUserWithLinks[] = [mockUserWithLinks];
