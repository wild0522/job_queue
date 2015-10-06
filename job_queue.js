	/**
	 * 工作 Queue (可以將 queue restart)
	 * @author Benson
	 * @version 1.0
	 * @param jqueryObject obj 要綁定的 Queue物件(可以是任何 el)
	 * @param string name Queue 名稱
	 * @returns void
	 */
	function job_queue()
	{
		var _obj = null;
		var _name = '';
		var func_first = null;
		var func_first_mapping = null;
		
		var func_last = null;
		var func_last_mapping = null;
		
		var list_func = [];
		var list_func_mapping = [];
		
		var run_num = 0;
		
		this.init = function(obj, name)
		{
			_obj = obj;
			_name = name;
		};
		
		/**
		 * 註冊 Queue (Queue執行中，不會有效果)
		 * @param function func 要加入Queue的Function
		 * @returns void
		 */
		this.reg = function(func, id)
		{
			if(typeof func !== 'function')
			{
				return false;
			}
			list_func.push(func);
			list_func_mapping.push($.trim(id));
		};

		/**
		 * 註冊為第一個 Queue (Queue執行中，不會有效果)
		 * @param function func 要加入Queue的Function
		 * @returns void
		 */
		this.reg_first = function(func, id)
		{
			if(typeof func !== 'function')
			{
				return false;
			}
			func_first = func;
			func_first_mapping = id;
		};
		
		/**
		 * 註冊為最後一個 Queue (Queue執行中，不會有效果)
		 * @param function func 要加入Queue的Function
		 * @returns void
		 */
		this.reg_last = function(func, id)
		{
			if(typeof func !== 'function')
			{
				return false;
			}
			func_last = func;
			func_last_mapping = id;
		};
		
		/**
		 * 執行下一個 Queue
		 * @returns void
		 */
		this.next = function()
		{
			if(run_num > _length())
			{
				run_num = 0;
			}
			
			//未出始
			if(run_num === 0)
			{
				_obj.clearQueue(_name);
				_obj.queue(_name, func_first);
				for(var i=0; i<list_func.length;i++)
				{
					_obj.queue(_name, list_func[i]);
				}
				_obj.queue(_name, func_last);
				_obj.queue(_name, function(){
					run_num = 0;
					_obj.clearQueue();
				});
			}
			run_num++;
			//執行
			_obj.dequeue(_name);
		};

		/**
		 * 刪除指定 queue
		 * @param string id
		 */
		this.remove = function(id)
		{
			if(func_first_mapping === id)
			{
				func_first = null;
				return true;
			}

			if(func_last_mapping === id)
			{
				func_last = null;
				return true;
			}
			
			for(i in list_func_mapping)
			{
				if(list_func_mapping[i] === id)
				{
					list_func.splice(i, 1);
				}
			}
		};

		/**
		 * 清空並停止 Queue
		 * @returns void
		 */
		this.clear = function()
		{
			run_num = 0;
			_obj.clearQueue(_name);
		};

		/**
		 * 計算總 queue 數
		 * @returns int
		 */
		this.length = function()
		{
			return _length();
		};
		
		/**
		 * 計算總 queue 數
		 * @access private
		 * @returns int
		 */
		function _length()
		{
			var leng = list_func.length;
			
			if(typeof func_first === 'function')
			{
				leng++;
			}
			
			if(typeof func_last === 'function')
			{
				leng++;
			}
			
			return leng;        
		}

		/**
		 * 是否為最後一個 queue
		 * @returns boolean
		 */
		this.is_last = function()
		{
			return _obj.queue(_name).length === 1 && run_num === _length();
		};
		
		/**
		 * 目前已執行的 job 流水號
		 * @returns int
		 */
		this.number = function()
		{
			return run_num;
		};
	}
