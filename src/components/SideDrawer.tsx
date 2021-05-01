import React, { ReactElement, useState } from 'react'
import './SideDrawer.scss'

export interface Drawer {
    drawerTitle: string
    drawerContent: ReactElement
    drawerColor: string
}

export interface SideDrawerI {
    drawerList: Drawer[]
}

const SideDrawer: React.FC<SideDrawerI> = (props: SideDrawerI) => {
    const [activeDrawerIndex, setActiveDrawerInder] = useState<number>(0)

    const handleDrawerHandleClick = (index: number) => {
        setActiveDrawerInder(index)
    }
    return (
        <div id="SideDrawer">
            <div
                className="content-wrapper"
                style={{
                    backgroundColor:
                        props.drawerList[activeDrawerIndex].drawerColor,
                }}
            >
                {props.drawerList[activeDrawerIndex].drawerContent}
            </div>

            <div className="handle-wrapper">
                {props.drawerList.map((drawer, index) => {
                    return (
                        <div
                            key={drawer.drawerTitle}
                            className={
                                activeDrawerIndex === index
                                    ? 'active handle'
                                    : 'handle'
                            }
                            onClick={() => {
                                handleDrawerHandleClick(index)
                            }}
                            style={{ backgroundColor: drawer.drawerColor }}
                        >
                            {drawer.drawerTitle}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SideDrawer
