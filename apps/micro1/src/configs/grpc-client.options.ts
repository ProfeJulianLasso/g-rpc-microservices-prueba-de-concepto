import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'hero1', // ['hero', 'hero2']
    protoPath: [join(process.cwd(), 'proto', 'hero1.proto')], // ['./hero/hero.proto', './hero/hero2.proto']
    url: 'localhost:5001',
  },
};
