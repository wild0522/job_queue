Job Queue
====


這是 Jquery queue 延伸應用，增加一些細部操作。


***


Options
---

下面是可用的方法：

| Method        | Description   |
| ------------- |:--------------|
| init      | 初始化 Queue |
| reg      | 註冊為 Queue |
| remove | 刪除指定 ID 的 Queue，前提是 reg 時必須有指定 ID |
| clear | 清空並停止 Queue |
| next | 執行下一個 Queue |
| reg_first | 註冊為第一個 Queue (Queue執行中，不會有效果) |
| reg_last | 註冊為最後一個 Queue (Queue執行中，不會有效果) |
| length | 計算已經註冊的 Queue 總數 |
| number | 取得已執行的 Queue 數量 (clear or finish 會歸零) |
| is_last | 是否為最後一個 Queue |


Usage
---

###Basic
	var test_queue = new job_queue();
	test_queue.init($('body'), 'test');
	
	$(document).ready(function(){
			
		test_queue.reg_first(function(){
			$('body').append('<div>first</div>');
		});
				
		test_queue.reg_last(function(){
			$('body').append('<div>last</div>');
		});
				
		test_queue.next();
	});

###Advanced
	var test_queue = new job_queue();
	test_queue.init($('body'), 'test');
			
	$(document).ready(function(){
			
		test_queue.reg_first(function(){
			$('body').append('<div>first</div>');
		});
			
		test_queue.reg_last(function(){
			$('body').append('<div>last</div>');
		});
				
		for(var i =0; i < 5; i++) {
			test_queue.reg(function(){ // <---dont't add any function paramater
			
				$('body').append('<div>no.' + test_queue.number() + '</div>');
				
				if(1==2) {
					alert('error');
					//stop & clear
					test_queue.clear();
				}
						
				//when finish, call next
				test_queue.next();
			});
		}
				
		$('.btn-clear').click(function(){
			$('div').remove();
			//stop & clear
			test_queue.clear();				
		});
	});