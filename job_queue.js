	/**
	 * �u�@ Queue (�i�H�N queue restart)
	 * @author Benson
	 * @version 1.0
	 * @param jqueryObject obj �n�j�w�� Queue����(�i�H�O���� el)
	 * @param string name Queue �W��
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
		 * ���U Queue (Queue���椤�A���|���ĪG)
		 * @param function func �n�[�JQueue��Function
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
		 * ���U���Ĥ@�� Queue (Queue���椤�A���|���ĪG)
		 * @param function func �n�[�JQueue��Function
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
		 * ���U���̫�@�� Queue (Queue���椤�A���|���ĪG)
		 * @param function func �n�[�JQueue��Function
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
		 * ����U�@�� Queue
		 * @returns void
		 */
		this.next = function()
		{
			if(run_num > _length())
			{
				run_num = 0;
			}
			
			//���X�l
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
			//����
			_obj.dequeue(_name);
		};

		/**
		 * �R�����w queue
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
		 * �M�Ũð��� Queue
		 * @returns void
		 */
		this.clear = function()
		{
			run_num = 0;
			_obj.clearQueue(_name);
		};

		/**
		 * �p���` queue ��
		 * @returns int
		 */
		this.length = function()
		{
			return _length();
		};
		
		/**
		 * �p���` queue ��
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
		 * �O�_���̫�@�� queue
		 * @returns boolean
		 */
		this.is_last = function()
		{
			return _obj.queue(_name).length === 1 && run_num === _length();
		};
		
		/**
		 * �ثe�w���檺 job �y����
		 * @returns int
		 */
		this.number = function()
		{
			return run_num;
		};
	}
