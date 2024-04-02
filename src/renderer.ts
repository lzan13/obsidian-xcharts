import { Notice } from "obsidian";
import * as echarts from "echarts";
import { XChartOption } from "./option";
import { VData } from "./vdata";

/**
 * 自定义 XChart 渲染器
 */
export default class XChartRenderer {
	constructor(public option: XChartOption, public el: HTMLElement) {}

	/**
	 * 创建一个图表对象
	 * @returns 返回一个 echarts 对象
	 */
	createXChart() {
		const elContainer = this.el.createDiv("vm-xcharts-container");
		let xChart = echarts.init(elContainer, null, { renderer: "svg" });
		let width = 600;
		let height = 400;

		if (!xChart) {
			xChart = echarts.init(
				elContainer,
				Array.from(document.body.classList).includes("theme-dark")
					? "dark"
					: "light",
				{ width, height }
			);
		}

		return xChart;
	}
	/**
	 *
	 */
	renderChart() {
		if (this.option.type == "bar") {
			this.loadBarChart();
		} else if (this.option.type == "pie") {
			this.loadPieChart();
		} else {
		}
	}

	/**
	 * 加载柱状图
	 * @param json 数据源
	 * @param el html 标签
	 */
	loadBarChart() {
		let chartOptions = {
			...VData.charts.common,
			title: {
				text: "各种衬衫销量",
			},
			legend: {
				data: ["销量"],
			},
			xAxis: {
				data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
			},
			yAxis: {},
			series: [
				{
					name: "销量",
					type: "bar",
					data: [5, 20, 36, 10, 10, 20],
				},
			],
		};

		let xChart = this.createXChart();
		xChart.setOption(chartOptions);
	}

	/**
	 * 加载饼图
	 * @param json 数据源
	 * @param el html 标签
	 */
	loadPieChart() {
		let data = [
			{ name: "男", value: 3 },
			{ name: "女", value: 3 },
			{ name: "未知", value: 2 },
		];
		let chartOptions = {
			...VData.charts.common,
			title: {
				text: "用户性别",
			},
			series: [
				{
					type: "pie",
					radius: ["16%", "64%"],
					...VData.charts.label,
					...VData.charts.item,
					data,
				},
			],
		};

		let xChart = this.createXChart();
		xChart.setOption(chartOptions);
	}

	// renderPie() {
	// 	const myChart = this.initChart();
	// 	const { width, height, ...option } = this.options;
	// 	const source = option.source;
	// 	const dv = getAPI(app);
	// 	if (typeof dv == "undefined") {
	// 		return new Notice(
	// 			"Dataview is not installed. This plugin requires Dataview to work properly.",
	// 			3000
	// 		);
	// 	}
	// 	const pages = dv.pages(`"${source}"`);
	// 	const data = pages.map((page) => {
	// 		return {
	// 			name: page.file.name,
	// 			value: page.file.size,
	// 		};
	// 	});
	// 	const chartOption = {
	// 		backgroundColor: "#2c343c",
	// 		title: {
	// 			text: "file size Pie",
	// 			left: "center",
	// 			top: 20,
	// 			textStyle: {
	// 				color: "#ccc",
	// 			},
	// 		},
	// 		tooltip: {
	// 			trigger: "item",
	// 		},
	// 		visualMap: {
	// 			show: false,
	// 			min: 80,
	// 			max: 30000,
	// 			inRange: {
	// 				colorLightness: [0, 1],
	// 			},
	// 		},
	// 		series: [
	// 			{
	// 				name: "Access From",
	// 				type: "pie",
	// 				radius: "55%",
	// 				center: ["50%", "50%"],
	// 				data: data,
	// 				roseType: "radius",
	// 				label: {
	// 					color: "rgba(255, 255, 255, 0.3)",
	// 				},
	// 				labelLine: {
	// 					lineStyle: {
	// 						color: "rgba(255, 255, 255, 0.3)",
	// 					},
	// 					smooth: 0.2,
	// 					length: 10,
	// 					length2: 20,
	// 				},
	// 				itemStyle: {
	// 					color: "#c23531",
	// 					shadowBlur: 200,
	// 					shadowColor: "rgba(0, 0, 0, 0.5)",
	// 				},
	// 				animationType: "scale",
	// 				animationEasing: "elasticOut",
	// 				animationDelay: function (idx: number) {
	// 					return Math.random() * 200;
	// 				},
	// 			},
	// 		],
	// 	};

	// 	myChart.setOption({ animation: false, ...chartOption });
	// }

	// render() {
	// 	const myChart = this.initChart();
	// 	const { width, height, ...option } = this.options;
	// 	try {
	// 		myChart.setOption({ animation: false, ...option });
	// 		myChart.on("click", function (params) {
	// 			let prefix: string = "";
	// 			let searchWord: string = "";
	// 			if (params.data["search"]) {
	// 				let search = params.data["search"];
	// 				if (search === "tag") prefix = "tag:";
	// 				if (search === "content") prefix = "content:";
	// 				if (search === "path") prefix = "path:";
	// 				if (search === "file") prefix = "file:";
	// 				searchWord = prefix + params.name;
	// 			}
	// 			if (params.data["path"]) {
	// 				searchWord =
	// 					searchWord + " " + "path:" + params.data["path"];
	// 			}
	// 			if (params.data["file"]) {
	// 				searchWord =
	// 					searchWord + " " + "file:" + params.data["file"];
	// 			}
	// 			if (searchWord) {
	// 				app.internalPlugins
	// 					.getPluginById("global-search")
	// 					?.instance.openGlobalSearch(searchWord);
	// 			} else {
	// 				const filePath = app.metadataCache.getFirstLinkpathDest(
	// 					params.name,
	// 					""
	// 				);
	// 				app.workspace.getUnpinnedLeaf().openFile(filePath);
	// 			}
	// 		});
	// 	} catch (err) {
	// 		new Error(err);
	// 	}
	// }
}
