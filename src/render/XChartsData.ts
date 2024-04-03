export const XChartsData = {
	// 图标通用数据
	charts: {
		// 通用数据
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
				top: "3%",
				left: "center",
			},
			title: {
				show: true,
				top: "auto",
				right: "auto",
				bottom: "auto",
				left: "auto",
				text: "测试标题",
				textStyle: {
					color: "#f8f8f8",
					fontSize: "18",
					textBorderColor: "#898989",
					textBorderType: "solid",
					textBorderWidth: 2,
					// textShadowColor: "#d8d8d8",
					// textShadowBlur: 8,
					// textShadowOffsetY: 2,
				},
			},
			tooltip: {
				show: true,
				trigger: "axis",
			},
		},
		// X 轴
		xAxis: {
			// 坐标轴名称
			name: "",
			// 坐标轴名称显示位置 'start' 'middle/center' 'end'
			namePosition: "center",
			// 坐标轴名称的文字样式
			nameTextStyle: {},
			// X 轴位置 top bottom
			position: "bottom",

			// 坐标轴类型
			// 'value' 数值轴，适用于连续数据。
			// 'category' 类目轴，适用于离散的类目数据。为该类型时类目数据可自动从 series.data 或 dataset.source 中取，或者可通过 xAxis.data 设置类目数据。
			// 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
			// 'log' 对数轴。适用于对数数据。对数轴下的堆积柱状图或堆积折线图可能带来很大的视觉误差，并且在一定情况下可能存在非预期效果，应避免使用。
			type: "",
		},
		// Y 轴
		yAxis: {
			// 坐标轴名称
			name: "",
			// 坐标轴名称显示位置 'start' 'middle/center' 'end'
			namePosition: "center",
			// 坐标轴名称的文字样式
			nameTextStyle: {},
			// X 轴位置 top bottom
			position: "bottom",

			// 坐标轴类型
			// 'value' 数值轴，适用于连续数据。
			// 'category' 类目轴，适用于离散的类目数据。为该类型时类目数据可自动从 series.data 或 dataset.source 中取，或者可通过 xAxis.data 设置类目数据。
			// 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
			// 'log' 对数轴。适用于对数数据。对数轴下的堆积柱状图或堆积折线图可能带来很大的视觉误差，并且在一定情况下可能存在非预期效果，应避免使用。
			type: "",
		},
		//
		grid: {
			// top: "5%", // 顶部暂不设置间距，留给图例
			right: "2%",
			bottom: "6%",
			left: "2%",
			containLabel: true,
		},
		// 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
		label: {
			show: true,
			color: "inherit",
			fontSize: "16",
			formatter: "{c}",
			position: "outside",
		},
		labelLine: {
			show: true,
		},
		// 高亮状态的扇区和标签样式。
		emphasis: {
			label: {
				show: true,
				fontSize: "14",
				fontWeight: "bold",
			},
		},
		// 每个item样式配置
		itemStyle: {
			borderRadius: 16,
			borderColor: "#f8f8f8",
			borderWidth: 2,
		},
	},
};
