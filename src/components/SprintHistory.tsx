import React from 'react'
import { useRecoilValue } from 'recoil'
import { sprintHistoryState } from '../data'
import SprintSummaryCard from './SprintSummaryCard'
import './SprintHistory.scss'
const SprintHistory: React.FC = () => {
    const sprintHistory = useRecoilValue(sprintHistoryState)
    return (
        <div id="SprintHistory">
            {sprintHistory.map((sprint, index) => {
                return (
                    <div key={`SprintHistory-${index}`}>
                        <SprintSummaryCard {...sprint} />
                    </div>
                )
            })}
        </div>
    )
}

export default SprintHistory
