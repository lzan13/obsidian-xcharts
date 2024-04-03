import { App, Editor, MarkdownView, Modal, Notice, Plugin } from "obsidian";
import XChartsRenderer from "./render/XChartsRenderer";
import XChartsModal from "./ui/XChartsModal";
import XChartsSettingTab from "./ui/XChartsSettingsTab";

/**
 * XCharts 插件类定义
 */
export default class XChartsPlugin extends Plugin {
	// 插件设置
	xChartsSettings: IXChartsSettings;

	/**
	 * 设置侧边栏图标元素
	 */
	setupIconEL() {
		console.log("setupIconEL");
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
		ribbonIconEl.addClass("vm-xcharts-ribbon-icon");
	}

	/**
	 * 在底部状态栏添加内容，移动端不起作用
	 */
	setupStatusBarItemEL() {
		console.log("setupStatusBarItemEL");
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText("Status Bar Text");
	}

	/**
	 * 设置图表相关命令
	 */
	setupCommand() {
		console.log("setupCommand");
		// 添加一个新建图表命令
		this.addCommand({
			id: "vm-xcharts-create",
			name: "创建 Charts",
			callback: () => {
				let modal = new XChartsModal(this.app, "pie");
				modal.createPie();
			},
		});
	}

	/**
	 * 设置 Markdown 代码快处理器
	 */
	setupMarkdownCodeBlockProcessor() {
		console.log("setupMarkdownCodeBlockProcessor");
		// 注册 markdown 代码块处理器 xcharts
		this.registerMarkdownCodeBlockProcessor("xcharts", (source, el) => {
			let renderer = new XChartsRenderer(source, el);
			renderer.renderChart();
		});
	}
	/**
	 * 设置 XCharts 设置页面
	 */
	setupSettingTab() {
		// 添加一个设置选项卡，以便用户可以配置插件的各个方面
		this.addSettingTab(new XChartsSettingTab(this.app, this));
	}

	/**
	 * 插件加载方法
	 */
	async onload() {
		console.log("XChartsPlugin.onload");

		// 设置侧边栏图标元素
		this.setupIconEL();

		// 在底部状态栏添加内容，移动端不起作用
		// this.setupStatusBarItemEL();

		// 设置 XCharts 相关命令
		this.setupCommand();

		// 设置 Markdown 代码快处理器
		this.setupMarkdownCodeBlockProcessor();

		// 设置 XCharts 设置页
		this.setupSettingTab();
	}

	// 插件取消加载
	onunload() {
		console.log("XChartsPlugin.onunload");
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
