var rule = {
  title: '',
  host: '',
  class_name: '电影&电视剧&综艺&动漫',
  class_url: '1&2&3&4',
  searchUrl: '/index.php/ajax/suggest?mid=1&wd=**&limit=50',
  searchable: 2,
  quickSearch: 0,
  headers: {
    'User-Agent': 'MOBILE_UA',
  },
  url: '/index.php/api/vod#type=fyclass&page=fypage',
  filterable: 0,
  filter_url: '',
  filter: {},
  filter_def: {},
  detailUrl: '/index.php/vod/detail/id/fyid.html',
  play_parse: true,
  lazy: "js:\n  let html = request(input);\n  let hconf = html.match(/r player_.*?=(.*?)</)[1];\n  let json = JSON5.parse(hconf);\n  let url = json.url;\n  if (json.encrypt == '1') {\n    url = unescape(url);\n  } else if (json.encrypt == '2') {\n    url = unescape(base64Decode(url));\n  }\n  if (/\\.(m3u8|mp4|m4a|mp3)/.test(url)) {\n    input = {\n      parse: 0,\n      jx: 0,\n      url: url,\n    };\n  } else {\n    input;\n  }",
  limit: 6,
  推荐: '.list-vod.flex .public-list-box;a&&title;.lazy&&data-original;.public-list-prb&&Text;a&&href',
  一级: 'js:let body=input.split("#")[1];let t=Math.round(new Date/1e3).toString();let key=md5("DS"+t+"DCC147D11943AF75");let url=input.split("#")[0];body=body+"&time="+t+"&key="+key;print(body);fetch_params.body=body;let html=post(url,fetch_params);let data=JSON.parse(html);VODS=data.list.map(function(it){it.vod_pic=urljoin2(input.split("/i")[0],it.vod_pic);return it});',
  二级: {
    title: '.slide-info-title&&Text;.slide-info:eq(2)--strong&&Text',
    img: '.detail-pic&&data-original',
    desc: '.slide-info-remarks&&Text;.slide-info-remarks:eq(1)&&Text;.slide-info-remarks:eq(2)&&Text;.slide-info:eq(1)--strong&&Text;.info-parameter&&ul&&li:eq(3)&&Text',
    content: '#height_limit&&Text',
    tabs: '.anthology.wow.fadeInUp.animated&&.swiper-wrapper&&a',
    tab_text: 'a--span&&Text',
    lists: '.anthology-list-box:eq(#id) li',
  },
  搜索: 'json:list;name;pic;;id',
}