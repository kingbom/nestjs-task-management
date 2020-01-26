import { Controller, Get, Post, Body} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from './tasks.model';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService){}

    @Get()
    getAllTasks() : Tasks[] {
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTasks(
        @Body('title') title : string, 
        @Body('description') description : string
    ) : Tasks {
        return this.tasksService.createTasks(title, description);
    }
}
