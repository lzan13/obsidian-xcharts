/**
 * 定义 XCharts 设置接口
 */
export interface IXChartsSettings {
	// 是否开启 Ribbon 图标
	enableRibbonIcon: boolean;
}

export const defaultSettings: IXChartsSettings = {
	enableRibbonIcon: true,
};
