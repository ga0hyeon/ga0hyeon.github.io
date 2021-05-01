export interface Task {
    sprintId: number
    taskId: number
    priority: number //1, 2, 3, 4, 5 / default 3
    taskTitle: string
    taskDesc: string
    diffuculty: number //1, 2, 3, 4, 5 / no default value
    createDate: Date
    startDate?: Date
    doneDate?: Date
    blockedDate?: Date
    status: string //backlog, doing, done, blocked
}
