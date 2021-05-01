import moment from 'moment'
import React from 'react'
import { currentSprint } from '../data'
import './Kanbanboard.scss'
import KanbanboardStep from './KanbanboardStep'

const Kanbanboard: React.FC = () => {
    return (
        <div id="Kanbanboard">
            <div className="title">{currentSprint.sprintName}</div>
            <div className="date-range-background">
                <div className="date-range-text">
                    {`${moment(currentSprint.startDate).format(
                        'YYYY.MM.DD'
                    )} ~ ${moment(currentSprint.endDate).format('YYYY.MM.DD')}`}
                </div>
            </div>
            <div className="step-wrapper">
                {currentSprint.stepList.map((step) => {
                    return <KanbanboardStep {...step} />
                })}
            </div>
        </div>
    )
}

export default Kanbanboard
