/**
 * Created by wei on 16-11-3.
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
Vue.config.lang = 'zh_CN'
var locales = {
  zh_CN: {
    static: {
      hello: '你好',
      userName:'用户名',
      passWord:'密  码',
      systemlogin:'系统登录',
      submit:'提交',
      account_or_password:'请输入帐号或密码',
      logout:'退出登录',
      modify_password:'修改密码',
      login_time_recently:'最近登录时间',
      friendly_warning:'友情提示',
      cancel:'取消',
      confirm:'确定',
      edit:'编辑',
      del:'删除',
      save:'保存',
      confirm_deletion:'确认删除',
      type:'类型',
      special:'特殊的',
      client_name:'客户名称',
      client_phone:'客户手机号',
      client_email:'邮箱',
      certificate:'资质证书',
      country:'国家',
      province:'所在省',
      city:'所在市',
      area:'所在区',
      dealing_address:'交收地址',
      pre_payment:'预付比例',
      invoice:'发票',
      come_to_see_product:'上门看货',
      packaging:'包装',
      international:'是否国际',
      Number_of_inquiries:'询价次数',
      quotation_number:'报价次数',
      issued_time:'发布时间',
      review_status:'审核状态',
      description:'描述',
      handle:'操作',
      commodity_items:'商品条目',
      my_intention:'我的意向',
      department_intention:'部门意向',
      International_intention_inquiry:'国际意向询价',
      detailed_information:'详情',
      clear_all:'清空条件',
      new:'新建',
      search:'搜索',
      item_details:'条目详情',
      other_quotations:'其他报价',
      original_file:'原文件',
      quotation_file:'报价文件',
      required:'必填项',
      postcodes:'邮编',
      new_international_intention:'新增国际意向',
      revised_international_intention:'修改国际意向',
      choose_client:'请选择客户',
      choose_country:'请选择国家',
      choose_province:'请选择省',
      choose_city:'请选择市',
      choose_area:'请选择地区',
      detailed_address:'详细地址',
      enter_address:'请输入详细地址',
      enter_name:'请输入收货人姓名',
      enter_phone:'请输入正确的手机号',
      enter_orderno:'按照订单流水号搜索',
      delivery_information:'交收信息',
      medicinal_material_information:'药材信息',
      add_material_information:'添加药材信息',
      enter_email:'请输入正确的邮箱',
      enter_package:'请输入包装要求',
      deadline:'过期时间',
      choose_deadline:'请选择过期时间',
      salesman:'业务员',
      create_time:'创建时间',
      inquire_type:'询价类型',
      inquiry_record:'询价记录',
      inquiry_state:'询价状态',
      raw_material_quotation:'原材料报价',
      file:'文件',
      raw_material_file:'原材料文件',
      quotation_documents:'报价文件',
      details:'详情',
      related_information:'相关信息',
      comment:'备注',
      breed:'品种',
      cost:'成本',
      quoted_price:'报价',
      quantity:'数量',
      unit:'单位',
      currency:'币种',
      expense:'费用',
      expense_explanation:'费用说明',
      all_in_cost:'总费用',
      file_type:'文件类型',
      file_path:'文件图片',
      file_origin:'文件来源',
      inquiry_again:'再次询价',
      upload:'上传',
      specification:'规格',
      certificate:'资质证书',
      origin:'产地',
      quality:'质量',
      price:'价格',
      historical_quotation:'条目历史报价',
      headline:'标题',
      total:'总价',
      quote_again:'再次报价',
      cost_price:'成本价格',
      inquiry_type:'询价类型',
      new_order:'新建订单',
      customer_info:'客户信息',
      sample_order:'是否样品订单',
      sundry_fees:'杂费',
      fee_explain:'杂费说明',
      preferential:'优惠金额',
      discount_note:'优惠说明',
      change_order:'修改订单',
      review_application:'申请审核',
      review:'审核',
      please_select:'请选择',
      order_type:'订单类别',
      select_order_type:'请选择订单类别',
      purchase:'采购',
      sell:'销售',
      order_status:'订单状态',
      order_message:'订单消息',
      order_info:'订单信息',
      select_order_status:'请选择订单状态',
      order_generation:'订单生成',
      pending:'待处理',
      wait_for_payment:'等待付款',
      wait_for_audit:'待审核',
      wait_for_delivery:'待发货',
      wait_for_receiving:'待收货',
      completed:'完成',
      canceled:'已取消',
      out_of_date:'已过期',
      payment_method:'支付方式',
      to_pay:'去支付',
      select_payment_method:'请选择支付方式',
      offline:'线下',
      alipay:'支付宝',
      order_validity:'订单有效性',
      select_order_validity:'请选择订单有效性',
      available:'有效',
      useless:'无效',
      client_source:'客户端来源',
      select_client_source:'请选择客户端来源',
      trading_patterns:'交易模式',
      select_trading_patterns:'选择交易模式',
      matched_trading:'撮合',
      third_party:'三方',
      order_no:'订单号',
      pay_no:'支付流水号',
      order_source:'订单来源',
      consignee:'收件人',
      consignee_name:'收货人姓名',
      consignee_phone:'收货人手机',
      consignee_address:'收货人地址',
      transaction_status:'交易状态',
      order_amount:'订单金额',
      account_number:'银行账号',
      normal_amount:'正常金额',
      freezing_amount:'冻结金额',
      transfer_amount:'转出金额',
      roll_in:'转入金额',
      application_time:'申请时间',
      status:'状态',
      link_types:'关联类型',
      enter_code:'请输入正确的邮箱',
      my_orders:'我的订单',
      department_orders:'部门订单',
      all_order:'全部订单',
      pay_order:'采购订单支付',
      pay_confirm:'销售订单审核',
      payrecord:'订单支付记录',
      paystatus:'支付状态',
      line_down:'线下打款',
      out_instatus:'转入/转出金额',
      pingan:'平安支付',
      yaokuan:'药款支付',
      rollout:'药款转出记录',
      rollin:'药款转入记录',
      drugsrecord:'药款金额记录',
      commodity_order:'商品订单列表',
      pay_evidence:'支付凭证',
      upload_attachments:'上传附件',
      logistics:'物流凭证',
      logistics_info:'物流信息',
      logistics_company:'物流公司',
      logistics_no:'物流单号',
      logistics_status:'物流状态',
      logistics_tips:'您的订单未发货，暂不能上传物流凭证！',
      pay_tips:'您的订单还没有支付，暂时不能新建支付凭证！',
      upload_voucher:'上传支付凭证',
      upload_logistics:'上传物流凭证',
      upload_attach:'上传附件',
      confirm_receipt:'确认收货',
      confirmation_delivery :'确认发货',
      view_logistics:'查看物流',
      confirm_accept:'客户确认收款',
      pass_checked:'通过核查',
      take_order:'接受订单',
      cancel_order:'取消此订单',
      stime:'下单时间开始',
      order_time:'下单时间',
      endtime:'下单时间结束',
      img_edit:'edit',
      img_del:'del',
      img_adopt:'adopt',
      img_inquire:'inquire',
      img_askagain:'EinquireAgain',
      img_cancelinquire:'cancelInquire_icon',
      img_quote:'quote',
      img_upload:'upload',
      img_apply:'apply',
      img_transfer:'Financialtransfer',
      quo_complete:'报价完成',
      quotation:'报价中',
      inquiry:'询价中',
      initial:'初始',
      reason:'原因',
      recommend_drugs:'推荐已开通药款账户用户使用',
      recommend_line:'金额较大或企业账户',
      upload_logistcs:'请上传物流单凭证照片',
      //client
      drag_into_blacklist:'加入黑名单',
      out_of_blacklist:'移出黑名单',
      make_them_become_supplier:'提取为供应商',
      assigned_to_employee:'划转',
      customer_classification:'客户分类',
      purchaser:'采购商',
      supplier:'供应商',
      purchaser_and_supplier:'买卖',
      credit_rating:'信用等级',
      none:'无',
      one_star:'一星',
      two_star:'两星',
      three_star:'三星',
      classification:'分类',
      customer_source:'客户来源',
      classification_code:'分类码',
      principals:'负责人',
      business_scope:'经营范围',
      province_of_phone:'手机省',
      city_of_phone:'手机市',
      registered_address:'注册地址',
      registered_time:'注册时间',
      whether_supplier:'是否供应商',
      operation:'操作',
      enter_client_name:'请输入客户名称',
      enter_business_scope:'请输入经营范围',
      select_country_first:'请先选择一个国家',
      select_province_first:'请先选择一个省',
      select_city_first:'请先选择一个市',
      enter_client_phone:'请输入客户手机',
      select_salesman:'请选择业务员',
      client_type:'客户类型',
      registration_start_time:'注册开始时间',
      registration_end_time:'注册结束时间',
      client_label:'客户标签',
      del_client_info:'删除客户信息',
      contact:'联系人',
      name:'姓名',
      position:'职位',
      department:'部门',
      cellphone:'手机',
      telephone:'电话',
      email:'邮箱',
      wechat:'微信',
      filename:'文件名',
      preview:'预览',
      intention:'意向',
      order:'订单',
      tracking:'跟进',
      business_type:'业务类型',
      tracking_mode:'跟进方式',
      contact_number:'联系账号',
      address:'地址',
      sex:'性别',
      label:'标签',
      product:'产品',
      test_report:'检测报告',
      whether_main_contact:'是否主联系人',
      validate_name:'不得少于两位',
      validate_cellphone:'请输入正确的手机号',
      validate_email:'请输入正确的邮箱',
      validate_wechat:'请输入正确的微信号',
      validate_telephone:'请输入正确的电话',
      validate_qq:'请输入正确的qq',
      validate_type:'请选择类型',
      pass:'通过',
      reject:'不通过',
      applications:'提交申请',
      //client
    }
  },
  en: {
    static: {
      hello: 'hello',
      userName:'Account',
      passWord:'Password',
      systemlogin:'System login',
      submit:'Submit',
      headline:'Headline',
      cost_price:'Cost price',
      historical_quotation:'Historical quotation',
      enter_code:'Please enter the correct email address',
      change_order:'Change order',
      sundry_fees:'Sundry fees',
      discount_note:'Discount note',
      preferential:'Preferential amount',
      fee_explain:'Miscellaneous instructions',
      account_or_password:'Please enter account and password',
      logout:'Log out',
      new_order:'New order',
      postcodes:'Postcodes',
      enter_name:'Please enter the name of the consignee',
      enter_phone:'Please enter the mobile of the consignee',
      sample_order :'Sample order',
      customer_info:'Customer information',
      modify_password:'Modify password',
      enter_orderno:'In order to search the serial number',
      login_time_recently:'The login time recently',
      friendly_warning:'Friendly warning',
      cancel:'Cancel',
      confirm:'Confirm',
      edit:'Edit',
      price:'Price',
      del:'Delete',
      save:'Save',
      confirm_deletion:'Confirm deletion',
      type:'Type',
      special:'Special',
      consignee:'Consignee',
      client_name:'Client name',
      client_phone:'Client phone',
      client_email:'Client email',
      certificate:'Certificate',
      country:'Country',
      province:'Province',
      city:'City',
      area:'Area',
      dealing_address:'Dealing address',
      pre_payment:'Pre-payment',
      invoice:'Invoice',
      come_to_see_product:'Come to see product',
      packaging:'Packaging',
      international:'International?',
      Number_of_inquiries:'Number of inquiries',
      quotation_number:'Quotation number',
      issued_time:'Issued time',
      review_status:'Review status',
      description:'Description',
      handle:'Handle',
      commodity_items:'Commodity items',
      my_intention:'My intention',
      department_intention:'Department intention',
      International_intention_inquiry:'International intention inquiry',
      detailed_information:'Detailed information',
      clear_all:'Clear all',
      new:'New',
      search:'Search',
      item_details:'Item details',
      other_quotations:'Other quotations',
      original_file:'Original file',
      quotation_file:'Quotation file',
      required:'Required',
      new_international_intention:'New international intention',
      revised_international_intention:'Revised international intention',
      choose_client:'Please choose customers',
      choose_country:'Please choose country',
      choose_province:'Please choose province',
      choose_city:'Please choose city',
      choose_area:'Please choose area',
      detailed_address:'Detailed address',
      enter_address:'Please enter a detailed address',
      delivery_information:'Delivery information',
      medicinal_material_information:'Medicinal material information',
      add_material_information:'Add material information',
      enter_email:'Please enter the correct email address',
      enter_package:'Please enter the package requirements',
      deadline:'Deadline',
      choose_deadline:'Please select expiration time',
      salesman:'Salesman',
      create_time:'Date created',
      inquire_type:'Inquiry type',
      inquiry_record:'Inquiry record',
      inquiry_state:'inquiry state',
      raw_material_quotation:'Raw material quotation',
      file:'File',
      raw_material_file:'Raw material file',
      quotation_documents:'Quotation documents',
      details:'Details',
      related_information:'Related information',
      comment:'Comment',
      breed:'Breed',
      cost:'Cost',
      total:'Total',
      quoted_price:'Quoted price',    //报价金额
      quantity:'Quantity',
      unit:'Unit',
      currency:'Currency',
      expense:'Expense',
      expense_explanation:'Expense_explanation',
      all_in_cost:'All-in cost',
      file_path:'File path',
      file_type:'File type',
      file_origin:'File origin',
      upload:'Upload',
      specification:'Specification',
      certificate:'Certificate',
      origin:'Origin',
      quality:'Quality',
      inquiry_again:'Inquiry again',
      quote_again:'To quote again',
      inquiry_type:'Inquiry type',
      review_application:'Review application',
      review:'Review',
      please_select:'Please select',
      order_type:'Order type',
      select_order_type:'Select order type',
      purchase:'Purchase',
      sell:'Sell',
      order_status:'Order status',
      to_pay:'To pay',
      order_message:'Order message',
      order_info:'Order information',
      select_order_status:'Select order status',
      order_generation:'Order generation',
      pending:'Pending',
      wait_for_payment:'Wait for payment',
      wait_for_audit:'Wait for audit',
      wait_for_delivery:'Wait for delivery',
      wait_for_receiving:'Wait for receiving',
      completed:'Completed',
      canceled:'Canceled',
      out_of_date:'Out of date',
      payment_method:'Method of payment',
      select_payment_method:'Select payment method',
      offline:'Offline',
      alipay:'Alipay',
      order_validity:'Order validity',
      select_order_validity:'Select order validity',
      available:'Available',
      useless:'Useless',
      client_source:'Client source',
      select_client_source:'Select client source',
      trading_patterns:'Trading patterns',
      select_trading_patterns:'Select trading patterns',
      matched_trading:'Match trading',
      third_party:'Third party',
      order_no:'Order number',
      pay_no:'Pay number',
      order_source:'Order Source',
      consignee_name:'Consignee name',
      consignee_phone:'Consignee phone',
      consignee_address:'Consignee address',
      transaction_status:'Transaction status',
      order_amount:'Order amount',
      account_number:'Account number',
      normal_amount:'Normal amount',
      freezing_amount:'Freezing amount',
      transfer_amount:'Transfer amount',
      roll_in:'Shift to amount',
      application_time:'Application time',
      link_types:'Association types',
      status:'status',
      my_orders:'My orders',
      department_orders:'Department orders',
      all_order:'All orders',
      pay_order:'To pay the order',
      pay_confirm:'Payment confirmation',
      payrecord:'Payment record',
      paystatus:'Payment status',
      line_down:'Line down payment',
      pingan:'Ping An payment',
      yaokuan:'Pay Yaokuan',
      rollout:'Out of drugs',
      rollin:'Drugs to record',
      drugsrecord:'The amount of drugs shall be recorded',
      out_instatus:'Roll_in or roll_out amount',
      commodity_order:'Commodity order list',
      pay_evidence:'Pay evidence',
      upload_attachments:'Upload attachments',
      logistics:'Logistics certificate',
      logistics_status:'Logistics status',
      logistics_info:'Logistics information',
      logistics_company:'Logistics company',
      logistics_no:'Number of logistics',
      logistics_tips:'Your order is not shipped, temporarily can not upload logistics documents!',
      pay_tips:'Your order has not been paid, temporarily unable to create a new payment document!',
      upload_voucher:'Upload payment voucher',
      upload_logistics:'Upload logistics document',
      upload_attach:'Upload attachments',
      confirm_receipt:'Confirm receipt',
      view_logistics:'View Logistics',
      confirmation_delivery:'Confirmation of delivery',
      confirm_accept:'Customer confirmation collection',
      order_time:'The date of order',
      pass_checked:'Through verification',
      take_order:'take orders',
      cancel_order:'Cancel this order',
      stime:'Single time start',
      endtime:'End of single time',
      img_edit:'Eedit',
      img_del:'Edel',
      img_adopt:'Eadopt',
      img_inquire:'Einquire',
      img_askagain:'inquireAgain',
      img_cancelinquire:'EcancelInquiren',
      img_quote:'Equote',
      img_upload:'Eupload',
      img_apply:'Eapply',
      img_transfer:'EFinancialtransfer',
      quo_complete:'Quotation completed',
      quotation:'Quotation',
      inquiry:'Inquirying',
      initial:'Initial',
      reason:'Reason',
      recommend_drugs:'The user account has been opened to recommend drugs',
      recommend_line:'Large amount or enterprise account',
      upload_logistcs:'Please upload the logistics document photos',
      drag_into_blacklist:'Drag into blacklist',
      out_of_blacklist:'Out of blacklist',
      make_them_become_supplier:'Make them become supplier',
      assigned_to_employee:'Assigned to employee',
      customer_classification:'Customer classification',
      purchaser:'Purchaser',
      supplier:'Supplier',
      purchaser_and_supplier:'Purchaser_and_supplier',
      credit_rating:'Credit rating',
      none:'none',
      one_star:'One star',
      two_star:'Two star',
      three_star:'Three star',
      classification:'Classification',
      customer_source:'Customer source',
      classification_code:'Classification code',
      principals:'Principals',
      business_scope:'Business scope',
      province_of_phone:'Province of phone',
      city_of_phone:'City of phone',
      registered_address:'Registered address',
      registered_time:'Registered time',
      whether_supplier:'Whether supplier',
      operation:'Operation',
      enter_client_name:'Please enter client name',
      enter_business_scope:'Please enter business scope',
      select_country_first:'Please select country first',
      select_province_first:'Please select province first',
      select_city_first:'Please select city first',
      enter_client_phone:'Please enter client phone',
      select_salesman:'Please_select_salesman',
      client_type:'Client type',
      registration_start_time:'Registration start time',
      registration_end_time:'Registration end time',
      client_label:'Client label',
      del_client_info:'Delete customer information',
      contact:'Contact',
      name:'Name',
      position:'Position',
      department:'Department',
      cellphone:'Cellphone',
      telephone:'Telephone',
      email:'email',
      wechat:'Wechat',
      filename:'Filename',
      preview:'Preview',
      intention:'Intention',
      order:'Order',
      tracking:'Tracking',
      business_type:'Business type',
      tracking_mode:'Tracking mode',
      contact_number:'Contact number',
      address:'Address',
      sex:'Sex',
      label:'Label',
      product:'Product',
      test_report:'Test report',
      whether_main_contact:'Whether main contact',
      validate_name:'Shall not be less than two',
      validate_cellphone:'Please enter correct cellphone number',
      validate_email:'Please enter correct email',
      validate_wechat:'Please enter correct wechat',
      validate_telephone:'Please enter correct telephone',
      validate_qq:'Please enter correct qq',
      validate_type:'Please select type',
      pass:'Pass',
      reject:'Reject',
      applications:'Submit applications'
    }
  }
}



Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})
