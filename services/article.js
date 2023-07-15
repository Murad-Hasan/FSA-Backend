const Article = require('../models/Article')

const findArticles = async ({
                                page = 1,
                                limit = 5,
                                sortType = 'asc',
                                sortBy = 'updatedAt',
                                searchTerm = ''
                            }) => {
    const articleInstance = new Article();
    await articleInstance.init();
    let articles;

    //filter based on search term
    if (searchTerm) {
        articles = await articleInstance.search(searchTerm)
    } else {
        articles = await articleInstance.find()
    }
    //sorting [ is a mutable operation]
    articles = await articleInstance.sort(articles, sortType, sortBy);

    //pagination
    const {result, totalItems, totalPage, hasNext, hasPrev} = await articleInstance.pagination(articles, page, limit);

    return {
        totalItems,
        totalPage,
        hasNext,
        hasPrev,
        articles: result
    }
}

const transformArticleList = ({articles = []}) => {
    return articles.map(article => {
        const transformedArticle = {...article}
        transformedArticle.author = {
            id: transformedArticle.author_id,
            //TODO: get author name - call a service
        }
        transformedArticle.link = `/articles/${transformedArticle.id}`
        delete transformedArticle.body
        delete transformedArticle.author_id
        return transformedArticle
    })
}

module.exports = {findArticles, transformArticleList};
