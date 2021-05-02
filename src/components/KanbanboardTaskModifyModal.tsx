import React, { useState } from 'react'
import { Task } from '../data'
import './KanbanboardTaskModifyModal.scss'

export interface KanbanboardTaskModifyModalI {
    task: Task
    show: boolean
    onHide: () => void
    onSave: (newTask: Task) => void
}

const KanbanboardTaskModifyModal: React.FC<KanbanboardTaskModifyModalI> = (
    props: KanbanboardTaskModifyModalI
) => {
    const [modifiedtask, setModifiedTask] = useState<Task>(props.task)
    const handleBackgroundClick = () => {
        props.onHide()
    }

    const handleModalBodyClick = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleInputChange = (e: any) => {
        if (e.target.id === 'taskTitleInput') {
            setModifiedTask({ ...modifiedtask, taskTitle: e.target.value })
        } else if (e.target.id === 'taskDescInput') {
            setModifiedTask({ ...modifiedtask, taskDesc: e.target.value })
        }
    }

    const handleSaveButtonClick = (e: any) => {
        props.onSave(modifiedtask)
        props.onHide()
    }

    const handleCloseButtonClick = (e: any) => {
        props.onHide()
    }

    return (
        <>
            {props.show && (
                <div id="KanbanboardTaskModifyModal">
                    <div
                        className="modal-background"
                        onClick={handleBackgroundClick}
                    >
                        <div
                            className="modal-body"
                            onClick={handleModalBodyClick}
                        >
                            <form>
                                <input
                                    id="taskTitleInput"
                                    value={modifiedtask.taskTitle}
                                    onChange={handleInputChange}
                                />
                                <textarea
                                    id="taskDescInput"
                                    value={modifiedtask.taskDesc}
                                    onChange={handleInputChange}
                                />
                                <button
                                    className="close-btn"
                                    onClick={handleCloseButtonClick}
                                >
                                    닫기
                                </button>
                                <button
                                    className="save-btn"
                                    onClick={handleSaveButtonClick}
                                >
                                    저장
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default KanbanboardTaskModifyModal
