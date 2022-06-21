import {useHistory} from "react-router";

export function Sidebar(props) {
    const history = useHistory();
    return <nav className="menu__body">
        <ul className="menu__list">
            <li onClick={() => window.location.href = "/"}
                className={`menu__item ${props.active === 0 ? "menu__item_active" : ''}`}>
                <span

                    className="menu__link _icon-nav-top"
                >
                    首页
                </span>
            </li>
            <li onClick={() => window.location.href = "/articleCreate"} className={`menu__item ${props.active === 1 ? "menu__item_active" : ''}`}><span
                className="menu__link _icon-nav-world">新建文章</span>
            </li>
            <li onClick={() => window.location.href = "/myArticle"} className={`menu__item ${props.active === 2 ? "menu__item_active" : ''}`}><span
                className="menu__link _icon-nav-business">我的文章</span>
            </li>
            {/*<li className="menu__item"><a href=""*/}
            {/*                              className="menu__link _icon-nav-health">Health</a>*/}
            {/*</li>*/}
        </ul>
        {/*<ul className="menu__list menu__list_border">*/}
        {/*    <li className="menu__item"><a href="" className="menu__link _icon-nav-covid">Covid*/}
        {/*        19</a></li>*/}
        {/*</ul>*/}
        {/*<ul className="menu__list">*/}
        {/*    <li className="menu__item"><a href=""*/}
        {/*                                  className="menu__link _icon-nav-play">Entertainment</a>*/}
        {/*    </li>*/}
        {/*    <li className="menu__item"><a href=""*/}
        {/*                                  className="menu__link _icon-nav-sports">Sports</a>*/}
        {/*    </li>*/}
        {/*    <li className="menu__item"><a href=""*/}
        {/*                                  className="menu__link _icon-nav-disc">Discussion</a>*/}
        {/*    </li>*/}
        {/*    <li className="menu__item"><a href=""*/}
        {/*                                  className="menu__link _icon-nav-notifi">Notification</a>*/}
        {/*    </li>*/}
        {/*    <li className="menu__item"><a href="" className="menu__link _icon-nav-settings">News*/}
        {/*        Feed Settings</a></li>*/}
        {/*</ul>*/}
    </nav>
}
