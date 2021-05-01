import React from 'react'
import './KanbanboardTaskCard.scss'
import doubleArrowDown from '../resource/icons/double_arrow_down.svg'
import doubleArrowUp from '../resource/icons/double_arrow_up.svg'
import arrowDown from '../resource/icons/arrow_down.svg'
import arrowUp from '../resource/icons/arrow_up.svg'
import dash from '../resource/icons/single_dash.svg'
import { Task } from '../data'
const KanbanboardTaskCard: React.FC<Task> = (props: Task) => {
    const priorityIconList = [
        doubleArrowDown,
        arrowDown,
        dash,
        arrowUp,
        doubleArrowUp,
    ]
    const handleDragStart = (e: any) => {
        e.dataTransfer.setData('prevStepId', props.stepId)
        e.dataTransfer.setData('taskId', props.taskId)
    }
    return (
        <div
            id="KanbanboardTaskCard"
            draggable={true}
            onDragStart={handleDragStart}
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
    )
}

export default KanbanboardTaskCard
