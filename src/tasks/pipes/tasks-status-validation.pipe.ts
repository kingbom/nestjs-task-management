import { TasksStatus } from './../tasks.model';
import { PipeTransform, BadRequestException } from '@nestjs/common';
import { throws } from 'assert';

export class TasksStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TasksStatus.OPEN,
        TasksStatus.IN_PROGRESS,
        TasksStatus.DONE,
    ]

    transform(value: any) {
        value = value.toUpperCase();
        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is an invalid status`);
        }
        return value;
    }

    private isStatusValid(status: any) {
       return this.allowedStatuses.indexOf(status) !== -1 ;
    }
}