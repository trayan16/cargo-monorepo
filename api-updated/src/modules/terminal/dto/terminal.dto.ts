import { IsNotEmpty } from 'class-validator';

export class TerminalDto {
  @IsNotEmpty()
  readonly name: string;
}
