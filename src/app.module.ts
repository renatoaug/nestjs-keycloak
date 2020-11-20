import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CreatePolicyService, CreateResourceService, CreateScopeService } from 'src/service'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule],
  providers: [CreateResourceService, CreateScopeService, CreatePolicyService],
})
export class AppModule {}
