export interface Tasks {
   id : string,
   title: string,
   descrition : string,
   status : TasksStatus
}

export enum TasksStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}