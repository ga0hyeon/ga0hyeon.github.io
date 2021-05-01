import React from 'react'
import { useRecoilState } from 'recoil'
import { Sprint, sprintState, Step, Task } from '../data'
import './KanbanboardStep.scss'
import KanbanboardTaskCard from './KanbanboardTaskCard'

const KanbanboardStep: React.FC<Step> = (props: Step) => {
    const [sprint, setSprint] = useRecoilState(sprintState)

    const moveTaskToStep = (
        taskId: number,
        prevStepId: number,
        nextStepId: number
    ) => {
        setSprint((oldSprint: Sprint) => {
            let stepList: Step[] = JSON.parse(
                JSON.stringify(oldSprint.stepList)
            )
            const taskIndexInPrevStep = stepList[prevStepId].taskList.findIndex(
                (task) => {
                    return task.taskId === +taskId
                }
            )

            if (taskIndexInPrevStep > -1) {
                const task = stepList[prevStepId].taskList[taskIndexInPrevStep]

                //remove task from prev step
                stepList[prevStepId].taskList.splice(taskIndexInPrevStep, 1)

                //add task to next step
                stepList[nextStepId].taskList.push({
                    ...task,
                    stepId: nextStepId,
                })

                stepList[nextStepId].taskList = stepList[
                    nextStepId
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
        const prevStepId = e.dataTransfer.getData('prevStepId')
        moveTaskToStep(taskId, prevStepId, props.stepId)
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
