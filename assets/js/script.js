const weatherBackgrounds = {
    '0': 'qing.gif',     // 晴
    '2': 'qing.gif',     // 晴
    '3': 'qing.gif',     // 晴
    '4': 'duoyun.gif',   // 多云
    '5': 'duoyun.gif',   // 多云
    '6': 'duoyun.gif',   // 多云
    '7': 'duoyun.gif',   // 多云
    '8': 'duoyun.gif',   // 多云
    '9': 'yin.gif',      // 阴
    '10': 'xiaoyu.gif',  // 阵雨
    '12': 'leizhenyu.gif', // 雷阵雨
    '13': 'xiaoyu.gif',  // 小雨
    '14': 'zhongyu.gif', // 中雨
    '15': 'dayu.gif',    // 大雨
    '16': 'baoyu.gif',   // 暴雨
    '17': 'baoyu.gif',   // 大暴雨
    '18': 'baoyu.gif',   // 特大暴雨
    '19': 'xue.gif',     // 雨夹雪
    '20': 'xue.gif',     // 雨夹雪
    '21': 'xiaoxue.gif', // 小雪
    '22': 'xiaoxue.gif', // 小雪
    '23': 'zhongxue.gif', // 中雪
    '24': 'daxue.gif',   // 大雪
    '25': 'baoxue.gif',  // 暴雪
    '30': 'wu.gif'       // 雾
};

function updateBackground(weatherCode) {
    const bgContainer = document.getElementById('bg-container');
    const bgImage = weatherBackgrounds[weatherCode] || 'qing.gif';
    bgContainer.style.backgroundImage = `url('${window.location.pathname}assets/images/${bgImage}')`;
}

async function searchWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('请输入城市名称');
        return;
    }

    try {
        const response = await fetch(`https://api.seniverse.com/v3/weather/now.json?key=S9Xp2LvZe103E_JVj&location=${city}&language=zh-Hans&unit=c`);
        const data = await response.json();
        
        const weatherResult = document.getElementById('weather-result');
        const result = data.results[0];
        
        // 更新背景图片
        updateBackground(result.now.code);
        
        // 添加活动状态类，使容器半透明
        document.querySelector('.container').classList.add('active');
        
        weatherResult.innerHTML = `
            <div class="weather-card">
                <h2>${result.location.name}</h2>
                <p class="temperature">${result.now.temperature}°C</p>
                <p class="weather-text">${result.now.text}</p>
                <p class="update-time">更新时间：${new Date(result.last_update).toLocaleString()}</p>
            </div>
        `;
    } catch (error) {
        console.error('获取天气信息失败:', error);
        document.getElementById('weather-result').innerHTML = '<p class="error">获取天气信息失败，请稍后重试</p>';
    }
}
