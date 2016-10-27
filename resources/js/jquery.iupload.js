/**
 * @author pengpeng
 */
(function($){
	
	var delegate = {
		
		randomID : function(){
			var returnVal = '';
			var _alphArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
			for(var i = 0; i < 8; i++){
				returnVal = _alphArray[Math.floor(Math.random() * _alphArray.length)] + returnVal;
			}
			return returnVal;
		},
			
		/**
		 * 初始化组件
		 */
		initComponent: function(options){
			options = $.extend({}, $.fn.iupload.defaults, options);
			options = $.meta ? $.extend({}, options, this.data()) : options;
			this.data("options", options);
			
			delegate.initOptions.call(this);
			delegate._render.call(this);
			delegate._bindEvent.call(this);
		},
		/**
		 * 初始化设置
		 */
		initOptions: function(){
			var options = this.data("options");
			if(typeof(options.beforeInit) == 'function'){
				options.beforeInit.call(this, options);
			}
			var $file = this.children("input[type='file']");
			if($file.length){
				options.disabled = options.disabled || this.hasClass(options.iuploadBtnReadonlyClass) || $file[0].disabled;
				options.readonly = options.disabled ? false : (options.readonly || this.hasClass(options.iuploadBtnDisabledClass) || $file[0].readonly);
				
				if(options.uploadForm){
					if(typeof(options.uploadForm) == 'string'){
						options.uploadForm = $("#" + options.uploadForm);
					}else{
						options.uploadForm = $(options.uploadForm);
					}
					if(options.uploadForm.find("input[type='hidden'][name='uploadSerialNo']").length == 0){
						options.uploadForm.append('<input type="hidden" name="uploadSerialNo"/>');
					}
				}else{
					$.error("'uploadForm' config not found!");
				}
				if(this.attr("data-uploadlist")){ //已上传图片列表
					options.uploadList = this.attr("data-uploadlist");
				}
				if(options.uploadList){
					if(typeof(options.uploadList) == 'string'){
						options.uploadList = $("#" + options.uploadList);
					}else{
						options.uploadList = $(options.uploadList);
					}
				}
			}else{
				$.error("No <input type='file'/> field found!");
			}
		},
		/**
		 * 组件渲染
		 * @returns
		 */
		_render: function(){
			var options = this.data("options");
			var $file = this.children("input[type='file']");
			//this.addClass($.fui.defaults.componentClass);
			
			if(options.disabled){
				$file[0].disabled = false;
				$file.css("display", "none");
			}
			
			options.id = delegate.randomID();
			$file.attr("id", options.uploadFileIdPrefix + options.id);
			this.attr("id", options.uploadBtnIdPrefix + options.id);
			options.createUploadList.call(this);
			
			this.toggleClass($.fn.iupload.defaults.iuploadBtnReadonlyClass, options.readonly);
			this.toggleClass($.fn.iupload.defaults.iuploadBtnDisabledClass, options.disabled);
			
			options.reset = delegate.reset;
			
			if(typeof(options.afterInit) == 'function'){
				options.afterInit.call(this, options);
			}
		},
		/**
		 * 给组件绑定click事件
		 */
		_bindEvent: function(){
			var $this = this;
			this.children("input[type='file']").bind({
				"change": function(){
					var $file = $(this);
					var options = $this.data("options");
					if(options.disabled || options.readonly){
						return;
					}
					var originalFileName = $.trim($file.val());
					if(originalFileName){
						var fileName = originalFileName.toLowerCase();
						var suffix = fileName.substring(fileName.lastIndexOf('.') + 1);
						var formats = "," + options.imageFormats.join(",") + ",";
						if(formats.indexOf("," + suffix + ",") != -1){
							var $uploadBoxList = $("#" + options.uploadListIdPrefix + options.id);
							if(options.maxUpload > 1){
								if($uploadBoxList.children("div").length >= options.maxUpload){
									alert("对不起,最多只能上传" + options.maxUpload + "个图片!");
									delegate.reset.call($this);
									return;
								}
							}
							var uploadSerialNo = delegate.randomID();
							options.uploadForm.find("input[type='hidden'][name='uploadSerialNo']").val(uploadSerialNo);
							$file.appendTo(options.uploadForm);
							options.uploadForm.attr("target", options.uploadIframeNamePrefix + uploadSerialNo);
							options.createUploadBox.call($this, $uploadBoxList, uploadSerialNo);
							var $uploadBox = $("#" + uploadSerialNo);
							if(options.moveable){
								$uploadBox.find("." + options.uploadMoveLeftClass).bind({
									"click": function(){
										var $item = $(this).closest("." + options.iuploadBoxClass);
										$item.insertBefore($item.prev("." + options.iuploadBoxClass));
									}
								});
								$uploadBox.find("." + options.uploadMoveRightClass).bind({
									"click": function(){
										var $item = $(this).closest("." + options.iuploadBoxClass);
										$item.insertAfter($item.next("." + options.iuploadBoxClass));
									}
								});
							}
							$uploadBox.attr("data-iuploadbtn-id", options.uploadBtnIdPrefix + options.id);
							if(options.beforeUpload.call($this, $uploadBox, uploadSerialNo)){
								$uploadBox.find("a > i").bind({
									"click": function(){
										options.onUploadBoxRemove.call($this, $uploadBox, $(this));
									}
								});
								setTimeout(function(){
									options.uploadForm.submit();
									delegate.reset.call($this);
								}, 1000);
							}else{
								delegate.reset.call($this);
							}
						}else{
							alert("上传图片格式必须是" + options.imageFormats + "中的一种!");
							delegate.reset.call($this);
							return;
						}
					}
				}
			});
		},
		/**
		 * 重置组件
		 */
		reset: function(){
			var options = this.data("options");
			var $file = this.children("input[type='file']");
			if($file.length){
				$file.appendTo(options.uploadForm);
			}
			options.uploadForm[0].reset();
			$file = options.uploadForm.find("input[type='file']");
			$file.appendTo(this);
		}
	};
	
	$.fn.iupload = function(method){
		// Method calling logic
		if (delegate[method] && method.charAt(0) != '_' && method.indexOf("init") != 0) {
			return delegate[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return this.each(function(){
				delegate.initComponent.call($(this), method);
			});
		} else {
			$.error('Method ' +  method + ' does not exist on jquery.iupload');
		}
	};
	
	/**
	 * 组件默认配置
	 */
	$.fn.iupload.defaults = $.extend({}, {
		/**
		 * 上传组件按钮的样式class
		 */
		iuploadBtnClass: "fui-iupload-btn",
		/**
		 * 上传组件列表的样式class
		 */
		iuploadListClass: "fui-iupload-list",
		/**
		 * 上传组件列表的额外样式class,用于特殊化列表的样式
		 */
		iuploadListExtClass: null,
		/**
		 * 上传组件列表中图片预览box样式
		 */
		iuploadBoxClass: "fui-iupload-box",
		/**
		 * 上传组件按钮readonly样式class
		 */
		iuploadBtnReadonlyClass: "fui-iupload-btn-readonly",
		/**
		 * 上传组件按钮disabled样式class
		 */
		iuploadBtnDisabledClass: "fui-iupload-btn-disabled",
		/**
		 * 正在上传的loading样式
		 */
		uploadingClass: "fui-iupload-uploading",
		/**
		 * 上传出错的样式
		 */
		uploadErrorClass: "fui-iupload-error",
		/**
		 * 图片列表前后移动样式
		 */
		uploadMoveClass: "fui-iupload-move",
		/**
		 * 图片列表前后移动样式
		 */
		uploadMoveLeftClass: "fui-iupload-move-left",
		/**
		 * 图片列表前后移动样式
		 */
		uploadMoveRightClass: "fui-iupload-move-right",
		/**
		 * 组件是否可以点击,如<div class="fui-iupload-btn fui-iupload-btn-readonly">
		 */
		readonly: false,
		/**
		 * 组件是否可用,如<div class="fui-iupload-btn fui-iupload-btn-disabled">
		 */
		disabled: false,
		/**
		 * 已上传的文件是否可以删除?
		 */
		removeable: true,
		/**
		 * 图片是否可以前后移动
		 */
		moveable: false,
		/**
		 * 删除时予以提醒?
		 */
		confirmOnRemove: false,
		/**
		 * 最多允许上传几个文件,0或负数表示不限制
		 */
		maxUpload: 0,
		/**
		 * 上传所允许的图片类型
		 */
		imageFormats: ["jpg", "jpeg", "png"],
		/**
		 * 上传图片的按钮的id前缀
		 */
		uploadBtnIdPrefix: "fui-iupload-btn-",
		/**
		 * 上传文件的<input type='file'/>域的id前缀
		 */
		uploadFileIdPrefix: "fui-iupload-file-",
		/**
		 * 上传图片的图片预览列表的id前缀
		 */
		uploadListIdPrefix: "fui-iupload-list-",
		/**
		 * 上传的文件的form的target的id前缀,后缀则是上传批次号uploadSerialNo
		 */
		uploadIframeNamePrefix: "fui-iupload-iframe-",
		/**
		 * 上传图片的图片预览列表,
		 * 值可以是dom对象,jquery对象或id
		 */
		uploadList: null,
		/**
		 * 上传form,初始值可以是<form/>的dom对象,jquery对象或<form/>的id
		 */
		uploadForm: null,
		/**
		 * 组件初始化结束后调用
		 * @param options
		 */
		afterInit: function(options){},
		/**
		 * 创建上传文件预览列表的div
		 */
		createUploadList: function(){
			var options = this.data("options");
			var $this = this;
			if(options.uploadList){
				options.uploadList.addClass(options.iuploadListClass);
				options.uploadList.addClass(options.iuploadListExtClass);
				options.uploadList.attr("id", options.uploadListIdPrefix + options.id);
				options.uploadList.find("." + options.iuploadBoxClass + " > a > i").bind({
					"click": function(){
						var el = $(this);
						options.onUploadBoxRemove.call($this, el.closest("." + options.iuploadBoxClass), el);
					}
				});
				if(options.moveable){
					options.uploadList.find("." + options.iuploadBoxClass + " ." + options.uploadMoveLeftClass).bind({
						"click": function(){
							var $item = $(this).closest("." + options.iuploadBoxClass);
							$item.insertBefore($item.prev("." + options.iuploadBoxClass));
						}
					});
					options.uploadList.find("." + options.iuploadBoxClass + " ." + options.uploadMoveRightClass).bind({
						"click": function(){
							var $item = $(this).closest("." + options.iuploadBoxClass);
							$item.insertAfter($item.next("." + options.iuploadBoxClass));
						}
					});
				}
			}else{
				var html = '<div id="' + options.uploadListIdPrefix + options.id + '" class="' + options.iuploadListClass + (options.iuploadListExtClass ? ' ' + options.iuploadListExtClass : '') + '"></div>';
				this.before(html);
			}
		},
		/**
		 * 创建上传图片的预览box
		 * @param $uploadBoxList 上传预览列表
		 * @param uploadSerialNo 本次上传序列号
		 */
		createUploadBox: function($uploadBoxList, uploadSerialNo){
			var options = this.data("options");
			var html = '<div class="' + options.iuploadBoxClass + '" id="' + uploadSerialNo + '">'
							+ '<a class="' + options.uploadingClass + '" href="javascript:;"><i title="删除"></i></a>'
							+ (options.moveable ? '<div class="' + options.uploadMoveClass + '"><a class="' + options.uploadMoveLeftClass + '" href="javascript:;">&nbsp;</a><a class="' + options.uploadMoveRightClass + '" href="javascript:;">&nbsp;</a></div>' : '')
							+ '<iframe id="' + options.uploadIframeNamePrefix + uploadSerialNo + '" name="' + options.uploadIframeNamePrefix + uploadSerialNo + '" style="display:none;"></iframe>'
					 + '</div>';
			if(options.maxUpload == 1){
				$uploadBoxList.html(html);
			}else{
				$uploadBoxList.append(html);
			}
			
		},
		/**
		 * @param $uploadBox 已创建的图片的预览box
		 * @param uploadSerialNo 上传序列号 
		 * @return true:会真正触发form.submit来上传数据,false取消上传
		 */
		beforeUpload: function($uploadBox, uploadSerialNo){
			return true;
		},
		/**
		 * @param $uploadBox 上传文件后的相应预览box
		 * @param $removeElement 删除图标[X]元素
		 */
		onUploadBoxRemove: function($uploadBox, $removeElement){
			$uploadBox.remove();
		},
		/**
		 * 上传结果回调函数
		 * @param $uploadBox 上传文件后的相应预览box
		 * @param resultObj 上传结果对象
		 */
		uploadCallback: function($uploadBox, resultObj){
			alert("'uploadCallback' function must be specified!");
		}
	});
})(jQuery);