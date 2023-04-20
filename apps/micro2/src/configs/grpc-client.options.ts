import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'hero2', // ['hero', 'hero2']
    protoPath: [join(process.cwd(), 'proto', 'hero2.proto')], // ['./hero/hero.proto', './hero/hero2.proto']
    url: 'localhost:5002',
  },
};
