import { PartialType } from '@nestjs/mapped-types';
import { CreateContainerDto } from './createContainer.dto';

export class UpdateContainerDto extends PartialType(CreateContainerDto) {}
