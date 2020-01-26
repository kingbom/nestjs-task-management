import { Injectable } from '@nestjs/common';
import { Tasks, TasksStatus} from './tasks.model';
import { CreateTasksDto } from './dto/create-tasks.dto';
import * as uuid from 'uuid/v1'

@Injectable()
export class TasksService {
    private tasks: Tasks[] = [];

    getAllTasks() {
        return this.tasks;
    }

    getTasksById(id: string) : Tasks {
       return this.tasks.find(tasks => tasks.id === id);
    }

    createTasks(createTasksDto: CreateTasksDto): Tasks {
        const { title, description} = createTasksDto;
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
