import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.scss'
import HierarchicalSideIndexMenu, {
    MenuNode,
} from './components/HierarchicalSideIndexMenu'
import profile from './resource/image/profile.png'

function App() {
    const root: MenuNode[] = [
        {
            title: 'my sprint',
            sub: [
                {
                    title: '- overview',
                    linkTo: '/sprint/overview',
                },
                {
                    title: '- dashboard',
                    linkTo: '/sprint/dashboard',
                },
                {
                    title: '- daliy check',
                    linkTo: '/sprint/daliy',
                },
            ],
        },
        {
            title: 'my component',
            sub: [
                {
                    title: '- kanban',
                    linkTo: '/component/kanban',
                },
                {
                    title: '- datagrid',
                    linkTo: '/component/datagrid',
                },
            ],
        },
        {
            title: 'my career',
            sub: [
                {
                    title: '- resume',
                    linkTo: '/career/resume',
                },
            ],
        },
    ]
    const ttttt = () => {
        return (
            <div>
                asd;lfkjasdl;kfja;sldkfja;lskdfj;asldkfja;lsdkfja;sldkfja;sldkfj;alkdjs
            </div>
        )
    }

    const profileHeader = (): JSX.Element => {
        return (
            <>
                <img src={profile} alt="profile" />
                <div className="desc">Gayoung Hyeon</div>
            </>
        )
    }
    return (
        <div className="App">
            <BrowserRouter>
                <HierarchicalSideIndexMenu
                    indexTreeRoot={root}
                    header={profileHeader}
                />
                <div id="content">
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/sprint" />
                        </Route>
                        <Route exact path="/sprint">
                            <Redirect to="/sprint/overview" />
                        </Route>
                        <Route path="/sprint/overview" component={ttttt} />
                        <Route path="/sprint/dashboard" component={ttttt} />
                        <Route path="/sprint/daliy" component={ttttt} />
                        <Route exact path="/component">
                            <Redirect to="/component/kanban" />
                        </Route>
                        <Route path="/component/kanban" component={ttttt} />
                        <Route path="/component/dashboard" component={ttttt} />
                        <Route exact path="/career">
                            <Redirect to="/career/resume" />
                        </Route>
                        <Route path="/career/resume" component={ttttt} />
                        {/* Not Found */}
                        <Route>
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App
