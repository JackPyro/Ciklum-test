const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const striptags = require('striptags')
const _ = require('lodash')

const Article = require('../models/article')

let router = express.Router()

router.get('/parse', async function (req, res, next) {
  const {url} = req.query

  const html = await axios.get(url).then(res => res.data)

  const $ = cheerio.load(html)

  const title = $('.headline').html()

  const paragraphs = []

  $('.body-copy.lab-bodytext-content > p, .body-copy.lab-bodytext-content > h2').each(function () {
    paragraphs.push(striptags($(this).html()))
  })

  res.json({
    title,
    paragraphs
  })
})

router.post('/', async function (req, res, next) {
  const body = req.body

  const article = new Article({
    url: body.url,
    originalText: body.originalText,
    userText: body.userText
  })

  article.save()
    .then(article => {
      res.json(article)
    })
    .catch(next)
})

router.get('/', async function (req, res, next) {
  Article.find()
    .then(ret => {
      let articles = _.groupBy(ret, 'originalText')

      let articlesRes = []

      articles = _.forEach(articles, (suggestions, originalText) => {
        articlesRes.push({
          originalText: originalText,
          url: _.get(_.sample(suggestions), 'url'),
          suggestions: suggestions
        })
      })

      if (req.query.showApproved === 'true') {
        articlesRes = _.filter(articlesRes, article => {
          return _.filter(article.suggestions, {isApproved: true}).length > 0
        })
      }

      res.json(articlesRes)
    })
    .catch(next)
})

router.put('/:id/approved', async function (req, res, next) {
  Article.findById(req.params.id)
    .then(async article => {
      if (!article.isApproved) {
        await Article.update({
          isApproved: true,
          originalText: article.originalText
        }, {
          isApproved: false
        }, {
          multi: true
        })
      }

      article.isApproved = !article.isApproved

      await article.save()

      res.json(article)
    })
    .catch(next)
})

router.post('/delete', function (req, res, next) {
  if (!_.isString(req.body.originalText)) throw new Error('Bad request.')

  Article.deleteMany({
    originalText: req.body.originalText
  })
    .then(() => {
      res.send()
    })
    .catch(next)
})

module.exports = router
