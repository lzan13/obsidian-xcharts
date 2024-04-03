import { App, PluginSettingTab, Setting } from "obsidian";

import type XChartsPlugin from "../main";

/**
 * XCharts 设置页
 */
export default class XChartsSettingTab extends PluginSettingTab {
	plugin: XChartsPlugin;

	constructor(app: App, plugin: XChartsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		// new Setting(containerEl)
		// 	.setName("默认设置项")
		// 	.setDesc("这是设置描述")
		// 	.addToggle(())
		// 	.addText((text) =>
		// 		text
		// 			.setPlaceholder("输入设置")
		// 			.setValue(this.plugin.xChartsSettings.iconEnable)
		// 			.onChange(async (value) => {
		// 				this.plugin.xChartsSettings.iconEnable = value;
		// 				await this.plugin.saveSettings();
		// 			})
		// 	);
	}

	// 加载设置
	async loadSettings() {
		this.plugin.xChartsSettings = Object.assign(
			{},
			defaultSettings,
			await this.plugin.loadData()
		);
	}

	// 保存设置
	async saveSettings() {
		await this.plugin.saveData(this.plugin.xChartsSettings);
	}
}
