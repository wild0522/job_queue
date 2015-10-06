Job Queue
====


�o�O Jquery queue �������ΡA�W�[�@�ǲӳ��ާ@�C


***


Options
---

�U���O�i�Ϊ���k�G

| Method        | Description   |
| ------------- |:--------------|
| init      | ��l�� Queue |
| reg      | ���U�� Queue |
| remove | �R�����w ID �� Queue�A�e���O reg �ɥ��������w ID |
| clear | �M�Ũð��� Queue |
| next | ����U�@�� Queue |
| reg_first | ���U���Ĥ@�� Queue (Queue���椤�A���|���ĪG) |
| reg_last | ���U���̫�@�� Queue (Queue���椤�A���|���ĪG) |
| length | �p��w�g���U�� Queue �`�� |
| number | ���o�w���檺 Queue �ƶq (clear or finish �|�k�s) |
| is_last | �O�_���̫�@�� Queue |


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