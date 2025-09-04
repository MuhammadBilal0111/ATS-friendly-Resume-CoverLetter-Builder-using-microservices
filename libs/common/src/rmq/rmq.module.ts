import { DynamicModule, Module } from '@nestjs/common';
import { RmqService } from './rmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

interface RmqModuleOptions {
  clientToken: symbol; // the injection token (e.g. RESUME_CLIENT)
  queue: string; // actual queue name constant
}

@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  // Transform it in dynamic module
  // name of the service to register
  // register function returns a dynamic module
  static register({ clientToken, queue }: RmqModuleOptions): DynamicModule {
    console.log('Registering RMQ Module for:', String(clientToken));
    return {
      module: RmqModule, // the module to return
      imports: [
        // register the rabbitMq service that is passed here
        ClientsModule.registerAsync([
          // register the rabbitMq service
          {
            name: clientToken, // name of the client service
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [
                  configService.get<string>('rabbitMq.rabbitMqUri') as string,
                ], // from env
                queue, // actual queue name constant
                noAck: true, // default option for consuming messages
                persistent: true,
                queueOptions: {
                  durable: true, // makes queue non-durable
                },
              },
            }),
            inject: [ConfigService], // inject the config service in useFactory() method
          },
        ]),
      ],
      exports: [ClientsModule], // export the ClientsModule so that it can be used in other modules
    };
  }
}
