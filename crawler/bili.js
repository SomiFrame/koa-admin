require('dotenv').config()
const request = require('superagent')
const cheerio = require('cheerio')
const {M_Video} = require('../mongodb/models')
const phantom = require('phantom')

const target_host = "https://www.bilibili.com"
const target_path = "/v/anime/serial/"
const fetchIndex = async (url)=>{
    console.log('target_url is',url)
    const result_index = await request.get(url).set('Accept','text/html')
    console.log(result_index.text)
    return
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
    //const res_insert = await M_Video.insertMany(page_index)
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

(async function(url){
    const instance = await phantom.create();
    const page = await instance.createPage();
    const status = await page.open(url);
    const content = await page.property('content');
    const list =await page.evaluate(function(){
        var result = [];
        var list = $('.spread-module');
        list.map(function(index,val){
            result.push({
                title: $(val).find('p.t').attr('title'),
                ref_video_path: $(val).find('>a').attr('href'),
                ref_img_path: $(val).find('>a').attr('href')
            })
        })
        return result
    })
    console.log(list)
    const res_insert = await M_Video.insertMany(list)
    //console.log(content)
})(`${target_host}${target_path}`)
//start()
//fetchIndex(`${target_host}${target_path}`)
