import { Terminal, TerminalSchema } from './terminal.schema';
import { Module } from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { TerminalController } from './terminal.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Terminal.name, schema: TerminalSchema },
    ]),
  ],
  providers: [TerminalService],
  controllers: [TerminalController],
})
export class TerminalModule {}
