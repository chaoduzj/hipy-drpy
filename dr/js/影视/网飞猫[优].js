var rule = {
    title: '网飞猫[优]',
    host: 'https://www.ncat21.com/',
    // url: '/show/fyclass-----2-fypage.html',
    url: '/show/fyclass-fyfilter-fypage.html',
    filter_url: '{{fl.类型}}-{{fl.地区}}-{{fl.语言}}-{{fl.年份}}-{{fl.排序}}',
    searchUrl: '/search?k=**&page=fypage',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    class_parse: '#nav-swiper&&.nav-swiper-slide;a&&Text;a&&href;/(\\w+).html',
    cate_exclude: 'Netflix|今日更新|专题列表|排行榜',
    tab_order: ['超清', '蓝光', '极速蓝光'],
    tab_remove:['4K(高峰不卡)'],
    play_parse: true,
    lazy: $js.toString(() => {
        let html = request(input);
        var TMDKKKK = "";
        var TMDPPPP = html.match(/window\.whatTMDwhatTMDPPPP\s*=\s*'([^']+)';/)[1];
        if (html.match(/window\.whatTMDwhatTMDKKKK\s*=\s*'([^']+)';/)) {
            TMDKKKK = html.match(/window\.whatTMDwhatTMDKKKK\s*=\s*'([^']+)';/)[1];

        } else {
            TMDKKKK = "FNF9aVQF!G*0ux@2hAigUeB3";
        };
        var url = safePlay(TMDPPPP, TMDKKKK)

        input = {
            url: url
        };
    }),	
    limit: 20,
    double: false,
    推荐: '*',
    一级: '.module-item;.v-item-title:eq(1)&&Text;img:last-of-type&&data-original;span&&Text;a&&href',
    二级: {
        title: '.detail-pic&&img&&alt;.detail-tags&&a&&Text',
        img: '.detail-pic&&img&&data-original',
        desc: '.detail-info-row-main:eq(-2)&&Text;.detail-tags&&a&&Text;.detail-tags&&a:eq(1)&&Text;.detail-info-row-main:eq(1)&&Text;.detail-info-row-main&&Text',
        content: '.detail-desc&&Text',
        //tabs: '.source-item-label:nth-of-type(2)',
        tabs: 'body&&.source-item-label',
        lists: '.episode-list:eq(#id)&&a',
    },
    搜索: '.search-result-list&&a;.title:eq(1)&&Text;*;.search-result-item-header&&Text;a&&href;.desc&&Text',
    图片替换: 'https://www.ncat21.com=>"https://vres.ozuab.cn',
    预处理: $js.toString(() => {
        let html = request(rule.host);
        let scripts = pdfa(html, 'script');
        let img_script = scripts.find(it => pdfh(it, 'script&&src').includes('rdul.js'));
        if (img_script) {
            let img_url = img_script.match(/src="(.*?)"/)[1];
            //console.log(img_url);
            let img_html = request(img_url);
            let img_host = img_html.match(/'(.*?)'/)[1];
            log(img_host);
            rule.图片替换 = 'https://www.ncat21.com=>' + img_host;
        }
    }),
    filter: 'H4sIAAAAAAAAA+2Zz08bRxTH/xefOdgGtTi3HlqpUpVLe6hURREHV4qa0kN/qFWEZLANxhBsEDFx7AIpGEyCf0CQY9bY/md2Ztf/RWf95r0ZR+3LtqGRqviC+LzvzOzs7Nt531k/isQid755FPku+VvkTsS76In9jchMZHHh+6TNvyw8/Dk5briowiJbH6XrQVhBZGkGoneTP3378MGvOnz3068+++Lzr0kV66cyndWiBtJKVRVBDYC0fN3tV1EDQM3LXZgxNaAml4syVdKaBtLSebnyDDUAGjPf8vovcEwA0k63xXUPNQAac+XcK23jmAB0D7U1008Daas7o/IZagA0Zu6p66zjmADUb2tVFC6xHwBphWP/iNYagLRmRzgN1ABQc28O/WZbaxpoLo0Td3CIcwEw2qaf2ydtDLRmBw1vfQ3XDMB6tt5uzzzbAEjLDL2XNdQAUPOXN0XV0ZqGpXuBCmksqm2x6Zg0Jg6TxuL4dFRexUXoNkSlr0PYYnRSlt3WRAsdMg+gLa8Hk2NAiJZlsKWCuCwAtJx7NVk9x+UEoGsfnJl+GmhZNi6MpoHGfPXEaBpotoPXRtNA2uO2cE5QAzBjtu0x23Y/t3s9on4a6N6390W2i/cOQNd7feXXhng9AJMuh3JjqB4GZQwyXXWY8fp7skQPh5jmnCmoDiKHb5xhatHaVSj3OtiC2Np2RHtXZPFNMUxPojb0CirVy/gwiOkqg1dwXdehjcgO0T1nO24PtzENdqr7rYZfT5lUJw6V6pW+ao+DA9BNXh4bTYOVaEbTYCWv0TRYyWs0DVaCWv0Awi6CuL5ye33rfUcOswjxaHxOx8b/WvFZE5+143ETj9vxmInH7HjUxKMUj0XH0zwiLRa9r/4kqEH0zQbRoEHUNEhMNoglEtH76o9pMP9mg/mgwbxpICtXcg9fhUD7ODGxsHJrRzgFs7DEkwvr9W5EMYdXMaNXU7KEL0ncDntpfNJmXf1WRuRw350LpnFvRvX6b8yJpjDmhDMZnHHhjARrFrjizZghrrBzhoczJ0FhovvTEMYMceaEMzVBQaPraQhjQNSWZ56RhjBGkDNfo3RfdFdwLgC3bUAoHLllA8LZhH9rPTgLwVkP1l681ShxJoMzJ9PCOS2cH3DhnH1PhTNfl6llefNy4hxnQqFO/9wpkPsywGzebKHkCh5X1JgTqSzue+dU0AFCGQimaHMnZ5UH/vMUagCkVfKyjFVFQxjj4fUK1rEMgPodPhcV2mQAUPtk8YFKK5Dgf8rMYVGtPW53AHRUcy5Fo4g7PwBtd7/vyKe40hpMOd9Qa0jlfAxhLMJfWqDb+mbAlc23l/N3+1rwbmZg+s1g+s1gan1snlqf/7n1mbst6+M5L0T/CaYzAGnVA9dxvFOqwcQ0t2bb9NZAWuZCFI5Mb8OhDBP36Z8xTNznfa/SFUe0OQHQbPMrXqWJUwUwJffvP/1zBo2zBl8mF378YVFrGmie3M8zjGHiDJosP3NvaEcFmP6cMC0j0zLyIZeRj/55GTFh+ymPUqv+H5R6AJTqu1XRxBOLBppVuajON5jqANTvbOh38tgPgK639tjbPcDrAYQpK+yv28zJij3fMudw9tdt7myf7Yhm2rySAbz3zFEpsvQnK+G0IDwhAAA=',    
  //过滤广告，未完成
  proxy_rule: `js:
  let url = input.url;
  let m3u8 = fixAdM3u8Ai(url);
  input = [200,'application/vnd.apple.mpegurl',m3u8]
  `
}