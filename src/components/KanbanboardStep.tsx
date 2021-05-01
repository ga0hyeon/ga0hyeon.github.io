import React from 'react'
import { Step } from '../data'
import './KanbanboardStep.scss'

import doubleArrowDown from '../resource/icons/double_arrow_down.svg'
import doubleArroweUp from '../resource/icons/double_arrow_down.svg'
import arrowDown from '../resource/icons/arrow_down.svg'
import arrowUp from '../resource/icons/arrow_up.svg'
import dash from '../resource/icons/single_dash.svg'

const KanbanboardStep: React.FC<Step> = (props: Step) => {
    const priorityIconList = [
        doubleArroweUp,
        arrowUp,
        dash,
        arrowDown,
        doubleArrowDown,
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
