import { Injectable, NotFoundException } from '@nestjs/common';
import { Tasks, TasksStatus} from './tasks.model';
import { CreateTasksDto } from './dto/create-tasks.dto';
import * as uuid from 'uuid/v1'
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Tasks[] = [];

    getAllTasks() : Tasks[] {
        return this.tasks;
    }

    getTasksWithFilter(filterDto: GetTaskFilterDto) : Tasks[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();
        
        if(status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if(search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }

        return tasks;
    }

    getTasksById(id: string) : Tasks {
       const  tasks = this.tasks.find(tasks => tasks.id === id);
       if(!tasks) {
           throw new NotFoundException(`Tasks with Id ${id} not found`);;
       }
       return tasks;
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

    deleteTasks(id: string): void {
       const tasks = this.getTasksById(id);
       this.tasks = this.tasks.filter(task => task.id !== tasks.id);
    }

    updateTasksStatus(id: string, taskStatus: TasksStatus): Tasks {
        const tasks = this.getTasksById(id);
        tasks.status = taskStatus;
        return tasks;
    } 
}
