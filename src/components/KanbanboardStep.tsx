import React from 'react'
import { Step } from '../data'
import './KanbanboardStep.scss'

import arrowDoubleDown from '../resource/icons/angle-double-down.svg'
import arrowDoubleUp from '../resource/icons/angle-double-up.svg'
import arrowDown from '../resource/icons/angle-down.svg'
import arrowUp from '../resource/icons/angle-up.svg'
import dash from '../resource/icons/window-minimize.svg'

const KanbanboardStep: React.FC<Step> = (props: Step) => {
    const priorityIconList = [
        arrowDoubleUp,
        arrowUp,
        dash,
        arrowDown,
        arrowDoubleDown,
    ]
    return (
        <div id="KanbanboardStep">
            <div
                className="step-title"
                style={{ backgroundColor: props.stepColor }}
            >
                {props.stepTitle}
            </div>
            <div className="task-wrapper">
                {props.taskList.map((task) => {
                    return (
                        <div id="KanbanboardTaskCard">
                            <div className="task-title">{task.taskTitle}</div>
                            <div className="task-desc">{task.taskDesc}</div>
                            <div className="task-priority">
                                <img
                                    src={priorityIconList[task.priority]}
                                    alt={`task_priority_${task.priority}`}
                                />
                            </div>
                            <div className="task-difficulty">
                                {task.diffuculty}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default KanbanboardStep
