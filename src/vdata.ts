export const VData = {
	// 图标通用数据
	charts: {
		common: {
			backgroundColor: "#00000000",
			color: [
				"#409eff",
				"#f56c6c",
				"#91cc75",
				"#fac858",
				"#ee6666",
				"#73c0de",
				"#3ba272",
				"#fc8452",
				"#9a60b4",
				"#ea7ccc",
			],
			legend: {
				top: "5%",
				left: "center",
			},
			title: {
				show: true,
				text: "测试标题",
			},
			tooltip: {
				show: true,
				trigger: "axis",
			},
		},
		label: {
			label: {
				show: true,
				fontSize: "14",
				formatter: "{b}:{c}",
				position: "outside",
			},
			emphasis: {
				label: {
					show: true,
					fontSize: "16",
					fontWeight: "bold",
				},
			},
			labelLine: {
				show: true,
			},
		},
		item: {
			// 每个item样式配置
			itemStyle: {
				borderRadius: 16,
				borderColor: "#fff",
				borderWidth: 3,
			},
		},
	},
};
