import { ArgsType, Field } from '@nestjs/graphql'
import { Expose } from 'class-transformer'

@ArgsType()
export class CheckResourcePermissionDto {
  @Expose()
  @Field()
  realm: string

  @Expose({ name: 'client_name' })
  @Field({ name: 'client_name' })
  clientName: string

  @Expose()
  @Field()
  resource: string

  @Expose()
  @Field()
  scope: string
}
