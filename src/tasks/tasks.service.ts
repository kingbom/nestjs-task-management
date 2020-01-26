import { Injectable } from '@nestjs/common';
import { Tasks, TasksStatus} from './tasks.model';
import * as uuid from 'uuid/v1';

@Injectable()
export class TasksService {
    private tasks: Tasks[] = [];

    getAllTasks() {
        return this.tasks;
    }

    createTasks(title : string , description : string): Tasks {
        const tasks : Tasks = {
            id : uuid(),
            title,
            description,
            status: TasksStatus.OPEN
        }

        this.tasks.push(tasks);
        return tasks;
    }
}
