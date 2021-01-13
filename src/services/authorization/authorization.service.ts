import { Connection } from 'mongoose';
import { BaseService } from '../base-service';
import { AuthorizationSchema } from '../../common/schemas/authorization-schema';
import { ApiHelpers } from '../../lib/api.helpers';

export default class AuthorizationService extends BaseService<any> {
  apiHelpers: ApiHelpers;

  constructor(connection: Connection) {
    super(connection, AuthorizationSchema, 'authorization');
    this.apiHelpers = new ApiHelpers();
  }

  public async checkAuth(authToken: any) {
    const decodedToken = await this.apiHelpers.decodeToken(authToken);

    const authorization = await this.model.findOne({ appName: decodedToken[1] });

    if (authorization && decodedToken[1] === authorization.apiKey) {
      return {
        status: 200,
        authorized: true,
        message: `Request with token ${decodedToken[1]} is authorized to use this resource`
      }
    } else {
      return {
        status: 401,
        authorized:false,
        message: `Request with token ${decodedToken[1]} is not authorized to use this resource`
      }
    }
  }

  public async createAuth(data: any) {
    const validApiKey = this.apiHelpers.validateToken(data.apiKey);

    if (validApiKey) {
      return await this.model.create(data);
    } else {
      return {
        status: 500,
        message: `The Api Key ${data.apiKey} is invalid`
      }

    }
  }
}
