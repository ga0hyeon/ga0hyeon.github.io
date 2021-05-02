import React from 'react'
import { useRecoilValue } from 'recoil'
import { backlogState } from '../data'
import KanbanboardTaskCard from './KanbanboardTaskCard'
import './SprintBacklog.scss'
const SprintBacklog: React.FC = () => {
    const backlog = useRecoilValue(backlogState)
    return (
        <div id="SprintBacklog">
            {backlog.map((task) => {
                return <KanbanboardTaskCard key={task.taskId} {...task} />
            })}
        </div>
    )
}

export default SprintBacklog
