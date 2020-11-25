import { INestApplication, Type } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import { UserClient } from 'src/client'

export abstract class BaseTest {
  static app: INestApplication
  static adminToken: string

  static async before() {
    jest.setTimeout(30000)

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    BaseTest.app = await moduleRef.createNestApplication().init()

    const { data } = await BaseTest.app
      .get(UserClient)
      .getToken('master', 'admin-cli', 'admin', 'admin')

    BaseTest.adminToken = data.access_token
  }

  before() {
    expect.hasAssertions()
  }

  get adminToken(): string {
    return BaseTest.adminToken
  }

  get<TInput = any, TResult = TInput>(type: Type<TInput>): TResult {
    return BaseTest.app.get(type)
  }
}
