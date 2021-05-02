import React from 'react'
import { useRecoilState } from 'recoil'
import { Sprint, currentSprintState, Step, Task } from '../data'
import './KanbanboardStep.scss'
import KanbanboardTaskCard from './KanbanboardTaskCard'

const KanbanboardStep: React.FC<Step> = (props: Step) => {
    const [sprint, setSprint] = useRecoilState(currentSprintState)

    const moveTaskToStep = (
        taskId: number,
        prevStepIndex: number,
        nextStepIndex: number
    ) => {
        setSprint((oldSprint: Sprint) => {
            let stepList: Step[] = JSON.parse(
                JSON.stringify(oldSprint.stepList)
            )
            const taskIndexInPrevStep = stepList[
                prevStepIndex
            ].taskList.findIndex((task) => {
                return task.taskId === +taskId
            })

            if (taskIndexInPrevStep > -1) {
                const task =
                    stepList[prevStepIndex].taskList[taskIndexInPrevStep]

                //remove task from prev step
                stepList[prevStepIndex].taskList.splice(taskIndexInPrevStep, 1)

                //add task to next step
                stepList[nextStepIndex].taskList.push({
                    ...task,
                    stepIndex: nextStepIndex,
                })

                stepList[nextStepIndex].taskList = stepList[
                    nextStepIndex
                ].taskList.sort((a: Task, b: Task) => {
                    return b.priority - a.priority
                })
            }

            return { ...oldSprint, stepList: stepList }
        })
    }

    const handleDrop = (e: any) => {
        e.preventDefault()
        const taskId = e.dataTransfer.getData('taskId')
        const prevStepIndex = e.dataTransfer.getData('prevStepIndex')
        moveTaskToStep(taskId, prevStepIndex, props.stepIndex)
    }
    const handleDragover = (e: any) => {
        e.preventDefault()
    }

    return (
        <div
            id="KanbanboardStep"
            onDrop={handleDrop}
            onDragOver={handleDragover}
        >
            <div
                className="step-title"
                style={{ backgroundColor: props.stepColor }}
            >
                {props.stepTitle}
            </div>
            <div className="task-wrapper">
                {props.taskList.map((task) => {
                    return <KanbanboardTaskCard key={task.taskId} {...task} />
                })}
            </div>
        </div>
    )
}

export default KanbanboardStep
