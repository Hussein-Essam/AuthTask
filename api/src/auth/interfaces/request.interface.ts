import { Request } from 'express';
import { UserDocument } from 'src/user/schemas/user.schema';

export type AuthUser = Pick<UserDocument, 'email' | 'name' | '_id'>;

export interface AuthRequest extends Request {
  user: AuthUser;
}
