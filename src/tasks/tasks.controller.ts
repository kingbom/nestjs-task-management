import { Controller, Get, Post, Delete, Patch, Body, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks, TasksStatus } from './tasks.model';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TasksStatusValidationPipe } from './pipes/tasks-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService){}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto) : Tasks[] {
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilter(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get("/:id")
    getTasksById(@Param("id") id: string) : Tasks {
        return this.tasksService.getTasksById(id);
     }

    @Post()
    @UsePipes(ValidationPipe)
    createTasks(@Body() createTasksDto: CreateTasksDto) : Tasks {
        return this.tasksService.createTasks(createTasksDto);
    }

    @Patch("/:id/status")
    updateTasksStatus(@Param("id") id : string, @Body("status", TasksStatusValidationPipe) status : TasksStatus) : Tasks {
       return this.tasksService.updateTasksStatus(id, status);
    }

    @Delete("/:id")
    deletTasks(@Param("id") id: string) {
       this.tasksService.deleteTasks(id);
    }
}
