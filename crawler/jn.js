require('dotenv').config()
const request = require('superagent')
const cheerio = require('cheerio')
const {M_Video} = require('../mongodb/models')

const target_host = "https://javynow.com"

const fetchIndex = async (url)=>{
    const result_index = await request.get(url).set('Accept','text/html')
    console.log(result_index.text)
    const $_index = cheerio.load(result_index.text)
    const links = $_index('a','figure')
    const page_index = []
    links.map((index,a)=>{
        page_index.push({
            title: a.parent.next.next.children[0].children[0].data,
            ref_video_path: target_host+a.attribs.href.replace('video','player'),
            ref_img_path: a.children[0].attribs.src
        })
    })
    console.log(page_index)
    const res_insert = await M_Video.insertMany(page_index)
    return page_index.length
}

const start = async ()=>{
    let count =0;
    let from = 1,
        to = 50
    for(;from<=to;from++) {
        console.log(from)
        const num = await fetchIndex(`${target_host}/?p=${from}`)
        count = count + num
        console.log(`已趴取:--${count}--条数据`)
    }
}

start()
