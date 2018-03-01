/**
 * @file students.js
 * @author smpower
 * @date 2018/2/24 9:09
 * @email bzsjxhywrf@outlook.com
 * @github https://github.com/smpower/
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true
  regexp : true, sloppy  : true, vars     : true,
  white  : true
*/

(function (window, factory) {

  $.ajax({
    type    : 'post',
    url     : 'json/aboutme.json',
    // url     : 'aboutme',
    success : function (data) {
      if (data.length === 0) { console.log('暂无当前登录人信息'); return false; }
      factory(window, data);
    },
    error : function (error) {
      console.log('与服务器通讯失败!');
      console.log('=========================================================');
      console.log(error);
    }
  });

}(this, function (window, userinfo_map) {

  // ---------------------- BEGIN MODULE SCOPE VARIABLES ----------------------
  var
    /**
     * 配置项
     * @type {object}
     * @property {object} nav - 页面左侧导航菜单配置项
     * @property {number} nav.px_extend_width - 导航菜单展开的宽度
     * @property {number} nav.px_retract_width - 导航菜单收起的宽度
     * @property {number} nav.px_icon_extend_marginRight - 导航菜单展开时图标的 margin-right 值
     * @property {number} nav.px_icon_retract_marginRight - 导航菜单收起时图标的 margin-right 值
     * @property {number} nav.px_txt_extend_width - 导航菜单展开时按钮文字的宽度
     * @property {number} nav.px_txt_retract_width - 导航菜单收起时按钮文字的宽度
     * @property {number} nav.extend_time - 导航菜单展开过程需要的时间
     * @property {number} nav.retract_time - 导航菜单收起过程需要的时间
     * @property {object} nav.btn_icon - 导航菜单按钮元素集合
     * @property {string} nav.btn_icon.icon_repeat - 导航菜单图标的平铺模式
     * @property {string} nav.btn_icon.icon_position - 导航菜单图标位置
     * @property {string} nav.btn_icon.students_default_url - 导航菜单学员管理按钮默认图标路径
     * @property {string} nav.btn_icon.students_active_url - 导航菜单学员管理按钮激活图标样式
     * @property {string} nav.btn_icon.performance_default_url - 导航菜单业绩管理按钮默认图标路径
     * @property {string} nav.btn_icon.performance_active_url - 导航菜单业绩管理按钮激活图标路径
     * @property {string} nav.btn_icon.chart_default_url - 导航菜单业绩图表按钮默认图标路径
     * @property {string} nav.btn_icon.chart_active_url - 导航菜单业绩图表按钮激活图标路径
     * @property {string} nav.btn_icon.sell_default_url - 导航菜单销售管理按钮默认图标路径
     * @property {string} nav.btn_icon.sell_active_url - 导航菜单销售管理按钮激活图标路径
     * @property {string} nav.btn_icon.permission_default_url - 导航菜单权限管理按钮默认图标路径
     * @property {string} nav.btn_icon.permission_active_url - 导航菜单权限管理按钮激活图标路径
     * @property {object} main - 页面主体区域配置项
     * @property {number} main.px_extend_marginLeft - 页面主体区域在导航菜单展开状态下的 margin-left 值
     * @property {number} main.px_retract_marginLeft - 页面主体区域在导航菜单收起状态下的 margin-left 值
     * @property {number} main.extend_time - 拉伸页面主体区域所需要的时间
     * @property {number} main.retract_time - 收缩页面主体区域所需要的时间
    */
    configMap = {
      nav : {
        px_extend_width : 180,
        px_retract_width : 45,
        px_icon_extend_marginRight : 20,
        px_icon_retract_marginRight : 0,
        px_txt_extend_width : 64,
        px_txt_retract_width : 0,
        extend_time : 300,
        retract_time : 300,
        btn_icon : {
          icon_repeat : 'no-repeat',
          icon_position : 'center',
          students_default_url : 'url("images/util/icon-tab-students-default.png")',
          students_active_url : 'url("images/util/icon-tab-students-selected.png")',
          performance_active_url : 'url("images/util/icon-tab-achievement-selected.png")',
          performance_default_url : 'url("images/util/icon-tab-achievement-default.png")',
          chart_default_url : 'url("images/util/icon-tab-chart-default.png")',
          chart_active_url : 'url("images/util/icon-tab-chart-selected.png")',
          sell_default_url : 'url("images/util/icon-tab-sell-default.png")',
          sell_active_url : 'url("images/util/icon-tab-sell-selected.png")',
          permission_default_url : 'url("images/util/icon-tab-permission-default.png")',
          permission_active_url : 'url("images/util/icon-tab-permission-active.png")'
        }
      },
      main : {
        px_extend_marginLeft : 180,
        px_retract_marginLeft : 45,
        extend_time : 300,
        retract_time : 300
      }
    },
    /** 状态集合 */
    stateMap = { is_nav_extend : true },
    varMap = { body : null },  /** DOM 集合 */

    setVarMap,  /** 缓存 DOM 集合 */
    formatUserInfo,  /** 格式化当前登录人信息 */

    renderHeaderContent,  /** 渲染页面头部信息 */
    toggleInfoPanel,  /** 展开或收起页面头部通知面板 */
    renderPersonalData,  /** 渲染个人资料 */
    closePersonalDataModal,  /** 关闭个人资料模态框 */
    toggleNav,  /** 展开或收起页面左侧导航菜单 */
    pageJump,  /** 页面跳转 */

    onClick,  /** 点击事件监听/处理程序 */

    initModule  /** 初始化模块 */
  ;
  // ----------------------- END MODULE SCOPE VARIABLES -----------------------

  // ---------------------------- BEGIN AJAX METHODS --------------------------
  // ----------------------------- END AJAX METHODS ---------------------------

  // -------------------------- BEGIN UTILITY METHODS -------------------------

  /**
   * 格式化当前登录人信息
   * @func [formatUserInfo]
   * @param {Object} userinfo_map - 当前登录人信息映射
   * @param {string} userinfo_map.unameS - 当前登录人姓名(str)
   * @param {number} userinfo_map.positionS - 当前登录人职位(num)
   * @param {string} userinfo_map.superiorS - 当前登录人上级领导的姓名
   * @returns {Object} 格式化后的当前登录人信息映射
  */
  formatUserInfo = userinfo_map => {
    var userinfo, user_position_num, user_position_txt;

    /** 格式化当前登录人职位信息 */
    switch (userinfo_map.positionS) {
      case 0:
        user_position_num = 0;
        user_position_txt = '实习销售';
        break;
      case 1:
        user_position_num = 1;
        user_position_txt = '销售';
        break;
      case 2:
        user_position_num = 2;
        user_position_txt = '主管';
        break;
      case 3:
        user_position_num = 3;
        user_position_txt = '总监';
        break;
      case 4:
        user_position_num = 4;
        user_position_txt = '超级管理员';
        break;
      default:
        break;
    }

    /**
     * 格式化后的当前登录人信息映射
     * @type {object}
     * @property {string} user_name - 当前登录人姓名
     * @property {number} user_position_num - 当前登录人职位的数字表示形式
     * @property {string} user_position_txt - 当前登录人职位的文字表示形式
     * @property {string} user_superior - 当前登录人上级领导的姓名
    */
    userinfo = {
      user_name : userinfo_map.unameS,
      user_position_num : user_position_num,
      user_position_txt : user_position_txt,
      user_superior : userinfo_map.superiorS
    };

    return userinfo;
  };
  // -------------------------- BEGIN UTILITY METHODS -------------------------

  // ---------------------------- BEGIN DOM METHODS ---------------------------

  /**
   * 缓存 DOM 集合
   * @func [setVarMap]
  */
  setVarMap = () => {
    var
      body = varMap.body,
      header = body.querySelector('header'),
      nav = body.querySelector('.ora-nav'),
      main = body.querySelector('.ora-main'),
      main_students =  main.querySelector('.ora-main-students'),
      main_students_top = main.querySelector('.ora-main-students-top'),
      main_students_bottom = main.querySelector('.ora-main-students-bottom'),
      main_performance = main.querySelector('.ora-main-performance'),
      main_chart = main.querySelector('.ora-main-chart'),
      main_sell = main.querySelector('.ora-main-sell'),
      main_permission = main.querySelector('.ora-main-permission'),
      modal = body.querySelector('.modal-collections'),
      modal_personal_data = modal.querySelector('.modal-personal-data'),
      modal_info_panel = modal.querySelector('.modal-info-panel')
    ;

    /**
     * DOM 集合
     * @type {object}
     * @property {element} body - body 元素
     * @property {object} header - header 元素集合
     * @property {element} header.root - header 根元素
     * @property {element} header.user_position - 当前登录人职位
     * @property {element} header.user_superior - 当前登录人上级
     * @property {element} header.user_name - 当前登录人姓名
     * @property {element} header.btn_info - 通知按钮
     * @property {element} header.btn_self - 当前登录人头像及姓名
     * @property {object} nav - 页面左侧导航菜单元素集合
     * @property {element} nav.root - 页面左侧导航菜单根元素
     * @property {element} nav.btn_toggle_menu - 导航菜单切换按钮
     * @property {element} nav.btn_toggle_menu_icon - 导航菜单切换按钮图标
     * @property {object} nav.btn_items - 导航菜单按钮集合
     * @property {object} nav.btn_txts - 导航菜单按钮文字集合
     * @property {object} nav.btn_icons - 导航菜单按钮图表集合
     * @property {object} nav.btn_borders - 导航菜单按钮边框集合
     * @property {element} nav.btn_students - 导航菜单学员管理按钮
     * @property {element} nav.btn_students_icon - 导航菜单学员管理按钮图标元素
     * @property {element} nav.btn_students_txt -  导航菜单学员管理按钮文字元素
     * @property {element} nav.btn_students_border - 导航菜单学员管理按钮边框元素
     * @property {element} nav.btn_performance - 导航菜单业绩管理按钮
     * @property {element} nav.btn_performance_icon - 导航菜单业绩管理按钮图标元素
     * @property {element} nav.btn_performance_txt - 导航菜单业绩管理按钮文字元素
     * @property {element} nav.btn_performance_border - 导航菜单业绩管理按钮边框元素
     * @property {element} nav.btn_chart - 导航菜单业绩图表按钮
     * @property {element} nav.btn_chart_icon - 导航菜单业绩图表按钮图标元素
     * @property {element} nav.btn_chart_txt - 导航菜单业绩图表按钮文字元素
     * @property {element} nav.btn_chart_border - 导航菜单业绩图表按钮边框元素
     * @property {element} nav.btn_sell - 导航菜单销售管理按钮
     * @property {element} nav.btn_sell_icon - 导航菜单销售管理按钮图标元素
     * @property {element} nav.btn_sell_txt - 导航菜单销售管理按钮文字元素
     * @property {element} nav.btn_sell_border - 导航菜单销售管理按钮边框元素
     * @property {element} nav.btn_permission - 导航菜单权限管理按钮
     * @property {element} nav.btn_permission_icon - 导航菜单权限管理按钮图标元素
     * @property {element} nav.btn_permission_txt - 导航菜单权限管理按钮文字元素
     * @property {element} nav.btn_permission_border - 导航菜单权限管理按钮边框元素
     * @property {element} nav.btn_logout_icon - 导航菜单退出按钮图标元素
     * @property {object} main - 页面主体区域元素集合
     * @property {element} main.root - 页面主体区域根元素
     * @property {object} main.modules - 页面主体区域模块元素集合
     * @property {object} main.students - 学员管理模块
     * @property {object} main.students.top - 学员管理模块上半部分元素集合
     * @property {element} main.students.top.root - 学员管理模块上半部分根元素
     * @property {object} main.students.top.left - 学员管理模块上半部分左侧元素集合
     * @property {object} main.students.top.left.root - 学员管理模块上半部分左侧根元素
     * @property {element} main.students.top.left.search - 学员管理模块上半部分左侧搜索模块
     * @property {element} main.students.top.left.btns - 学员管理模块上半部分左侧按钮元素
     * @property {object} main.students.top.right - 学员管理模块上半部分右侧元素集合
     * @property {object} main.students.top.right.root - 学员管理模块上半部分右侧根元素
     * @property {element} main.students.top.right.bangdan - 学员管理模块上半部分右侧榜单元素
     * @property {object} main.students.bottom - 学员管理模块下半部分元素集合
     * @property {element} main.students.bottom.root - 学员管理模块下半部分根元素
     * @property {element} main.students.root - 页面主体区域学员管理模块根元素
     * @property {object} main.performance - 页面主体区域业绩管理模块
     * @property {element} main.performance.root - 页面主体区域业绩管理模块根元素
     * @property {object} main.chart - 页面主体区域业绩图表模块
     * @property {element} main.chart.root - 页面主体区域业绩图表模块根元素
     * @property {object} main.sell - 页面主体区域销售管理模块
     * @property {element} main.sell.root - 页面主体区域销售管理模块根元素
     * @property {object} main.permission - 页面主体区域权限管理模块
     * @property {element} main.permission.root - 页面主体区域权限管理模块根元素
     * @property {element} modal.root - 模态框跟元素
     * @property {object} modal - 模态框元素集合
     * @property {object} modal.personal_data - 个人资料模态框元素集合
    */
    varMap = {
      body : body,
      header : {
        root : header,
        user_position : header.querySelector('.header-position'),
        user_superior : header.querySelector('.header-superior'),
        user_name : header.querySelector('.header-self-name'),
        btn_info : header.querySelector('.header-self-information'),
        btn_self : header.querySelector('.header-self-avatar_name')
      },
      nav : {
        root : nav,
        btn_toggle_menu : nav.querySelector('.ora-nav-btn-toggle'),
        btn_toggle_menu_icon : nav.querySelector('.ora-nav-btn-toggle-icon'),
        btn_items : nav.querySelectorAll('.ora-nav-btn-item'),
        btn_txts : nav.querySelectorAll('.ora-nav-btn-txt'),
        btn_icons : nav.querySelectorAll('.ora-nav-btn-icons'),
        btn_borders : nav.querySelectorAll('.ora-nav-btn-item-border'),
        btn_students : nav.querySelector('.ora-nav-btn-students'),
        btn_students_icon : nav.querySelector('.ora-nav-btn-students-icon'),
        btn_students_txt : nav.querySelector('.ora-nav-btn-students-txt'),
        btn_students_border : nav.querySelector('.ora-nav-btn-students-border'),
        btn_performance : nav.querySelector('.ora-nav-btn-performance'),
        btn_performance_icon : nav.querySelector('.ora-nav-btn-performance-icon'),
        btn_performance_txt : nav.querySelector('.ora-nav-btn-performance-txt'),
        btn_performance_border : nav.querySelector('.ora-nav-btn-performance-border'),
        btn_chart : nav.querySelector('.ora-nav-btn-chart'),
        btn_chart_icon : nav.querySelector('.ora-nav-btn-chart-icon'),
        btn_chart_txt : nav.querySelector('.ora-nav-btn-chart-txt'),
        btn_chart_border : nav.querySelector('.ora-nav-btn-chart-border'),
        btn_sell : nav.querySelector('.ora-nav-btn-sell'),
        btn_sell_icon : nav.querySelector('.ora-nav-btn-sell-icon'),
        btn_sell_txt : nav.querySelector('.ora-nav-btn-sell-txt'),
        btn_sell_border : nav.querySelector('.ora-nav-btn-sell-border'),
        btn_permission : nav.querySelector('.ora-nav-btn-permission'),
        btn_permission_icon : nav.querySelector('.ora-nav-btn-permission-icon'),
        btn_permission_txt : nav.querySelector('.ora-nav-btn-permission-txt'),
        btn_permission_border : nav.querySelector('.ora-nav-btn-permission-border'),
        btn_logout : nav.querySelector('.ora-nav-logout'),
        btn_logout_icon : nav.querySelector('.ora-nav-logout-icon'),
        btn_logout_txt : nav.querySelector('.ora-nav-logout-txt')
      },
      main : {
        root : main,
        modules : main.querySelectorAll('.ora-main-module'),
        students : {
          root : main_students,
          top : {
            root : main_students_top,
            left : {
              root : main_students_top.querySelector('.ora-main-students-top-left'),
              search : main_students_top.querySelector('.ora-main-students-top-left-search'),
              btns : main_students_top.querySelector('.ora-main-students-top-left-btns')
            },
            right : {
              root : main_students_top.querySelector('.ora-main-students-top-right'),
              bangdan : main_students_top.querySelector('.ora-main-students-top-right-bangdan')
            }
          },
          bottom : {
            root : main_students_bottom
          }
        },
        performance : {
          root : main_performance
        },
        chart : {
          root : main_chart
        },
        sell : {
          root : main_sell
        },
        permission : {
          root : main_permission
        }
      },
      modal : {
        root : modal,
        personal_data : {
          root : modal_personal_data,
          btn_close : modal_personal_data.querySelector('.modal-box-close')
        },
        info_panel : {
          root :modal_info_panel,
          title : modal_info_panel.querySelector('.modal-box-title'),
          btn_close : modal_info_panel.querySelector('.modal-box-close'),
          content : modal_info_panel.querySelector('.modal-box-content')
        }
      }
    };
  };
  // End DOM method /setJqueryMap/

  /**
   * 渲染页面头部信息
   * @func [renderHeaderContent]
   * @param {Object} userinfo_map - 当前登录人信息映射
   * @property {string} user_name - 当前登录人姓名
   * @property {number} user_position_num - 当前登录人职位的数字表示形式
   * @property {string} user_position_txt - 当前登录人职位的文字表示形式
   * @property {string} user_superior - 当前登录人上级领导的姓名
  */
  renderHeaderContent = userinfo_map => {
    /** 格式化后的当前登录人信息映射 */
    var userinfo_map  = formatUserInfo(userinfo_map);

    // 渲染当前登录人职位
    varMap.header.user_position.textContent = userinfo_map.user_position_txt;

    // 渲染当前登录人上级领导姓名
    if (userinfo_map.user_superior === '无') {
     varMap.header.user_superior.style.display = 'none';
    } else {
     varMap.header.user_superior
       .textContent = '上级 : ' + userinfo_map.user_superior;
    }

    // 渲染当前的登录人姓名
    varMap.header.user_name.textContent = userinfo_map.user_name
  };

  /**
   * 展开或收起页面头部通知面板
   * @func [toggleInfoPanel]
   * @param {object} arg_map
   * @param {boolean} arg_map.is_close - 当值为 true 时, 通知面板处于关闭状态
   * @param {boolean} arg_map.is_close - 当值为 false 时, 通知面板处于打开状态
  */
  toggleInfoPanel = (arg_map) => {
    var
      target = event.target || window.event.target,
      is_close = arg_map.is_close,
      infoPanelModal = new Modal($(varMap.modal.info_panel.root), {
        width : 584,
        height : 300,
        titleHeight : 40
      })
    ;

    return () => {
      if (is_close) {
        /** 显示通知面板模态框 */
        infoPanelModal.showModal();

        varMap.modal.info_panel.root
          .setAttribute('data-is_close', 'false');

        return true;
      }

      /** 隐藏通知面板模态框 */
      infoPanelModal.hideModal();
      varMap.modal.info_panel.root
        .setAttribute('data-is_close', 'true');
    };
  };
  /**
   * 通知面板模态框切换标签及内容
   * @func [toggleInfoPanel.toggleTC]
  */
  toggleInfoPanel.toggleTC = () => {
    var
      target = event.target || window.event.target,
      title = varMap.modal.info_panel.title,
      content = varMap.modal.info_panel.content,
      tab_one = title.querySelector('.tab-one'),
      tab_two = title.querySelector('.tab-two'),
      content_one = content.querySelector('.content-one'),
      content_two = content.querySelector('.content-two'),
      activeTab, activeContent
    ;

    /** 切换标签 */
    toggleTab = arg_map => {
      var
        active_tab = arg_map.active_tab,
        normal_tab = arg_map.normal_tab
      ;

      /** 激活标签 */
      active_tab.classList.add('active');
      /** 标签默认样式 */
      normal_tab.classList.remove('active');
    };

    /** 切换内容 */
    toggleContent = arg_map => {
      var
        active_content = arg_map.active_content,
        normal_content = arg_map.normal_content
      ;

      /** 激活内容区 */
      active_content.classList.remove('hidden');
      /** 隐藏内容区 */
      normal_content.classList.add('hidden');
    };

    switch (target) {
      case tab_one :  /** 标签一 */
        toggleTab({ active_tab : tab_one, normal_tab : tab_two });
        toggleContent({ active_content : content_one, normal_content : content_two });
        break;
      case tab_two :  /** 标签二 */
        toggleTab({ active_tab : tab_two, normal_tab : tab_one });
        toggleContent({ active_content : content_two, normal_content : content_one });
        break;
      default:
        break;
    }
  };

  /**
   * 渲染当前登录人个人信息(模态框)
   * @func [renderPersonalData]
  */
  renderPersonalData = modal_state => {
    var
      /** 个人资料模态框 */
      personalDataModal
    ;

    personalDataModal = new Modal($('.modal-personal-data'), {
      width       : 920,
      height      : 750,
      titleHeight : 50
    });

    personalDataModal.showModal();
  };

  /**
   * 关闭个人资料模态框
   * @func [closePersonalDataModal]
  */
  closePersonalDataModal = () => {
    var personalDataModal = new Modal($(varMap.modal.personal_data.root), {
      width       : 920,
      height      : 750,
      titleHeight : 50
    });
    personalDataModal.hideModal();
  };

  /**
  * 展开或收起页面左侧导航菜单
  * @func [toggleNav]
  */
  toggleNav = () => {
    var
      nav_width = varMap.nav.root.clientWidth,
      is_open = nav_width === configMap.nav.px_extend_width,
      is_close = nav_width === configMap.nav.px_retract_width,
      is_sliding = !is_open && !is_close
    ;

    /** 避免竞争条件 */
    if (is_sliding) { return false; }

    /** 收起导航菜单 */
    if (is_open) {
      /** 导航菜单切换按钮样式 */
      varMap.nav.btn_toggle_menu_icon.classList.add('rotate');
      /** 导航菜单根元素 */
      $(varMap.nav.root).animate(
        { 'width' : configMap.nav.px_retract_width },
        configMap.nav.retract_time
      );
      /** 导航菜单按钮文本元素 */
      $(varMap.nav.btn_txts).animate(
        { 'width' : configMap.nav.px_txt_retract_width, 'opacity' : 0 },
        configMap.nav.retract_time
      );
      /** 导航菜单按钮图标元素 */
      $(varMap.nav.btn_icons).css(
        { 'margin-right' : configMap.nav.px_icon_retract_marginRight },
        configMap.nav.retract_time
      );
      /** 导航菜单退出按钮图标元素 */
      $(varMap.nav.btn_logout_icon).css(
        { 'margin-right' : configMap.nav.px_icon_retract_marginRight },
        configMap.nav.retract_time
      );
      /** 页面主体区域根元素 */
      $(varMap.main.root).animate(
        { 'margin-left' : configMap.main.px_retract_marginLeft },
        configMap.main.retract_time
      );

      return true;
    }

    /** 展开导航菜单 */
    /** 导航菜单切换按钮样式 */
    varMap.nav.btn_toggle_menu_icon.classList.remove('rotate');
    /** 导航菜单根元素 */
    $(varMap.nav.root).animate(
      { 'width' : configMap.nav.px_extend_width },
      configMap.nav.extend_time
    );
    /** 导航菜单按钮文本元素 */
    $(varMap.nav.btn_txts).animate(
      { 'width' : configMap.nav.px_txt_extend_width, 'opacity' : 1 },
      configMap.nav.extend_time
    );
    /** 导航菜单按钮图标元素 */
    $(varMap.nav.btn_icons).css(
      { 'margin-right' : configMap.nav.px_icon_extend_marginRight }
    );
    /** 导航菜单退出按钮图标元素 */
    $(varMap.nav.btn_logout_icon).css(
      { 'margin-right' : configMap.nav.px_icon_extend_marginRight },
      configMap.nav.extend_time
    );
    /** 页面主体区域根元素 */
    $(varMap.main.root).animate(
      { 'margin-left' : configMap.main.px_extend_marginLeft },
      configMap.main.extend_time
    );

    return true;
  };

  /**
   * 页面跳转
   * @func [pageJump]
   * @param {Object} event - MouseEvent 对象
  */
  pageJump = event => {
    var
      target = event.target || window.event.target,  /** 目标元素 */
      removeStyle, addStyle, toggleModule, i
    ;

    /**
     * 移除导航菜单按钮的激活样式
    */
    removeStyle = function () {
      for (var i = 0; i < varMap.nav.btn_borders.length; i++) {
        /** 导航菜单按钮根元素恢未激活的样式 */
        varMap.nav.btn_items[i].classList.remove('active');
        /** 导航菜单按钮图标元素恢复未激活的样式 */
        varMap.nav.btn_icons[i].classList.remove('active');
        /** 导航菜单按钮边框恢复未激活的样式 */
        varMap.nav.btn_borders[i].classList.remove('active');
      }
    };

    /**
     * 导航菜单按钮添加激活的样式
     * @func [addStyle]
     * @param {Object} selector_map
     * @param {property} selector_map.item - 导航菜单按钮元素
     * @param {property} selector_map.icon - 导航菜单按钮图标元素
     * @param {property} selector_map.border - 导航菜单按钮边框元素
    */
    addStyle = function (selector_map) {
      var
        item = selector_map.item,
        icon = selector_map.icon,
        border = selector_map.border
      ;

      /** 导航菜单按钮元素激活的样式 */
      item.classList.add('active');
      /** 导航菜单按钮图标元素激活的样式 */
      icon.classList.add('active');
      /** 导航菜单按钮图标的平铺样式 */
      icon.style.backgroundRepeat = configMap.nav.btn_icon.icon_repeat;
      /** 导航菜单按钮边框元素激活的样式 */
      border.classList.add('active');
    };

    /**
     * 隐藏页面主体区域各个模块, 显示当前模块
     * @func [toggleModule]
     * @param {object} selector_map
     * @param {element} selector_map.module - 页面主体区域模块根元素
    */
    toggleModule = function (selector_map) {
      var module = selector_map.module, j;

      /** 隐藏模块 */
      for (var j = 0; j < varMap.main.modules.length; j++) {
        varMap.main.modules[j].classList.add('hidden');
      }

      /** 显示当前模块 */
      module.classList.remove('hidden');
    };

    switch (target) {
      case varMap.nav.btn_toggle_menu :  /** 切换按钮 */
        break;
      case varMap.nav.btn_toggle_menu_icon : /** 切换按钮 */
        break;
      case varMap.nav.btn_students :  /** 学员管理按钮 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_students,
          icon : varMap.nav.btn_students_icon,
          border : varMap.nav.btn_students_border
        });
        toggleModule({ module : varMap.main.students.root });
        break;
      case varMap.nav.btn_students_icon :  /** 学员管理按钮图标 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_students,
          icon : varMap.nav.btn_students_icon,
          border : varMap.nav.btn_students_border
        });
        toggleModule({ module : varMap.main.students.root });
        break;
      case varMap.nav.btn_students_txt :  /** 学员管理按钮文字 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_students,
          icon : varMap.nav.btn_students_icon,
          border : varMap.nav.btn_students_border
        });
        toggleModule({ module : varMap.main.students.root });
        break;
      case varMap.nav.btn_students_border :  /** 学员管理按钮边框 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_students,
          icon : varMap.nav.btn_students_icon,
          border : varMap.nav.btn_students_border
        });
        toggleModule({ module : varMap.main.students.root });
        break;
      case varMap.nav.btn_performance :  /** 业绩管理按钮 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_performance,
          icon : varMap.nav.btn_performance_icon,
          border : varMap.nav.btn_performance_border
        });
        toggleModule({ module : varMap.main.performance.root });
        break;
      case varMap.nav.btn_performance_txt :  /** 业绩管理按钮图标 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_performance,
          icon : varMap.nav.btn_performance_icon,
          border : varMap.nav.btn_performance_border
        });
        toggleModule({ module : varMap.main.performance.root });
        break;
      case varMap.nav.btn_performance_icon :  /** 业绩管理按钮文字 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_performance,
          icon : varMap.nav.btn_performance_icon,
          border : varMap.nav.btn_performance_border
        });
        toggleModule({ module : varMap.main.performance.root });
        break;
      case varMap.nav.btn_performance_border :  /** 业绩管理按钮边框 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_performance,
          icon : varMap.nav.btn_performance_icon,
          border : varMap.nav.btn_performance_border
        });
        toggleModule({ module : varMap.main.performance.root });
        break;
      case varMap.nav.btn_chart :  /** 业绩图表按钮 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_chart,
          icon : varMap.nav.btn_chart_icon,
          border : varMap.nav.btn_chart_border
        });
        toggleModule({ module : varMap.main.chart.root });
        break;
      case varMap.nav.btn_chart_icon :  /** 业绩图表按钮图标 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_chart,
          icon : varMap.nav.btn_chart_icon,
          border : varMap.nav.btn_chart_border
        });
        toggleModule({ module : varMap.main.chart.root });
        break;
      case varMap.nav.btn_chart_txt :  /** 业绩图表按钮文字 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_chart,
          icon : varMap.nav.btn_chart_icon,
          border : varMap.nav.btn_chart_border
        });
        toggleModule({ module : varMap.main.chart.root });
        break;
      case varMap.nav.btn_chart_border :  /** 业绩图表按钮边框 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_chart,
          icon : varMap.nav.btn_chart_icon,
          border : varMap.nav.btn_chart_border
        });
        toggleModule({ module : varMap.main.chart.root });
        break;
      case varMap.nav.btn_sell :  /** 销售管理按钮 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_sell,
          icon : varMap.nav.btn_sell_icon,
          border : varMap.nav.btn_sell_border
        });
        toggleModule({ module : varMap.main.sell.root });
        break;
      case varMap.nav.btn_sell_icon :  /** 销售管理按钮图标 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_sell,
          icon : varMap.nav.btn_sell_icon,
          border : varMap.nav.btn_sell_border
        });
        toggleModule({ module : varMap.main.sell.root });
        break;
      case varMap.nav.btn_sell_txt :  /** 销售管理按钮文字 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_sell,
          icon : varMap.nav.btn_sell_icon,
          border : varMap.nav.btn_sell_border
        });
        toggleModule({ module : varMap.main.sell.root });
        break;
      case varMap.nav.btn_sell_border :  /** 销售管理按钮边框 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_sell,
          icon : varMap.nav.btn_sell_icon,
          border : varMap.nav.btn_sell_border
        });
        toggleModule({ module : varMap.main.sell.root });
        break;
      case varMap.nav.btn_permission :  /** 权限管理按钮 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_permission,
          icon : varMap.nav.btn_permission_icon,
          border : varMap.nav.btn_permission_border
        });
        toggleModule({ module : varMap.main.permission.root });
        break;
      case varMap.nav.btn_permission_icon :  /** 权限管理按钮图标 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_permission,
          icon : varMap.nav.btn_permission_icon,
          border : varMap.nav.btn_permission_border
        });
        toggleModule({ module : varMap.main.permission.root });
        break;
      case varMap.nav.btn_permission_txt :  /** 权限管理按钮文字 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_permission,
          icon : varMap.nav.btn_permission_icon,
          border : varMap.nav.btn_permission_border
        });
        toggleModule({ module : varMap.main.permission.root });
        break;
      case varMap.nav.btn_permission_border :  /** 权限管理按钮边框 */
        removeStyle();
        addStyle({
          item : varMap.nav.btn_permission,
          icon : varMap.nav.btn_permission_icon,
          border : varMap.nav.btn_permission_border
        });
        toggleModule({ module : varMap.main.permission.root });
        break;
      case varMap.nav.btn_logout :  /** 退出账号按钮 */
        console.log('退出账号');
        break;
      case varMap.nav.btn_logout_icon :  /** 退出账号按钮图标 */
        console.log('退出账号');
        break;
      case varMap.nav.btn_logout_txt :  /** 退出账号按钮文字 */
        console.log('退出账号');
        break;
      default:
        break;
    }
  };


  // ----------------------------- END DOM METHODS ----------------------------




  // -------------------------- BEGIN EVENT HANDLERS --------------------------
  /**
   * 点击事件监听/处理程序
   * @func [onClick]
  */
  onClick = () => {
    /** 打开页面头部通知面板按钮 */
    varMap.header.btn_info.addEventListener(
      'click', toggleInfoPanel({ is_close : true }), false
    );
    /** 关闭页面头部通知面板按钮 */
    varMap.modal.info_panel.btn_close.addEventListener(
      'click', toggleInfoPanel({ is_close : false }), false
    );
    /** 点击通知面板模态框中的标签 */
    varMap.modal.info_panel.title.addEventListener(
      'click', toggleInfoPanel.toggleTC, false
    );

    /** 页面头部个人资料按钮 */
    varMap.header.btn_self.addEventListener('click', renderPersonalData, false);
    /** 关闭个人资料模态框的按钮 */
    varMap.modal.personal_data.btn_close
      .addEventListener('click', closePersonalDataModal, false);

    /** 展开或收起页面左侧导航按钮 */
    varMap.nav.btn_toggle_menu.addEventListener('click', toggleNav, false);

    /** 页面跳转 - 业绩管理按钮(导航菜单) */
    // console.log(varMap.nav.btn_items);
    varMap.nav.root.addEventListener('click', pageJump, false);
  };
  // --------------------------- END EVENT HANDLERS ---------------------------




  /** Initializes module */
  initModule = (function (window) {
    var body = document.querySelector('body');

    varMap.body = body;

    /** 缓存 DOM 集合 */
    setVarMap();
    /** 渲染页面头部信息 */
    renderHeaderContent(userinfo_map);
    /** 点击事件监听/处理程序 */
    onClick();

    console.log(varMap);

  }(window));

}));
