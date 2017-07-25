export const bizTypeOptions = [ //经营客户类型
				{value:'',text:'全部'},
				{value:'0',text:'其它'},
				{value:'1',text:'合作社'},
				{value:'2',text:'药商'},
				{value:'3',text:'药厂'},
				{value:'4',text:'个体户'},
				{value:'5',text:'药店'},
				{value:'6',text:'医院'},
				{value:'7',text:'贸易公司'},
				{value:'8',text:'零售商行'},
				{value:'9',text:'药农'},
				{value:'10',text:'介绍人'},
				//{value:'11',text:'药贩子'},
				{value:'12',text:'产地药商'},
				{value:'13',text:'销地药商'},
				{value:'14',text:'诊所'},
				{value:'15',text:'化工厂'},
				{value:'16',text:'化妆品厂'},
				{value:'17',text:'提取物厂'},
				{value:'18',text:'食品厂'},
				{value:'19',text:'实验室'},
				{value:'20',text:'网上电商'},
				{value:'21',text:'中成药生产商'},
				{value:'22',text:'西药生产商'},
				{value:'23',text:'饮片厂'},
				{value:'25',text:'种植基地'}
			]

export const sourceOptions = [ //客户端来源
				{value:'',text:'全部'},
				{value:'1',text:'pc'},
				{value:'2',text:'安卓'},
				{value:'3',text:'微信'},
				{value:'4',text:'IOS'},
			]

export const transformOptions = [ //提取状态
                {value:'',text:'全部'},
                {value:'0',text:'待提取'},
                {value:'1',text:'已提取'}
            ]

export const uTypeOptions = [ //认证状态
                {value:'',text:'全部'},
                {value:'0',text:'未申请'},
                {value:'1',text:'等待认证'},
                {value:'2',text:'已认证'},
                {value:'3',text:'认证失败'},
            ]

export const auditOptions = [ //审核状态
                {value:'',text:'全部'},
                {value:'0',text:'待审核'},
                {value:'1',text:'审核中'},
                {value:'2',text:'审核通过'},
                {value:'3',text:'审核不通过'}
            ]

export const inquireOptions = [ //询价状态
                {value:'0',text:'初始'},
                {value:'1',text:'询价中'},
                {value:'2',text:'报价中'},
                {value:'3',text:'报价完成'}
			]

export const purchaseSource = [ //采购单来源
				{value:'0',text:'业务员导入'},
                {value:'1',text:'web'},
                {value:'2',text:'android'},
                {value:'3',text:'weixin'},
                {value:'4',text:'ios'}
			]

export const offerOptions = [//已收报价
				{value:"-1",text:'全部'},
                {value:"1",text:'收到报价'},
                {value:"0",text:'暂无报价'},
			]

export const creditLevelOptions = [ //信用星级
				{value:'',text:'static.please_select'},
				{value:'0',text:'static.none'},
                {value:'1',text:'static.one_star'},
                {value:'2',text:'static.two_star'},
                {value:'3',text:'static.three_star'},
                {value:'4',text:'static.four_star'},
                {value:'5',text:'static.five_star'}
			]

export const provinceOptions = [ // 省份
            { "value": "北京", "text": "北京(beijing)" },
            { "value": "天津", "text": "天津(tianjin)" },
            { "value": "河北", "text": "河北(hebei)" },
            { "value": "山西", "text": "山西(shanxi)" },
            { "value": "内蒙古", "text": "内蒙古(neimenggu)" },
            { "value": "辽宁", "text": "辽宁(liaoning)" },
            { "value": "吉林", "text": "吉林(jilin)" },
            { "value": "黑龙江", "text": "黑龙江(heilongjiang)" },
            { "value": "上海", "text": "上海(shanghai)" },
            { "value": "江苏", "text": "江苏(jiangsu)" },
            { "value": "浙江", "text": "浙江(zhejiang)" },
            { "value": "安徽", "text": "安徽(anhui)" },
            { "value": "福建", "text": "福建(fujian)" },
            { "value": "江西", "text": "江西(jiangxi)" },
            { "value": "山东", "text": "山东(shandong)" },
            { "value": "河南", "text": "河南(henan)" },
            { "value": "湖北", "text": "湖北(hubei)" },
            { "value": "湖南", "text": "湖南(hunan)" },
            { "value": "广东", "text": "广东(guangdong)" },
            { "value": "广西", "text": "广西(guangxi)" },
            { "value": "海南", "text": "海南(hainan)" },
            { "value": "重庆", "text": "重庆(chongqing)" },
            { "value": "四川", "text": "四川(sichuan)" },
            { "value": "贵州", "text": "贵州(guizhou)" },
            { "value": "云南", "text": "云南(yunnan)" },
            { "value": "西藏", "text": "西藏(xizang)" },
            { "value": "陕西", "text": "陕西(sanxi)" },
            { "value": "甘肃", "text": "甘肃(gansu)" },
            { "value": "青海", "text": "青海(qinghai)" },
            { "value": "宁夏", "text": "宁夏(ningxia)" },
            { "value": "新疆", "text": "新疆(xinjiang)" },
            { "value": "台湾", "text": "台湾(taiwan)" },
            { "value": "香港", "text": "香港(xianggang)" },
            { "value": "澳门", "text": "澳门(aomen)" }
		]

export const offerSource = [ //报价来源
            { "value": "", "text": "全部" },
            { "value": "0", "text": "业务员" },
            { "value": "1", "text": "客户" }
        ]
