var cheerio = require('cheerio'),
    request = require('request');

request('https://www.abc.net.au', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);

    var linkHrefs = $('link').map(function(i) {
        // return $(this).attr('href');
        request($(this).attr('href'), function (err, res, body) {
            console.log("res ::: ", res)
        });
    }).get();
    var scriptSrcs = $('script').map(function(i) {
      return $(this).attr('src');
    }).get();


    console.log("links:");
    console.log(linkHrefs);
    console.log("scripts:");
    console.log(scriptSrcs);
  }
});