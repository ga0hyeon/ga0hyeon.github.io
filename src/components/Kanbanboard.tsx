import moment from 'moment'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { currentSprintState } from '../data'
import './Kanbanboard.scss'
import KanbanboardStep from './KanbanboardStep'

const Kanbanboard: React.FC = () => {
    const sprint = useRecoilValue(currentSprintState)

    return (
        <div id="Kanbanboard">
            <div className="title">{sprint.sprintName}</div>
            <div className="date-range-wrapper">
                <div className="date-range-text">
                    {`${moment(sprint.startDate).format(
                        'YYYY.MM.DD'
                    )} ~ ${moment(sprint.endDate).format('YYYY.MM.DD')}`}
                </div>
            </div>
            <div className="step-wrapper">
                {sprint.stepList.map((step) => {
                    return <KanbanboardStep key={step.stepTitle} {...step} />
                })}
            </div>
        </div>
    )
}

export default Kanbanboard
