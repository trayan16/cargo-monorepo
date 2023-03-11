import { PartialType } from '@nestjs/mapped-types';
import { CreateShippingLineDto } from './createShippingLine.dto';

export class UpdateShippingLineDto extends PartialType(CreateShippingLineDto) {}
