import moment from 'moment'

export interface Sprint {
    sprintId: number
    sprintName: string
    startDate: Date
    endDate: Date
    stepList: Step[]
    retroComment?: string
}

export interface Step {
    stepTitle: string
    stepColor: string
    taskList: Task[]
}

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
}

export const currentSprint: Sprint = {
    sprintId: 4,
    sprintName: 'Sprint #4',
    startDate: moment().toDate(),
    endDate: moment().add(14, 'day').toDate(),

    stepList: [
        {
            stepTitle: 'Todo',
            stepColor: 'rgb(64, 64, 64)',
            taskList: [
                {
                    sprintId: 4,
                    taskId: 0,
                    priority: 3,
                    taskTitle: 'TDC 인강보기',
                    taskDesc: '1강부터 4강까지 보고 실습 내용 정리하기 !!!!',
                    diffuculty: 2,
                    createDate: moment().toDate(),
                    startDate: undefined,
                    doneDate: undefined,
                    blockedDate: undefined,
                },
            ],
        },
        {
            stepTitle: 'Doing',
            stepColor: 'rgb(52, 152, 219)',
            taskList: [
                {
                    sprintId: 4,
                    taskId: 1,
                    priority: 0,
                    taskTitle: 'TDC 인강보기',
                    taskDesc:
                        '으아아아아아아아ㅏ아 아아아아아아 아아아아아 아아아아아아 아아아아아 아아아아아 으아아아아아아아ㅏ아 아아아아아아 아아아아아 아아아아아아 아아아아아 아아아아아 1강부터 4강까지 보고 실습 내용 정리하기 !!!!',
                    diffuculty: 2,
                    createDate: moment().toDate(),
                    startDate: undefined,
                    doneDate: undefined,
                    blockedDate: undefined,
                },
                {
                    sprintId: 4,
                    taskId: 1,
                    priority: 4,
                    taskTitle: 'TDC 인강보기',
                    taskDesc:
                        '으아아아아아아아ㅏ아 아아아아아아 아아아아아 아아아아아아 아아아아아 아아아아아 으아아아아아아아ㅏ아 아아아아아아 아아아아아 아아아아아아 아아아아아 아아아아아 1강부터 4강까지 보고 실습 내용 정리하기 !!!!',
                    diffuculty: 2,
                    createDate: moment().toDate(),
                    startDate: undefined,
                    doneDate: undefined,
                    blockedDate: undefined,
                },
                {
                    sprintId: 4,
                    taskId: 1,
                    priority: 3,
                    taskTitle: 'TDC 인강보기',
                    taskDesc:
                        '으아아아아아아아ㅏ아 아아아아아아 아아아아아 아아아아아아 아아아아아 아아아아아 으아아아아아아아ㅏ아 아아아아아아 아아아아아 아아아아아아 아아아아아 아아아아아 1강부터 4강까지 보고 실습 내용 정리하기 !!!!',
                    diffuculty: 2,
                    createDate: moment().toDate(),
                    startDate: undefined,
                    doneDate: undefined,
                    blockedDate: undefined,
                },
                {
                    sprintId: 4,
                    taskId: 1,
                    priority: 2,
                    taskTitle: 'TDC 인강보기',
                    taskDesc:
                        '으아아아아아아아ㅏ아 아아아아아아 아아아아아 아아아아아아 아아아아아 아아아아아 으아아아아아아아ㅏ아 아아아아아아 아아아아아 아아아아아아 아아아아아 아아아아아 1강부터 4강까지 보고 실습 내용 정리하기 !!!!',
                    diffuculty: 2,
                    createDate: moment().toDate(),
                    startDate: undefined,
                    doneDate: undefined,
                    blockedDate: undefined,
                },
                {
                    sprintId: 4,
                    taskId: 1,
                    priority: 1,
                    taskTitle: 'TDC 인강보기',
                    taskDesc:
                        '으아아아아아아아ㅏ아 아아아아아아 아아아아아 아아아아아아 아아아아아 아아아아아 으아아아아아아아ㅏ아 아아아아아아 아아아아아 아아아아아아 아아아아아 아아아아아 1강부터 4강까지 보고 실습 내용 정리하기 !!!!',
                    diffuculty: 2,
                    createDate: moment().toDate(),
                    startDate: undefined,
                    doneDate: undefined,
                    blockedDate: undefined,
                },
            ],
        },
        {
            stepTitle: 'Done',
            stepColor: 'rgb(39, 174, 96)',
            taskList: [],
        },
        {
            stepTitle: 'blocked',
            stepColor: 'rgb(231, 76, 60)',
            taskList: [],
        },
    ],
}
