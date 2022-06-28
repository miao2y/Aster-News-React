import {ContactUsCard} from "../components/ContactUsCard";
import {Sidebar} from "../components/Sidebar";
import {useEffect, useState} from "react";
import {Button, Form, Image, Input, message} from "antd";
import Dragger from "antd/lib/upload/Dragger";
import {InboxOutlined} from '@ant-design/icons';
import axios from "axios";
import {HeaderLogo} from "../components/HeaderLogo";
import {Footer} from "../components/Footer";

export function ArticleCreatePage() {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [summary, setSummary] = useState();
    const [tags, setTags] = useState([]);
    const [fileList, setFileList] = useState([]);

    /**
     *   根据文章的标题和正文内容,自动获得摘要
     *   todo: 对接接口
     *
     *   参数:
     *   {
     *       title: string,
     *       content: string,
     *   }
     *
     *   返回:
     *   {
     *       summary: string
     *   }
     */
    function calculateSummary() {
        axios.post("http://192.168.50.31:8000/articles/calculateSummary", {
            title: title,
            content: content
        }).then(r => {
            setSummary(r.data.summary);
        }).catch(e => {
            message.error("自动获得摘要网络错误: " + e.message);
        })
    }

    /**
     *   根据文章的标题和正文内容,自动生成文章标签
     *   todo: 对接接口
     *
     *   参数:
     *   {
     *       title: string,
     *       content: string,
     *   }
     *
     *   返回:
     *   [
     *      "Android","iOS","Swift"
     *   ]
     */
    function calculateTags() {
        axios.post("http://192.168.50.31:8000/articles/calculateTags", {
            title: title,
            content: content
        }).then(r => {
            setTags(r.data);
        }).catch(e => {
            message.error("自动生成文章标签网络错误: " + e.message);
        })
    }

    /**
     *   保存文章接口
     *   todo: 对接接口
     *
     *   参数:
     *   {
     *      title: string,// 标题
     *      content: string,// 正文
     *      url: string,//封面图片 URL
     *      summary: string,// 自动生成的概要
     *      tags: string 数组 // 自动生成的标签
     *   }
     *
     *   返回:
     *   [
     *      "Android","iOS","Swift"
     *   ]
     */
    function Submit() {
        axios.post("http://192.168.50.31:8000/articles/create", {
            title: title,
            content: content,
            url: fileList.length > 0 ? fileList[0].url : undefined,
            summary: summary,
            tags: tags
        }).then(r => {
            message.success("新建文章成功")
        }).catch(e => {
            message.error("保存文章接口网络错误: " + e.message);
        })
    }

    return <div className="wrapper">
        <header className="header">
            <div className="header__container">
                <HeaderLogo/>
                <div className="header__body body-header">
                    <form className="body-header__search search">

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
                            <Sidebar active={1}/>
                        </div>
                    </div>
                </aside>
                <aside className="page__main">
                    <h1 className="stories-module__title">撰写新文章</h1>
                    <div className="news-page">
                        <Form layout={"vertical"}>
                            <Form.Item label={"文章标题"}>
                                <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
                                    <Dragger
                                        style={{flex: 1, width: 500}}
                                        name="file"
                                        multiple={false}
                                        action={`http://192.168.50.31:8000/articles/fileUpload`}
                                        onChange={info => {
                                            const {status} = info.file;
                                            if (status !== 'uploading') {
                                                console.log(info.file, info.fileList);
                                            }
                                            if (status === 'done') {
                                                message.success(`${info.file.name} 上传成功`);
                                            } else if (status === 'error') {
                                                message.error(`${info.file.name} 上传失败`);
                                            }
                                            let fileList = [...info.fileList];

                                            // 1. Limit the number of uploaded files
                                            // Only to show two recent uploaded files, and old ones will be replaced by the new
                                            fileList = fileList.slice(-1);

                                            // 2. Read from response and show file link
                                            fileList = fileList.map(file => {
                                                if (file.response) {
                                                    // Component will show file.url as link
                                                    file.url = file.response.url;
                                                }
                                                return file;
                                            });

                                            setFileList(fileList.concat([]));
                                        }}
                                        beforeUpload={file => {
                                            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                                                return true;
                                            } else {
                                                message.error('请上传 jpeg/png 格式的照片');
                                                return false;
                                            }
                                        }}
                                        fileList={fileList}>
                                        <div>
                                            <p className="ant-upload-drag-icon">
                                                <InboxOutlined/>
                                            </p>
                                            <p className="ant-upload-text">点击或者拖拽上传</p>
                                            <p className="ant-upload-hint">请上传 png / jpeg 格式的地图文件</p>
                                        </div>
                                    </Dragger>
                                    {fileList.map(i => <Image style={{width: 300}} key={i.url} src={i.url}/>)}
                                </div>

                            </Form.Item>
                            <Form.Item label={"文章标题"}>
                                <Input value={title} onChange={(e) => setTitle(e.target.value)}
                                       placeholder={"请输入文章标题"}/>
                            </Form.Item>
                            <Form.Item label={"正文内容"}>
                                <Input.TextArea autoSize={{minRows: 12}} value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                showCount={true} size={"large"} placeholder={"请输入正文内容"}/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" size="large" onClick={() => {
                                    Submit()
                                }}>提交</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </aside>
                <aside className="page__right-side right-side">
                    <ContactUsCard/>
                    <section className="right-side__module story-writer-module">
                        <h4 className="story-writer-module__title">自动生成摘要 <Button type={"link"} onClick={() => {
                            calculateSummary()
                        }}>点击生成</Button></h4>
                        <div className="story-writer-module__text">
                            <p>{summary ?? '无摘要'}</p>
                        </div>
                    </section>
                    <section className="right-side__module story-writer-module">
                        <h4 className="story-writer-module__title">自动生成标签 <Button type={"link"}
                                                                                  onClick={() => calculateTags()}>点击生成</Button>
                        </h4>
                        <div className="story-writer-module__text">
                            <div className="body-news__categories news-categories">
                                {tags.length === 0 && '无标签'}
                                {tags.map(i => <span href="" className="news-categories__item">{i}</span>)}
                            </div>
                        </div>
                    </section>
                </aside>
            </div>
        </main>
        <footer className="footer">
            <Footer/>
        </footer>
    </div>
}
