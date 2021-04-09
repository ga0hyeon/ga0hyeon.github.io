import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import './HierarchicalSideIndexMenu.scss'

export interface HierarchicalSideIndexMenuProps {
    indexTreeRoot: MenuNode[]
}

export interface MenuNode {
    title: string
    linkTo?: string //link to route when clicked
    component?: RouteComponentProps
    hidden?: boolean
    sub?: MenuNode[]
}

function HierarchicalSideIndexMenu(props: HierarchicalSideIndexMenuProps) {
    const createMenu = (root: MenuNode[]) => {
        return (
            <>
                {root.map((node) => {
                    return (
                        <div key={node.title}>
                            <label>
                                {node.linkTo ? (
                                    <Link to={node.linkTo}>{node.title}</Link>
                                ) : (
                                    node.title
                                )}
                            </label>
                            {node.sub &&
                                node.sub.length > 0 &&
                                createMenu(node.sub)}
                        </div>
                    )
                })}
            </>
        )
    }

    return (
        <div id="HierarchicalSideIndexMenu">
            {createMenu(props.indexTreeRoot)}
        </div>
    )
}
export default HierarchicalSideIndexMenu
