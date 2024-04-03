import { Notice, parseYaml } from "obsidian";
import * as echarts from "echarts";
import { XChartsData } from "./XChartsData";
import { XChartsOption } from "./XChartsOption";

/**
 * 自定义 XChart 渲染器
 */
export default class XChartsRenderer {
	options: XChartsOption;
	constructor(public data: string, public el: HTMLElement) {
		console.log("XChartsRenderer-->");
		this.options = parseYaml(this.data);
		console.log(this.options);
	}

	/**
	 * 创建一个图表对象
	 * @returns 返回一个 echarts 对象
	 */
	createXChart() {
		const elContainer = this.el.createDiv("vm-xcharts-container");
		// let xChart = echarts.getInstanceByDom(elContainer);
		let theme = Array.from(document.body.classList).includes("theme-dark")
			? "dark"
			: "light";
		// 兜底 宽高
		let width = this.options.width ?? "800";
		let height = this.options.height ?? "600";

		let xChart = echarts.init(elContainer, theme, {
			width,
			height,
			renderer: "canvas", // 选择 svg 渲染 默认是 canvas
		});

		return xChart;
	}
	/**
	 * 渲染图表
	 */
	renderChart() {
		if (this.options.type == "bar") {
			this.rendererBarChart();
		} else if (this.options.type == "pie") {
			this.rendererPieChart();
		} else {
			this.rendererCommonChart();
		}
	}

	/**
	 * 加载柱状图
	 */
	rendererBarChart() {
		let chartOptions = {
			...XChartsData.charts.common,
			// X 轴
			xAxis: {
				...XChartsData.charts.xAxis,
				...this.options.xAxis,
			},
			// Y 轴
			yAxis: {
				...XChartsData.charts.yAxis,
				...this.options.yAxis,
			},
			grid: XChartsData.charts.grid,
			series: this.options.series,
		};
		chartOptions.series?.forEach((item) => {
			item.type = this.options.type;
			item.label = XChartsData.charts.label;
			item.lableLine = XChartsData.charts.labelLine;
			item.emphasis = XChartsData.charts.emphasis;
			// item.itemStyle = XChartsData.charts.itemStyle;
		});

		this.rendererCommon(chartOptions, this.options);
	}

	/**
	 * 加载饼图
	 */
	rendererPieChart() {
		let chartOptions = {
			...XChartsData.charts.common,
			series: [
				{
					type: this.options.type,
					radius: ["16%", "64%"],
					label: XChartsData.charts.label,
					lableLine: XChartsData.charts.labelLine,
					emphasis: XChartsData.charts.emphasis,
					itemStyle: XChartsData.charts.itemStyle,
					...this.options.series,
				},
			],
		};

		this.rendererCommon(chartOptions, this.options);
	}

	/**
	 * 加载通用图表
	 */
	rendererCommonChart() {
		let chartOptions = {
			...XChartsData.charts.common,
			// X 轴
			xAxis: {
				...XChartsData.charts.xAxis,
				...this.options.xAxis,
			},
			// Y 轴
			yAxis: {
				...XChartsData.charts.yAxis,
				...this.options.yAxis,
			},
			grid: XChartsData.charts.grid,
			series: this.options.series,
		};
		// let series = [];
		chartOptions.series?.forEach((item) => {
			item.type = this.options.type;
			item.label = XChartsData.charts.label;
			item.lableLine = XChartsData.charts.labelLine;
			item.emphasis = XChartsData.charts.emphasis;
			// item.itemStyle = XChartsData.charts.itemStyle;
		});

		this.rendererCommon(chartOptions, this.options);
	}

	/**
	 * 渲染通用方法
	 * @param chartOptions
	 * @param options
	 */
	private rendererCommon(chartOptions: any, options: any) {
		// 设置标题
		if (this.options.title && this.options.title?.text) {
			chartOptions.title.text = this.options.title?.text;
		}
		if (this.options.title && this.options.title?.top) {
			chartOptions.title.top = this.options.title?.top;
		}
		if (this.options.title && this.options.title?.right) {
			chartOptions.title.right = this.options.title?.right;
		}
		if (this.options.title && this.options.title?.bottom) {
			chartOptions.title.bottom = this.options.title?.bottom;
		}
		if (this.options.title && this.options.title?.left) {
			chartOptions.title.left = this.options.title?.left;
		}
		// 标题样式
		if (this.options.title && this.options.title?.textStyle) {
			chartOptions.title.textStyle = {
				...XChartsData.charts.common.title.textStyle,
				...this.options.title?.textStyle,
			};
		}

		let xChart = this.createXChart();
		xChart.setOption(chartOptions);
	}
}
