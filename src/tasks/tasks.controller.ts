import { Controller, Get, Post, Delete, Patch, Body, Param} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks , TasksStatus } from './tasks.model';
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

    @Delete("/:id")
    deletTasks(@Param("id") id: string) {
       this.tasksService.deleteTasks(id);
    }

    @Patch("/:id/status")
    updateTasksStatus(@Param("id") id: string, @Body("status") status: TasksStatus) : Tasks {
       return this.tasksService.updateTasksStatus(id, status);
    }
}
