var obsidian = require("obsidian");
import { App, Modal, Setting, Notice } from "obsidian";

export default class XChartsModal extends Modal {
	app: App;
	chartType: string;
	constructor(app: App, chartType: string) {
		super(app);
		this.chartType = chartType;
	}
	createPie() {
		let option = {
			type: "pie",
		};
		new Setting(this.contentEl).setName("输入图表类型").addText((text) => {
			text.onChange((value) => {
				option.type = value;
			});
		});

		new Setting(this.contentEl).addButton((b) => {
			b.setButtonText("创建");
			b.onClick(() => {
				const view = this.app.workspace.getActiveViewOfType(
					obsidian.MarkdownView
				);
				if (!view) {
					return new Notice("只能在编辑状态下创建图表!", 3000);
				}
				let barSeries =
					"title: \n" +
					"  text: 测试多个柱状图 \n" +
					"  top: bottom \n" +
					"  left: center \n" +
					"legend: \n" +
					"  data: [煤, 石油, 可再生能源] \n" +
					"xAxis:  \n" +
					"  type: category \n" +
					"  data: [2010, 2015, 2020] \n" +
					"yAxis: \n" +
					"  type: value \n" +
					"series: \n" +
					"  - name: 煤 \n" +
					"    data: [59, 50, 31] \n" +
					"  - name: 石油 \n" +
					"    data: [29, 31, 34] \n" +
					"  - name: 可再生能源 \n" +
					"    data: [12, 19, 35]";
				let pieSeries =
					"title: \n" +
					"  text: 测试饼图 \n" +
					"  top: bottom \n" +
					"  left: center \n" +
					"series: \n" +
					"  data: \n" +
					"    - name: 社交媒体 \n" +
					"      value: 41 \n" +
					"    - name: 短视频平台 \n" +
					"      value: 32.5 \n" +
					"    - name: 电视 \n" +
					"      value: 14.9 \n" +
					"    - name: 报纸 \n" +
					"      value: 8 \n" +
					"    - name: 其他 \n" +
					"      value: 2.2";
				let lineSeries =
					"title: \n" +
					"  text: 测试折线图 \n" +
					"  top: bottom \n" +
					"  left: center \n" +
					"legend: \n" +
					"  data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'] \n" +
					"xAxis: \n" +
					"  type: category \n" +
					"  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] \n" +
					"yAxis: \n" +
					"  type: value \n" +
					"series: \n" +
					"  - name: 'Email' \n" +
					"    data: [120, 132, 101, 134, 90, 230, 210] \n" +
					"  - name: 'Union Ads' \n" +
					"    data: [220, 182, 191, 234, 290, 330, 310] \n" +
					"  - name: 'Video Ads' \n" +
					"    data: [150, 232, 201, 154, 190, 330, 410] \n" +
					"  - name: 'Direct' \n" +
					"    data: [320, 332, 301, 334, 390, 330, 320] \n" +
					"  - name: 'Search Engine' \n" +
					"    data: [820, 932, 901, 934, 1290, 1330, 1320]";

				let otherSeries =
					"title: \n" +
					"  text: 测试柱状图 \n" +
					"  top: bottom \n" +
					"  left: center \n" +
					"xAxis:  \n" +
					"  type: category \n" +
					"  data: [能力, 知识, 技能, 心情] \n" +
					"yAxis: \n" +
					"  type: value \n" +
					"series: \n" +
					"  - name: 测试图例 \n" +
					"    data: [84, 91, 32, 54]";

				let content = "";
				if (option.type == "bar") {
					content = `\`\`\`xcharts\ntype: ${option.type}\n${barSeries}\n\`\`\``;
				} else if (option.type == "pie") {
					content = `\`\`\`xcharts\ntype: ${option.type}\n${pieSeries}\n\`\`\``;
				} else if (option.type == "line") {
					content = `\`\`\`xcharts\ntype: ${option.type}\n${lineSeries}\n\`\`\``;
				} else {
					content = `\`\`\`xcharts\ntype: ${option.type}\n${otherSeries}\n\`\`\``;
				}
				view.editor.replaceRange(content, view.editor.getCursor());
				this.close();
			});
		});
		this.open();
	}

	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}
}
