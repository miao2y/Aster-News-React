import {ContactUsCard} from "../components/ContactUsCard";
import {Sidebar} from "../components/Sidebar";
import {useHistory, useLocation, useParams} from "react-router";
import {useEffect, useState} from "react";
import {defaultArticle, defaultArticleList} from "./defaultValue";
import axios from "axios";
import {message} from "antd";
import {ArticleCard} from "../components/ArticleCard";
import {HeaderLogo} from "../components/HeaderLogo";
import {Footer} from "../components/Footer";

export function ArticlePage() {
    const [data, setData] = useState(defaultArticle);
    const [suggestArticles, setSuggestArticles] = useState(defaultArticleList);
    const params = useParams();
    useEffect(() => {
        /**
         *  根据文章 ID, 查询文章详情
         *  todo: 对接接口
         * 参数:
         * {
         *   id: number// 文章 id
         * }
         *
         * 返回:
         * 参考 defaultArticle
         */
        axios.post("http://CHANGE_THIS.com", {
            id: Number(params.id)
        }).then(r => {
            setData(r.data);
        }).catch(e => {
            message.error("查询文章详情网络错误: " + e.message);
        })

        /**
         * 根据文章 ID, 列出相似文章
         * todo: 对接接口
         *
         * 参数:
         * {
         *   id: number// 文章 id
         * }
         *
         * 返回:
         * 参考 defaultArticleList
         */
        axios.post("http://CHANGE_THIS.com", {
            id: Number(params.id)
        }).then(r => {
            setSuggestArticles(r.data);
        }).catch(e => {
            message.error("列出相似文章网络错误: " + e.message);
        })
    }, [params])

    return <div className="wrapper">
        <header className="header">
            <div className="header__container">
                <HeaderLogo/>
                <div className="header__body body-header"></div>
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
                    <div className="news-page">
                        <section className="news-page__body body-news">
                            <h1 className="body-news__title">{data.title}</h1>
                            <div className="body-news__categories news-categories">
                                {data.tags.map(i => <span href="" className="news-categories__item">{i}</span>)}
                            </div>
                            <div className="body-news__text">
                                <p>{data.summary}</p>
                                <picture>
                                    <img
                                        src={data.thumbUrl} alt="phone"/>
                                </picture>
                                <p>
                                    {data.content}
                                </p>
                            </div>
                            <div className="body-news__info info-news">
                                <div className="info-news__publish">发布于 {data.time}</div>
                                <a href="" className="info-news__author">作者:{data.author}</a>
                            </div>
                        </section>
                        <section className="news-page__news news-module">
                            <h2 className="news-module__title">更多推荐</h2>
                            <div className="news-module__items">
                                {suggestArticles.map(i => <ArticleCard key={i.id} article={i}/>)}
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
