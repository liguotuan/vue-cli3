let _cheerio = require('cheerio')
let path = require('path')
let fs = require('fs')


const url = 'https://www.cnblogs.com/desLZW/p/11655420.html';
const baseUrl = init(url).baseUrl; // 网站域名
const baseType = init(url).type; // 网站类型

// let picUrlArr = [];
baseType.get(url, res => {
    console.log('----res----', res.statusCode);
    if(res.statusCode != 200) {
        return;
    }
    res.on('data', data => {
        const originData = _cheerio.load(data)
        originData('img').each(function () {
            let middle = originData(this).attr('src')
            if(/https*/.test(middle)) {
                downLoad(middle)
                // picUrlArr.push(middle)
            }else {
                // picUrlArr.push(`${baseUrl}${middle}`)
            }
        })
    });
})

function downLoad(url) {
    fs.createWriteStream(url)
}

function init(webUrl) {
    const _patten = /https*:\/\/?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}/; // 匹配域名正则
    const _patten_type = /https/
    return {
        baseUrl: _patten.exec(webUrl)[0],
        type: _patten_type.test(webUrl) ? require('https') : require('http')
    };
}

