# XCharts

一个功能还算强大的图表插件，使用 echarts 图表库的实现图表数据展示，理论支持 echarts 全部图表

### 测试图表

可以参考以下数据实现你自己的图表

#### 测试饼图

```xcharts
type: pie
title:
  text: 测试饼图
  top: bottom
  left: center
series:
  data:
    - name: 社交媒体
      value: 41
    - name: 短视频平台
      value: 32.5
    - name: 电视
      value: 14.9
    - name: 报纸
      value: 8
    - name: 其他
      value: 2.2
```

#### 测试多个柱状图

```xcharts
type: bar
title:
  text: 测试多个柱状图
  top: bottom
  left: center
legend:
  data: [煤, 石油, 可再生能源]
xAxis:
  type: category
  data: [2010, 2015, 2020]
yAxis:
  type: value
series:
  - name: 煤
    data: [59, 50, 31]
  - name: 石油
    data: [29, 31, 34]
  - name: 可再生能源
    data: [12, 19, 35]
```

#### 测试折线图

```xcharts
type: line
title:
  text: 测试折线图
  top: bottom
  left: center
legend:
  data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
xAxis:
  type: category
  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
yAxis:
  type: value
series:
  - name: 'Email'
    smooth: true
    areaStyle: {}
    data: [120, 132, 101, 134, 90, 230, 210]
  - name: 'Union Ads'
    smooth: true
    data: [220, 182, 191, 234, 290, 330, 310]
  - name: 'Video Ads'
    smooth: true
    data: [150, 232, 201, 154, 190, 330, 410]
  - name: 'Direct'
    smooth: true
    data: [320, 332, 301, 334, 390, 330, 320]
  - name: 'Search Engine'
    smooth: true
    data: [820, 932, 901, 934, 1290, 1330, 1320]
```

#### 测试柱状图

```xcharts
type: bar
title:
  text: 测试柱状图
  top: bottom
  left: center
xAxis:
  type: category
  data: [能力, 知识, 技能, 心情]
yAxis:
  type: value
series:
  - name: 测试图例
    data: [84, 91, 32, 54]
```

### 参考

[echarts api](https://echarts.apache.org/zh/option.html)
[Obsidian Api](https://github.com/obsidianmd/obsidian-api)
