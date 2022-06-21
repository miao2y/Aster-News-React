import './App.css';
import {HomePage} from "./pages/HomePage";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {ArticlePage} from "./pages/ArticlePage";
import {ArticleCreatePage} from "./pages/ArticleCreatePage";
import {MyArticlePage} from "./pages/MyArticlePage";


function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path={'/article/:id'} component={ArticlePage}/>
                    <Route path={'/myArticle'} component={MyArticlePage}/>
                    <Route path={'/articleCreate'} component={ArticleCreatePage}/>
                    <Route path={'/'} component={HomePage}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
