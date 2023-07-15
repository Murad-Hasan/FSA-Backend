require('dotenv').config()
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const OpenApiValidator = require('express-openapi-validator');
const swaggerDocument = YAML.load('./swagger.yaml');
// const conection = require('./db')
const articleService = require('./services/article')

//express app
const app = express()
app.use(express.json())
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use(
    OpenApiValidator.middleware({
        apiSpec: './swagger.yaml',
    }),
);
app.get('/health', (_req, res) => {
    res.status(200).json({
        health: 'OK'
    })
})
//  auth routes
app.post('/api/v1/auth/signin', (req, res) => {
    res.status(200).json({path: '/api/v1/auth/signin', method: 'post'})
})

app.post('/api/v1/auth/signup', (req, res) => {
    res.status(200).json({path: '/api/v1/auth/signup', method: 'post'})
})

// Get all articles
app.get('/api/v1/articles', async (req, res) => {
    //1.extract query params
    const page = +req.query.page;
    const limit = +req.query.limit; // + is used to convert string to number
    //2. call article service to fetch all articles
    let {
        totalItems,
        totalPage,
        hasNext,
        hasPrev,
        articles
    } = await articleService.findArticles({...req.query, page, limit})

    const response = {
        data: articleService.transformArticleList({articles}),
        pagination: {
            page,
            limit,
            totalItems,
            totalPage
        },
        links: {
            self: `/articles/?page=${page}&limit=${limit}`,
        }
    }

    if (hasPrev) {
        response.pagination.prev = page - 1
        response.links.prev = `/articles/?page=${page - 1}&limit=${limit}`
    }
    if (hasNext) {
        response.pagination.next = page + 1
        response.links.next = `/articles/?page=${page + 1}&limit=${limit}`
    }
// 3. genarate neccesary response
    res.status(200).json({response})
})

// create article
app.post('/api/v1/articles', (req, res) => {
    res.status(200).json({path: '/api/v1/articless', method: 'post'})
})
app.get('/api/v1/articles/:id', (req, res) => {
    res.status(200).json({path: '/api/v1/articless/:id', method: 'get'})
})
app.post('/api/v1/articles/:id', (req, res) => {
    res.status(200).json({path: '/api/v1/articles/:id', method: 'post'})
})
app.put('/api/v1/articles/:id', (req, res) => {
    res.status(200).json({path: '/api/v1/articles/:id', method: 'put'})
})
app.patch('/api/v1/articles/:id', (req, res) => {
    res.status(200).json({path: '/api/v1/articles/:id', method: 'patch'})
})
app.delete('/api/v1/articles/:id', (req, res) => {
    res.status(200).json({path: '/api/v1/articles/:id', method: 'delete'})
})
app.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});
app.listen(4000, () => {
    console.log('server is listening on port 4000')
})
