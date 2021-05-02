import React, { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import './App.scss'

import MainPage from './pages/MainPage'

const App: React.FC = () => {
    useEffect(() => {
        window.onbeforeunload = () => {
            console.log('HEOLL')
            return true
        }
    }, [])
    return (
        <RecoilRoot>
            <div className="App">
                <MainPage />
            </div>
        </RecoilRoot>
    )
}

export default App
