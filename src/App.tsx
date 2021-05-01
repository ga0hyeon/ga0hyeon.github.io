import React from 'react'
import { RecoilRoot } from 'recoil'
import './App.scss'

import MainPage from './pages/MainPage'

const App: React.FC = () => {
    return (
        <RecoilRoot>
            <div className="App">
                <MainPage />
            </div>
        </RecoilRoot>
    )
}

export default App
