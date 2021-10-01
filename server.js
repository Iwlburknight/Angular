// 引入express模块
// var express = require('express');

//下面这一段都是新加的
const express = require('express');
var path = require('path');
const app = express();

app.use('/', express.static(path.join(__dirname, 'dist/myDemo')));

//Any routes will be redirected to the angular app
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/myDemo/index.html'));
});

//上面都是新加的

// var app = new express();

// 让它可以跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    if (req.method == "OPTIONS") res.send(200);
    else next();
})


// 至此完成了所有API的调用，但是基本上每个都需要处理error抛出

// 自动填充
//这里其实前端和后端都部署到一个server上去了，所以用api的path给它分开来
app.get('/autoComplete', function(req,res) {

    let input = req.query.clue;
    console.log(input);
    let request = require('request');
    let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+input+'&types=(cities)&language=en&key=AIzaSyCJkBaVcbN1eO0XNlsOrwNpPXpSP9g8mVo';
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            res.json(body);
        }
    });
});


//这里是通过输入地址来得到 天气JSON和 州徽
app.get('/getJsonByForm', function(req,res) {

    let myLat = "";
    let myLng = "";
    let state = "";
    let city = "";
    let stateIdk = req.query.state;

    let input = req.query.address;
    city = req.query.city;
    let request = require('request');
    let url = 'https://maps.googleapis.com/maps/api/geocode/xml?address='+input+'&key=AIzaSyCfg4ixI2or_HZ-wFIAfn8B2p9NZRkTo68';

    //request是异步的，所以它里面的改变都是默认在最后才操作的，因此必须嵌套
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {

            let myXml = require('xml2js');
            let myParser = new myXml.Parser({explicitArray: false, ignoreAttrs: true});

            myParser.parseString(body, function (err, result) {
                //stringify 是将对象变成字符串，所以result本身就是对象了

                myLat = result.GeocodeResponse.result.geometry.location.lat;
                myLng = result.GeocodeResponse.result.geometry.location.lng;
                // state = result.GeocodeResponse.result.address_component[5].short_name;
            });
        }
        //至此拿到了 天气JSON 和 州徽， 但是所有的error判断都没有做
        let url = 'https://api.darksky.net/forecast/25eb92b7332c26b5109750d0707fab44/'+myLat+','+myLng;
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                let tempJson = body;
                // 这里先拿到州徽url，然后加到body里，形成一个新的JSON，再输出到前端

                // 如果先得到本地坐标的话，记得那个JSON里面有个region字段表示州名，可以先双向绑定再读取
                let url = 'https://www.googleapis.com/customsearch/v1?q='+stateIdk+'%20State%20Seal&cx=017770062252268785343:f2lcjerambp&num=1&searchType=image&key=AIzaSyCJkBaVcbN1eO0XNlsOrwNpPXpSP9g8mVo';

                request(url,function (error,resp,body) {
                    if (!error && resp.statusCode == 200) {
                        body = JSON.parse(body);
                        let link = body.items[0].link;

                        let myJson = {
                            "weatherJson": tempJson,
                            "url":link,
                            "city":city,
                            "state":stateIdk
                        }
                        res.json(myJson);
                    }
                });
            }
        });
    });

});


//这里是通过本地地址来得到 天气JSON和 州徽
app.get('/getJsonByLocal', function(req,res) {
    let myLat = req.query.lat;
    let myLng = req.query.lng;
    let state = req.query.state;
    let city = req.query.city;

    let requestLocal = require('request');
    let url = 'https://api.darksky.net/forecast/25eb92b7332c26b5109750d0707fab44/'+myLat+','+myLng;
    requestLocal(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            let tempJson = body;
            let url = 'https://www.googleapis.com/customsearch/v1?q='+state+'%20State%20Seal&cx=017770062252268785343:f2lcjerambp&num=1&searchType=image&key=AIzaSyCJkBaVcbN1eO0XNlsOrwNpPXpSP9g8mVo';
            requestLocal(url,function (error,resp,body) {
                if (!error && resp.statusCode == 200) {
                    body = JSON.parse(body);
                    let link = body.items[0].link;

                    let myJson = {
                        "weatherJson": tempJson,
                        "url":link,
                        "city":city,
                        "state":state
                    }
                    res.json(myJson);
                }
            });
        }
    });
});



//这里是根据日期来二次call得到 detail天气JSON
app.get('/getDetailJson', function(req,res) {
    let myLat = req.query.lat;
    let myLng = req.query.lng;
    let time = req.query.time;

    let requestDetail = require('request');
    let url = 'https://api.darksky.net/forecast/25eb92b7332c26b5109750d0707fab44/'+myLat+','+myLng+','+time;
    requestDetail(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body);
            body = JSON.parse(body);
            res.json(body);
        }
    });
});


// 端口从3000改到8081
app.listen(8080);
// app.listen(3000);
// console.log('running...')