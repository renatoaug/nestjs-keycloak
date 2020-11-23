import { INestApplication, Type } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import axios from 'axios'
import { stringify } from 'qs'
import { AppModule } from 'src/app.module'

export abstract class BaseTest {
  static app: INestApplication
  static adminToken: string
  static commonToken: string

  static async before() {
    jest.setTimeout(30000)

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    BaseTest.app = await moduleRef.createNestApplication().init()

    try {
      const { data: adminClient } = await axios.post(
        `${process.env.KEYCLOAK_SERVER_URL}/auth/realms/master/protocol/openid-connect/token`,
        stringify({
          client_id: 'admin-cli',
          grant_type: 'password',
          username: 'admin',
          password: 'admin',
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: 15000 },
      )

      BaseTest.adminToken = adminClient.access_token

      const { data: skoreFrontClient } = await axios.post(
        `${process.env.KEYCLOAK_SERVER_URL}/auth/realms/skore/protocol/openid-connect/token`,
        stringify({
          client_id: 'skore-front',
          grant_type: 'password',
          username: 'renato',
          password: 'bilu123',
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: 15000 },
      )

      BaseTest.commonToken = skoreFrontClient.access_token
    } catch {}
  }

  before() {
    expect.hasAssertions()
  }

  get adminToken(): string {
    return BaseTest.adminToken
  }

  get commonToken(): string {
    return BaseTest.commonToken
  }

  get<TInput = any, TResult = TInput>(type: Type<TInput>): TResult {
    return BaseTest.app.get(type)
  }
}
