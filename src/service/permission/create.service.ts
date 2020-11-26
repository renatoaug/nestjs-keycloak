import { Injectable, Logger } from '@nestjs/common'
import { Permission } from 'src/domain'
import { PermissionClient } from 'src/client'
import { PermissionInterface } from 'src/interface'

@Injectable()
export class CreatePermissionService {
  constructor(private readonly permissionClient: PermissionClient) {}

  async perform(
    realm: string,
    accessToken: string,
    permission: PermissionInterface,
  ): Promise<Permission> {
    try {
      if (!permission.type) throw Error('Permission type is missing')
      if (permission.isScope() && permission.scopes.length === 0) throw Error('Scopes are missing')

      const { data } = await this.permissionClient.create(realm, accessToken, permission)

      return data as Permission
    } catch (error) {
      Logger.error('Error on trying to create permission', error, CreatePermissionService.name)

      throw error
    }
  }
}
