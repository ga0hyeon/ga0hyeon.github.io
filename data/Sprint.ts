import { Task } from './Task'

export interface Sprint {
    sprintId: number
    sprintName: string
    startDate: Date
    endDate: Date
    backlog?: Task[]
    doing?: Task[]
    done?: Task[]
    blocked?: Task[]
    retroComment?: string
}
