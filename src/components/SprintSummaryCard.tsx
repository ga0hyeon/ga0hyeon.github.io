import React from 'react'
import { Sprint } from '../data'
import './SprintSummaryCard.scss'
const SprintSummaryCard: React.FC<Sprint> = (props: Sprint) => {
    return (
        <div id="SprintSummaryCard">
            <div className="sprint-name">{props.sprintName}</div>
            <div className="task-summary-wrapper">
                {props.stepList.map((step) => {
                    return step.taskList.map((task) => {
                        return (
                            <div
                                key={`${props.sprintId}-${step.stepIndex}-${task.taskId}`}
                                className="task-one-line"
                            >
                                <div
                                    className="step-color-dot"
                                    style={{ backgroundColor: step.stepColor }}
                                />
                                <div className="task-title">
                                    {task.taskTitle}
                                </div>
                                <div className="task-difficulty">
                                    {task.diffuculty}
                                </div>
                            </div>
                        )
                    })
                })}
            </div>
        </div>
    )
}

export default SprintSummaryCard
