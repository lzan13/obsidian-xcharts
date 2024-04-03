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

		new Setting(containerEl)
			.setName("在侧边栏显示图标")
			.setDesc("在侧边栏中显示图表图标，允许您在任何地方快速使用创建图表")
			.addToggle((toggle) => {
				toggle
					.setValue(this.plugin.settings.enableRibbonIcon)
					.onChange(async (status) => {
						this.plugin.settings.enableRibbonIcon = status;
						await this.plugin.saveSettings();
						// Force refresh
						this.display();
					});
			});
	}
}
