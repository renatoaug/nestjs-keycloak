import { ArgsType, Field } from '@nestjs/graphql'
import { Expose } from 'class-transformer'

@ArgsType()
export class GetUserPermissionsDto {
  @Expose()
  @Field()
  realm: string

  @Expose({ name: 'client_name' })
  @Field({ name: 'client_name' })
  clientName: string

  @Expose()
  @Field(() => [String])
  resources: string[]

  @Expose()
  @Field()
  scope: string
}
