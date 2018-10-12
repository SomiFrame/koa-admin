const request = require('superagent')
const cheerio = require('cheerio')

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
            page_play_path : target_host+a.attribs.href,
            video_img_path: a.children[0].attribs.src
        })
    })
    console.log(page_index,page_index[0])
    const result_play = await request
                            .get(page_index[0].page_play_path)
                            .set('Accept','text/html')
    console.log(result_play.text)

}

start()
