require('dotenv').config()
const request = require('superagent')
const cheerio = require('cheerio')
const {M_Video} = require('../mongodb/models')

const target_host = "https://javynow.com"
const page_index = []
const page_paly = []

const start = async ()=>{
    const result_index = await request.get(target_host).set('Accept','text/html')
    console.log(result_index.text)
    const $_index = cheerio.load(result_index.text)
    const links = $_index('a','figure')
    links.map((index,a)=>{
        page_index.push({
            title: a.parent.next.next.children[0].children[0].data,
            page_play_path : target_host+a.attribs.href.replace('video','player'),
            video_img_path: a.children[0].attribs.src
        })
    })
    console.log(page_index)
    const res_insert = M_Video.insertMany()
    const result_play = await request
                            .get(page_index[0].page_play_path)
                            .set('Accept','text/html')
    console.log(result_play.text)
}

start()
