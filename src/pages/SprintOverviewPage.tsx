import React, { useEffect, useRef } from 'react'
import './SprintOverviewPage.scss'
import dragon from '../resource/image/dragon.svg'
import robot from '../resource/image/robot.svg'
export const SprintOverviewPage: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const dragonRef = useRef<HTMLImageElement>(null)
    const robotRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current

        if (canvas) {
            const context = canvas.getContext('2d')
            const dragon = dragonRef.current
            const robot = robotRef.current
            if (context && dragon && robot) {
                const draw = (event: MouseEvent) => {
                    context.beginPath()
                    context.fillStyle = 'red'

                    context.arc(0, 0, 20, 0, Math.PI * 2, true)
                    context.closePath()
                    context.fill()
                }
                canvas.addEventListener('mousemove', draw)
            }
        }
    }, [])

    return (
        <div id="SprintOverViewPage">
            <div className="title">스프린트제목</div>
            <canvas ref={canvasRef} width="500" height="400" />
            <img
                ref={dragonRef}
                id="dragon"
                width="150"
                src={dragon}
                alt="dragon"
            />
            <img
                ref={robotRef}
                id="robot"
                width="150"
                src={robot}
                alt="robot"
            />
            <div className="postit">우야야아아아아아아</div>
        </div>
    )
}
