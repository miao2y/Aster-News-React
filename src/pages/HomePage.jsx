import React, {useEffect, useState} from "react";
import axios from "axios";
import {message} from "antd";
import {defaultArticleList} from "./defaultValue";
import {ContactUsCard} from "../components/ContactUsCard";
import {Sidebar} from "../components/Sidebar";
import {useHistory, useLocation} from "react-router";
import {ArticleCard} from "../components/ArticleCard";
import {HeaderLogo} from "../components/HeaderLogo";
import {Footer} from "../components/Footer";

/**
 * 首页
 * @returns {JSX.Element}
 * @constructor
 */
export function HomePage() {
    const [keyword, setKeyword] = useState();
    // 为文章设置默认值,默认值为假数据
    const [data, setData] = useState(defaultArticleList);
    const [tags, setTags] = useState([
        "All",
        "Android",
        "Cricket",
        "iPhone",
        "Google",
        "Technology",
        "Mental Health"
    ])

    // 当前选中的 Tag
    const [tag, setTag] = useState("All")
    const history = useHistory();
    useEffect(() => {
        /**
         * 查询文章列表接口
         * todo: 对接接口
         * 参数:
         * {
         *     tag: string; // 根据文章的标签查询
         *     keyword: keyword // 根据关键字查询
         * }
         *
         * 返回:
         * 参考 defaultArticleList
         */
        axios.post("http://CHANGE_THIS.com", {
            tag: tag,
            keyword: keyword
        }).then(r => {
            setData(r.data);
        }).catch(e => {
            message.error("查询文章列表接口网络错误: " + e.message);
        })
    }, [tag, keyword])

    return <div className="wrapper" style={{backgroundColor: "#f4f9f8"}}>
        <header className="header">
            <div className="header__container">
                <HeaderLogo/>
                <div className="header__body body-header">
                    <form className="body-header__search search">
                        <div className="search__body">
                            <input autoComplete="off" value={keyword} onChange={(e) => setKeyword(e.target.value)}
                                   type="text" name="form[]" data-error="Ошибка"
                                   placeholder="搜索文章..." className="search__input input"/>
                            <button type="submit" className="search__button _icon-search"></button>
                            <button type="button" className="search__icon _icon-search"></button>
                        </div>
                    </form>
                </div>
                <div className="header__user user-header">
                    <div className="user-header__title">
                        <a className="user-header__profile _icon-user" href=""><span>My Profile</span></a>
                        <button className="user-header__arrow _icon-user-arrow" type="button"></button>
                    </div>
                </div>
                <button type="button" className="menu__icon icon-menu"><span></span></button>
            </div>
        </header>
        <main className="page">
            <div className="page__container">
                <aside data-sticky data-sticky-top="20" className="page__left-side left-side">
                    <div data-sticky-item className="left-side__content">
                        <div data-da=".header__container,992" className="left-side__menu menu">
                            <Sidebar active={0}/>
                        </div>
                    </div>
                </aside>
                <aside className="page__main">
                    <div className="home">
                        <section className="home__stories stories-module">
                            <h1 className="stories-module__title">为你推荐</h1>
                            <div className="stories-module__filter filter">
                                {tags.map(i => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setTag(i)
                                            }}
                                            type="button"
                                            className={`filter__item ${(tag === i) ? 'filter__item_active' : ''}`}
                                        >{i}</button>
                                    )
                                )}
                            </div>
                            <div className="stories-module__items">
                                {data.map((i) => <ArticleCard article={i}/>)}
                            </div>
                        </section>
                    </div>
                </aside>
                <aside className="page__right-side right-side">
                    <ContactUsCard/>
                </aside>
            </div>
        </main>
        <footer className="footer">
            <Footer/>
        </footer>
    </div>
}
