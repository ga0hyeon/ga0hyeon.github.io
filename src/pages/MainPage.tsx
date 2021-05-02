import React from 'react'
import Kanbanboard from '../components/Kanbanboard'
import SideDrawer, { Drawer } from '../components/SideDrawer'
import SprintBacklog from '../components/SprintBacklog'
import SprintHistory from '../components/SprintHistory'
import './MainPage.scss'

const MainPage: React.FC = () => {
    const drawerList: Drawer[] = [
        {
            drawerTitle: 'Sprint History',
            drawerContent: <SprintHistory />,
            drawerColor: 'rgb(241, 196, 15)',
        },
        {
            drawerTitle: 'Backlog',
            drawerContent: <SprintBacklog />,
            drawerColor: 'rgb(64, 64, 64)',
        },
    ]
    return (
        <div id="MainPage">
            <SideDrawer drawerList={drawerList} />
            <Kanbanboard />
        </div>
    )
}

export default MainPage
