import {
	App,
	Editor,
	MarkdownPostProcessorContext,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";
import XChartRenderer from "./renderer";
import EchartsModal from "./modal";
import { parse } from "yaml";

// Remember to rename these classes and interfaces!

interface IPluginSettings {
	pluginSetting: string;
}

const defaultSettings: IPluginSettings = {
	pluginSetting: "hello xcharts",
};

/**
 * XCharts 插件类定义
 */
export default class XChartsPlugin extends Plugin {
	settings: IPluginSettings;

	// 插件加载方法
	async onload() {
		console.log("XChartsPlugin.onload");
		await this.loadSettings();

		// 在左边导航栏创建一个图标
		const ribbonIconEl = this.addRibbonIcon(
			"chart", // 图标
			"创建图表", // 悬停提示文本
			(evt: MouseEvent) => {
				// 出发图标点击事件
				// Called when the user clicks the icon.
				new Notice("创建图表通知");
			}
		);
		// 给图标添加 css class
		ribbonIconEl.addClass("vm-xcharts-ribbon");

		// 在底部状态栏添加内容，移动端不起作用
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText("Status Bar Text");

		// 添加一个可以在任何地方触发的简单命令
		this.addCommand({
			id: "open-sample-modal-simple",
			name: "XCharts打开简单窗口",
			callback: () => {
				new SampleModal(this.app).open();
			},
		});
		// 添加一个编辑器命令，该命令可以对当前编辑器实例执行某些操作
		this.addCommand({
			id: "sample-editor-command",
			name: "XCharts简单编辑命令",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection("Sample Editor Command");
			},
		});
		// 添加一个复杂的命令，可以检查应用程序的当前状态是否允许执行该命令
		this.addCommand({
			id: "open-sample-modal-complex",
			name: "XCharts打开窗口(complex)",
			checkCallback: (checking: boolean) => {
				// 检查条件
				const markdownView =
					this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// 根据检查结果执行后边的操作
					if (checking) {
						new SampleModal(this.app).open();
					}

					// 当 check 函数返回 true 时，该命令才会显示在命令面板中
					return true;
				}
			},
		});

		// 添加一个设置选项卡，以便用户可以配置插件的各个方面
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// 如果插件挂起了任何全局DOM事件(应用中不属于这个插件的部分)，
		// 当插件被禁用时，使用这个函数将自动删除事件监听器。
		this.registerDomEvent(document, "click", (evt: MouseEvent) => {
			console.log("click", evt);
		});

		// 当注册间隔时，该函数将在插件被禁用时自动清除间隔。
		this.registerInterval(
			window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000)
		);

		console.log("loading echarts plugin...");

		this.addCommand({
			id: "echarts-create-charts",
			name: "create echarts",
			callback: () => {
				const creator = new EchartsModal(this.app, "pie");
				creator.createPie();
			},
		});

		// 注册 markdown 代码块处理器 xcharts
		this.registerMarkdownCodeBlockProcessor(
			"xcharts",
			(source, el, ctx) => {
				let json = parse(source);
				let renderer = new XChartRenderer(json, el);
				renderer.renderChart();
			}
		);
	}
	// /**
	//  *
	//  * @param source yaml 源数据
	//  * @param el markdown code html 元素
	//  * @param ctx 上下文对象
	//  */
	// handleMarkdownCodeBlockProcessor(
	// 	source: string,
	// 	el: HTMLElement,
	// 	ctx: MarkdownPostProcessorContext
	// ) {
	// 	let json = parse(source);
	// 	if (json.type == "bar") {
	// 		this.loadBarChart(json, el);
	// 	} else if (json.type == "pie") {
	// 		this.loadPieChart(json, el);
	// 	} else {
	// 	}
	// }

	// 插件取消加载
	onunload() {
		console.log("XChartsPlugin.onunload");
	}

	// 加载设置
	async loadSettings() {
		this.settings = Object.assign(
			{},
			defaultSettings,
			await this.loadData()
		);
	}

	// 保存设置
	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText("Woah!");
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: XChartsPlugin;

	constructor(app: App, plugin: XChartsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("默认设置项")
			.setDesc("这是设置描述")
			.addText((text) =>
				text
					.setPlaceholder("输入设置")
					.setValue(this.plugin.settings.pluginSetting)
					.onChange(async (value) => {
						this.plugin.settings.pluginSetting = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
