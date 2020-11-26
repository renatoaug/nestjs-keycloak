import { ArgsType, Field } from '@nestjs/graphql'
import { Expose } from 'class-transformer'

@ArgsType()
export class CheckResourcePermissionDto {
  @Expose()
  @Field()
  realm: string

  @Expose()
  @Field()
  resource: string

  @Expose()
  @Field()
  scope: string
}
