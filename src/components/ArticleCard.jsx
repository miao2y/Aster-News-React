export function ArticleCard(props) {
    const article = props.article;
    return <article key={article.id}
                    onClick={props.onClick}
                    className="stories-module__item item item_big">
        <div className="item__body">
            <h4 className="item__title">
                <a href={`/article/${article.id}`} className="item__link-title">{article.title}</a>
            </h4>
            <p className="item__text">{article.summary}</p>
        </div>
        <a href="#" className="item__image-ibg">
            <picture>
                <source srcSet={article.thumbUrl} type="image/webp"/>
                <img src={article.thumbUrl} alt="Samsung Galaxy"/>
            </picture>
        </a>
        <div className="item__footer">
            <div className="item__info info-item">
                <a href="" className="info-item__categoty">{article.author}</a>
                <div className="info-item__time">{article.time}</div>
            </div>
        </div>
    </article>
}
