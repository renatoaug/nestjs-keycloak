import { Args, Context, Query, Resolver } from '@nestjs/graphql'
import { plainToClass } from 'class-transformer'
import { Resource } from 'src/domain'
import { GetUserPermissionsDto, CheckResourcePermissionDto } from 'src/dto'
import { CheckResourcePermissionService, GetUserPermissionsService } from 'src/service'

@Resolver(() => Resource)
export class ResourceResolver {
  constructor(
    private readonly getUserPermissionsService: GetUserPermissionsService,
    private readonly checkResourcePermissionService: CheckResourcePermissionService,
  ) {}

  @Query(() => [String])
  getUserPermissions(
    @Args() getUserPermissionsDto: GetUserPermissionsDto,
    @Context() context: unknown,
  ): Promise<string[]> {
    const args = plainToClass(GetUserPermissionsDto, getUserPermissionsDto)
    const { headers } = context['req']

    return this.getUserPermissionsService.perform(
      args.realm,
      headers.authorization.split(' ').pop(),
      args.resources,
      args.scope,
    )
  }

  @Query(() => Boolean)
  checkResourcePermission(
    @Args() checkResourcePermissionDto: CheckResourcePermissionDto,
    @Context() context: unknown,
  ): Promise<boolean> {
    const args = plainToClass(CheckResourcePermissionDto, checkResourcePermissionDto)
    const { headers } = context['req']

    return this.checkResourcePermissionService.perform(
      args.realm,
      headers.authorization.split(' ').pop(),
      args.resource,
      args.scope,
    )
  }
}
