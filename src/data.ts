import moment from 'moment'
import { atom } from 'recoil'

export interface Master {
    currentSprint: Sprint
    sprintHistory: Sprint[]
    backlog: Task[]
}

export interface Sprint {
    sprintId: number
    sprintName: string
    startDate: Date
    endDate: Date
    stepList: Step[]
    retroComment?: string
}

export interface Step {
    stepIndex: number
    stepTitle: string
    stepColor: string
    taskList: Task[]
}

export interface Task {
    sprintId: number
    stepIndex: number
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
            stepIndex: 0,
            stepTitle: 'Todo',
            stepColor: 'rgb(64, 64, 64)',
            taskList: [
                {
                    sprintId: 4,
                    stepIndex: 0,
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
            stepIndex: 1,
            stepTitle: 'Doing',
            stepColor: 'rgb(52, 152, 219)',
            taskList: [
                {
                    sprintId: 4,
                    stepIndex: 1,
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
                    stepIndex: 1,
                    taskId: 2,
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
                    stepIndex: 1,
                    taskId: 3,
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
                    stepIndex: 1,
                    taskId: 4,
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
                    stepIndex: 1,
                    taskId: 5,
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
            stepIndex: 2,
            stepTitle: 'Done',
            stepColor: 'rgb(39, 174, 96)',
            taskList: [],
        },
        {
            stepIndex: 3,
            stepTitle: 'blocked',
            stepColor: 'rgb(231, 76, 60)',
            taskList: [],
        },
    ],
}

export const master: Master = {
    currentSprint: currentSprint,
    sprintHistory: [
        currentSprint,
        currentSprint,
        currentSprint,
        currentSprint,
        currentSprint,
        currentSprint,
    ],
    backlog: [
        {
            sprintId: 4,
            stepIndex: 1,
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
            stepIndex: 1,
            taskId: 2,
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
            stepIndex: 1,
            taskId: 3,
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
            stepIndex: 1,
            taskId: 4,
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
            stepIndex: 1,
            taskId: 5,
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
}

export const sprintHistoryState = atom({
    key: 'sprintHistoryState',
    default: master.sprintHistory,
})

export const backlogState = atom({
    key: 'backlogState',
    default: master.backlog,
})

export const currentSprintState = atom({
    key: 'currentSprintState',
    default: master.currentSprint,
})
