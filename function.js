var video_idx = 0;
var order = true;
var stack_qual = [];
var stack_sync = [];
var stack_natu = [];
var cur_qual_v = '0';
var cur_sync_v = '0';
var cur_natu_v = '0';

var	first_dir = './Other/';
var	second_dir = './Our/';

var video_names = [
	'1.mp4',
	'2.mp4',
	'3.mp4'
];
var video_num = video_names.length;

function start(){
	show_content();
	document.getElementById('start_btn').disable = true;
}

function show_content(){
	var fname_node = document.getElementById('file_name');
	var left_video_node = document.getElementById('left_video');
	var right_video_node = document.getElementById('right_video');
	fname_node.innerText = 'Filename: ' + video_names[video_idx];
	var path1 = first_dir + video_names[video_idx];
	var path2 = second_dir + video_names[video_idx];
	var rand = Math.random();
	if (rand > 0.5){
		left_video_node.src = path1;
		right_video_node.src = path2;
		order = true;
	}else{
		left_video_node.src = path2;
		right_video_node.src = path1;
		order = false;
	}
}

function cur_qual(str){
	if (video_idx < video_num){
		if (str == 'left' && !order || str == 'right' && order){
			cur_qual_v = '2';
		}else{
			cur_qual_v = '1';
		}
	}
}

function cur_sync(str){
	if (video_idx < video_num){
		if (str == 'left' && !order || str == 'right' && order){
			cur_sync_v = '2';
		}else{
			cur_sync_v = '1';
		}
	}
}

function cur_natu(str){
	if (video_idx < video_num){
		if (str == 'left' && !order || str == 'right' && order){
			cur_natu_v = '2';
		}else{
			cur_natu_v = '1';
		}
	}
}


function next(){
	if (!check_radio()){
		alert('请确认三项都已经评估！')
		return;
	}
	video_idx += 1;
	show_progress();
	stack_qual.push(cur_qual_v);
	stack_sync.push(cur_sync_v);
	stack_natu.push(cur_natu_v);
	if (video_idx < video_num){
		show_content();
	}else{
		show_result();
	}
	clear_radio();
}

function check_radio(){
	if (cur_qual_v!='0' && cur_sync_v!='0' && cur_natu_v!=0){
		return true;
	}
	return false;
}

function clear_radio(){
	cur_qual_v = '0';
	cur_sync_v = '0';
	cur_natu_v = '0';
	var elements = document.getElementsByClassName("select_radio");
	for(var i=0; i<elements.length; i++) {
    	elements[i].checked = false;
	}
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function show_progress(){
	var percent = (video_idx)*1.0/video_num * 100;
	var progress_node = document.getElementById('progress');
	progress_node.innerText = 'Progress: ' + percent + '% (' + (video_idx).toString() + '/' + video_num.toString() + ')';
}

function show_result(){
	var result_qual_node = document.getElementById('result_qual');
	var result_sync_node = document.getElementById('result_sync');
	var result_natu_node = document.getElementById('result_natu');
	var qual_string = ""; 
	for(var i = 0; i< stack_qual.length; i++){
		qual_string = qual_string.concat(stack_qual[i]);
	}
	var sync_string = ""; 
	for(var i = 0; i< stack_sync.length; i++){
		sync_string = sync_string.concat(stack_sync[i]);
	}
	var natu_string = ""; 
	for(var i = 0; i< stack_natu.length; i++){
		natu_string = natu_string.concat(stack_natu[i]);
	}
	result_qual_node.innerText = 'Quality: ' + qual_string;
	result_sync_node.innerText = 'Sync: ' + sync_string;
	result_natu_node.innerText = 'Natural: ' + natu_string;
	const Http = new XMLHttpRequest();
	const url='http://10.1.26.108:9000/?r='+qual_string+'-'+sync_string+'-'+natu_string;
	Http.open("GET", url);
	Http.send();
	alert('Thanks!')
	//window.location.replace("thanks.html");
}








