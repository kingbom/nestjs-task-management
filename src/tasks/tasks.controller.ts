import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from './tasks.model';
import { CreateTasksDto } from './dto/create-tasks.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService){}

    @Get()
    getAllTasks() : Tasks[] {
        return this.tasksService.getAllTasks();
    }

    @Get("/:id")
    getTasksById(@Param("id") id: string) : Tasks {
        return this.tasksService.getTasksById(id);
     }

    @Post()
    createTasks(@Body() createTasksDto: CreateTasksDto) : Tasks {
        return this.tasksService.createTasks(createTasksDto);
    }
}
