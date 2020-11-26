import { ArgsType, Field } from '@nestjs/graphql'
import { Expose } from 'class-transformer'

@ArgsType()
export class GetUserPermissionsDto {
  @Expose()
  @Field()
  realm: string

  @Expose()
  @Field(() => [String])
  resources: string[]

  @Expose()
  @Field()
  scope: string
}
