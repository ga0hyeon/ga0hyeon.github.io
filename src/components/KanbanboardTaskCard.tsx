import React, { useState } from 'react'
import './KanbanboardTaskCard.scss'
import doubleArrowDown from '../resource/icons/double_arrow_down.svg'
import doubleArrowUp from '../resource/icons/double_arrow_up.svg'
import arrowDown from '../resource/icons/arrow_down.svg'
import arrowUp from '../resource/icons/arrow_up.svg'
import dash from '../resource/icons/single_dash.svg'
import { Sprint, currentSprintState, Step, Task } from '../data'
import KanbanboardTaskModifyModal from './KanbanboardTaskModifyModal'
import { useRecoilState } from 'recoil'
const KanbanboardTaskCard: React.FC<Task> = (props: Task) => {
    const [sprint, setSprint] = useRecoilState(currentSprintState)
    const [showModifyModal, setShowModifyModal] = useState<boolean>(false)
    const priorityIconList = [
        doubleArrowDown,
        arrowDown,
        dash,
        arrowUp,
        doubleArrowUp,
    ]
    const handleDragStart = (e: any) => {
        e.dataTransfer.setData('prevStepIndex', props.stepIndex)
        e.dataTransfer.setData('taskId', props.taskId)
    }
    const handleDoubleClick = (e: any) => {
        e.preventDefault()
        if (!showModifyModal) setShowModifyModal(true)
    }
    const handleModifyModalHide = () => {
        setShowModifyModal(false)
    }
    const handleModifyModalSave = (newTask: Task) => {
        setSprint((oldSprint: Sprint) => {
            const stepList: Step[] = JSON.parse(
                JSON.stringify(oldSprint.stepList)
            )

            const taskIndex = stepList[newTask.stepIndex].taskList.findIndex(
                (task) => {
                    return task.taskId === newTask.taskId
                }
            )

            if (taskIndex > -1) {
                //exchange old task to new task
                stepList[newTask.stepIndex].taskList[taskIndex] = newTask

                //reorder task list
                stepList[newTask.stepIndex].taskList = stepList[
                    newTask.stepIndex
                ].taskList.sort((a: Task, b: Task) => {
                    return b.priority - a.priority
                })
            }

            return { ...oldSprint, stepList: stepList }
        })
    }
    return (
        <>
            <div
                id="KanbanboardTaskCard"
                draggable={true}
                onDragStart={handleDragStart}
                onDoubleClick={handleDoubleClick}
            >
                <div className="task-title">{props.taskTitle}</div>
                <div className="task-desc">{props.taskDesc}</div>
                <div className="task-priority">
                    <img
                        src={priorityIconList[props.priority]}
                        alt={`task_priority_${props.priority}`}
                    />
                </div>
                <div className="task-difficulty">{props.diffuculty}</div>
            </div>
            <KanbanboardTaskModifyModal
                task={props}
                show={showModifyModal}
                onHide={handleModifyModalHide}
                onSave={handleModifyModalSave}
            />
        </>
    )
}

export default KanbanboardTaskCard
