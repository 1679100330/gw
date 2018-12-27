(function(global){
	function _gw(){}
	_gw.prototype.sidebar=new function(){
		return{
			init:function(obj,nodes){				
				//清除obj下的子节点
				var childs = obj.childNodes;
				for(var i=0;i<childs.length;i++){
					obj.removeChild(childs[i]);
				}
				//对nodes进行排序，使父标签pid在子标签id之前
				for(var i=0;i<nodes.length;i++){
					for(var j=0;j<nodes.length;j++){
						if(nodes[i].pid==nodes[j].id){
							if(i<j){
								var temp = nodes[i];
								nodes[i]=nodes[j];
								nodes[j]=temp;
								break;
							}
						}
					}
				}
				//生成节点
				for(var i=0;i<nodes.length;i++){
					var node = nodes[i];
					if(node.pid=="#"){//根节点
						if(obj.childNodes.length==0){
							var ul = document.createElement("ul");
							ul.style.padding='0';
							ul.style.margin='0';
							ul.style.listStyle='none';
							obj.appendChild(ul);
						}						
						var li = document.createElement("li");
						li.setAttribute("id", "li_"+node.id);
						li.setAttribute("level", "1");
						li.style.width='100%';
						li.style.display='block';
						li.style.verticalAlign='middle';/*兼容IE 5.5-7 */
						li.onmouseover=function(){
							var aels = this.getElementsByTagName('a');
							var spans = aels[0].getElementsByTagName('span');
							spans[0].style.background='#629CC9';
						}
						li.onmouseout=function(){
							var aels = this.getElementsByTagName('a');
							var spans = aels[0].getElementsByTagName('span');
							spans[0].style.background='transparent';
						}	
						var a = document.createElement('a');
						a.setAttribute('href',node.url);
						a.style.display='block';						
						a.style.width='100%';
						a.style.height='35px';
						a.style.fontSize='14px'
						a.style.textDecoration='none';
						a.style.background='#F2F2F2';
						a.style.color='#585858';
						a.style.position='relative';
						a.style.borderBottom='1px solid #E5E5E5';
						a.style.borderRight='1px solid #CCCCCC';
						a.onmouseover=function(){
							this.style.background='#F8F8F8';
							this.style.color='#2B7DBC';
						}
						a.onmouseout=function(){
							this.style.background='#F2F2F2';
							this.style.color='#585858';
						}
						var menuBorder = document.createElement('span');
						menuBorder.style.display='block';
						menuBorder.style.position='absolute';
						menuBorder.style.height='100%';
						menuBorder.style.width='5px';
						menuBorder.style.background='transparent';
						var menuIcon = document.createElement('span');
						menuIcon.setAttribute('class',node.icon);
						menuIcon.style.display='block';
						menuIcon.style.position='absolute';
						menuIcon.style.left='10px';
						menuIcon.style.top='10px';
						var menuName = document.createElement('span');
						menuName.innerHTML=node.name;
						menuName.style.display='block';
						menuName.style.position='absolute';
						menuName.style.left='30px';
						menuName.style.top='10px';
						a.appendChild(menuBorder);
						a.appendChild(menuIcon);
						a.appendChild(menuName);
						li.appendChild(a);
						obj.firstChild.appendChild(li);
					}else{
						var parent = document.getElementById("li_"+node.pid);
						var level = parent.getAttribute("level");
						if(parent!=null){
							if(parent.childNodes.length==1){						
								var arrow = document.createElement('span');
								arrow.setAttribute('class','icon-angle-left');
								arrow.style.display='block';
								arrow.style.fontSize='18px';
								arrow.style.position='absolute';
								arrow.style.right='10px';
								arrow.style.top='10px';
								parent.firstChild.appendChild(arrow);
								parent.firstChild.setAttribute('href','javascript:;');
								var ul = document.createElement("ul");
								ul.style.padding='0';
								ul.style.margin='0';
								ul.style.display='none';
								ul.style.listStyle='none';															
								parent.appendChild(ul);
							}
							var li = document.createElement("li");
							li.setAttribute("id", "li_"+node.id);
							li.setAttribute("level", (parseInt(level)+1));													
							li.style.width='100%';
							li.style.display='block';
							li.style.position='relative';
							li.style.verticalAlign='middle';
							var a = document.createElement('a');
							a.setAttribute('href',node.url);
							a.style.display='block';							
							a.style.width='100%';
							a.style.height='35px';
							a.style.fontSize='14px'
							a.style.textDecoration='none';
							a.style.background='#FFFFFF';
							a.style.color='#796161';
							a.style.position='relative';
							a.style.borderBottom='1px dotted #E5E5E5';
							a.style.borderRight='1px solid #CCCCCC';
							a.onmouseover=function(){
								this.style.color='#4BA3DA';
								this.style.background='#F2F2F2';
							}							
							a.onmouseout=function(){
								this.style.color='#796161';
								this.style.background='#FFFFFF';
							}							
							var verticalLine = document.createElement('span');							
							verticalLine.style.display='block';
							verticalLine.style.position='absolute';
							verticalLine.style.left=parseInt(level)*20+'px';
							verticalLine.style.borderLeft='1px dotted #9DBDD6';
							verticalLine.style.height='100%';
							var horizontalLine = document.createElement('span');							
							horizontalLine.style.display='block';
							horizontalLine.style.position='absolute';
							horizontalLine.style.left=parseInt(level)*20+'px';
							horizontalLine.style.top='50%';
							horizontalLine.style.borderTop='1px dotted #9DBDD6';
							horizontalLine.style.width='10px';
							var menuName = document.createElement('span');
							menuName.innerHTML = node.name;
							menuName.style.display='block';
							menuName.style.position='absolute';
							menuName.style.left=(parseInt(level)*20+20)+'px';
							menuName.style.top='10px';	
							a.appendChild(verticalLine);
							a.appendChild(horizontalLine);
							a.appendChild(menuName);
							li.appendChild(a);
							parent.lastChild.appendChild(li);							
						}else{
							var temp = document.createElement("div");
							temp.innerHTML = "id为"+node.id+"的父节点"+node.pid+"没有找到";
							obj.appendChild(temp);
						}
					}					
				}
				//让a标签点击隐藏和展开
				var as = obj.getElementsByTagName("a");
				for(var i=0;i<as.length;i++){
					as[i].onclick=function(){
						var li = this.parentNode;
						if(li.childNodes.length==2){
							var ul = li.lastChild;					
							if(ul.style.display==='none'){
								//隐藏兄弟标签下的标签
								var uls = ul.getElementsByTagName('ul');
								for(var j=0;j<uls.length;j++){
									uls[j].style.display='none';
									uls[j].parentNode.firstChild.lastChild.setAttribute("class","icon-angle-left");
								}
								//展开
								ul.style.display='block';											
								this.lastChild.setAttribute("class","icon-angle-down");						
							}else{
								ul.style.display='none';						
								this.lastChild.setAttribute("class","icon-angle-left");
							}
						}
						if(!typeof(callback)=="undefined"){ 
							callback(this);
						}
					}					
				}
			}
		}
	}
	_gw.prototype.tree=new function(){
		return{
			_obj:null,
			init:function(obj,nodes,settings){
				_gw.prototype._obj=obj;
				//清除obj下的子节点
				var childs = obj.childNodes;
				for(var i=0;i<childs.length;i++){
					obj.removeChild(childs[i]);
				}
				if(settings==undefined){
					settings = {
						checkbox:'show'
					};
				}
				//对nodes进行排序，使父标签pid在子标签id之前
				for(var i=0;i<nodes.length;i++){
					for(var j=0;j<nodes.length;j++){
						if(nodes[i].pid==nodes[j].id){
							if(i<j){
								var temp = nodes[i];
								nodes[i]=nodes[j];
								nodes[j]=temp;
								break;
							}
						}
					}
				}
				obj.style.padding='5px';
				//生成树节点
				for(var i=0;i<nodes.length;i++){
					if(nodes[i].pid=='#'){//根标签			
						if(obj.childNodes.length==0){
							var ul = document.createElement('ul');
							ul.style.listStyle='none';
							ul.style.margin='0';
							ul.style.padding='0';
							obj.appendChild(ul);
						}			
						var li = document.createElement('li');
						li.setAttribute('id',nodes[i].id);				
						li.style.margin='0';
						li.style.padding='0';
						li.style.borderTop='1px dotted gray';
						li.style.borderLeft='1px dotted transparent';						
						var div = document.createElement('div');
						div.style.height='21px';
						div.style.position='relative';
						div.style.top='-11px';
						div.style.left='-11px';
						var span = document.createElement('span');
						span.style.display='block';
						span.style.height='21px';
						span.style.width='21px';
						span.style.float='left';
						var a = document.createElement('a');
						a.setAttribute('id',nodes[i].id);
						a.style.display='block';
						a.style.height='100%';
						a.style.width='100%';
						a.style.background='white';
						a.style.float='left';
						a.style.marginTop='-20px';
						a.style.marginLeft='20px';						
						if(settings.checkbox=='show'){
							var a_checkbox = document.createElement('input');
							a_checkbox.style.margin='0';
							a_checkbox.setAttribute('type','checkbox');
							a_checkbox.setAttribute('name','choose');
							a_checkbox.setAttribute('pk',nodes[i].id);
							a_checkbox.setAttribute('pid',nodes[i].pid);								
				            a_checkbox.onclick=function(){
				            	//取消选择时，子节点都需要取消
								if(this.checked==false){	
									var childs = this.parentNode.parentNode.parentNode.getElementsByTagName('input');
					                for (var j = 0; j < childs.length; j++) {
					                    childs[j].checked = this.checked;
					                }
								}else{
									//选择时，父节点都需要选择
									_gw.prototype.tree.recursive(obj,this);
								}
				            }
							a.appendChild(a_checkbox);
						}							
						var a_span = document.createElement('span');			
						a_span.appendChild(document.createTextNode(nodes[i].name));	
						a_span.style.cursor='pointer';
						a_span.style.textDecoration='none';
						a_span.style.marginLeft='5px';
						a_span.style.fontSize='14px';
						a.appendChild(a_span);
						div.appendChild(span);
						div.appendChild(a);
						li.appendChild(div);									
						if(obj.childNodes[obj.childNodes.length-1].childNodes.length>0){
							obj.childNodes[obj.childNodes.length-1].childNodes[obj.childNodes[obj.childNodes.length-1].childNodes.length-1].style.borderLeft='1px dotted gray';
						}						
						obj.childNodes[obj.childNodes.length-1].appendChild(li);						
					}else{
						var pid = document.getElementById(nodes[i].pid);
						if(pid){
							if(pid.childNodes.length==1){
								var ul = document.createElement('ul');
								ul.style.listStyle='none';
								ul.style.margin='0';
								ul.style.padding='0';
								ul.style.marginLeft='20px';
								ul.style.display='none';
								pid.appendChild(ul);
								//显示
								var btn_span = document.createElement('span');
								btn_span.style.width='9px';
								btn_span.style.height='9px';					
								btn_span.style.marginTop='6px';
								btn_span.style.marginLeft='6px';
								btn_span.style.display='block';
								btn_span.style.background='url(img/add.png) no-repeat';
								pid.childNodes[0].childNodes[0].appendChild(btn_span);
								//添加事件								
								pid.childNodes[0].childNodes[0].onclick=function(){
									var li=this.parentNode.parentNode;
									if(li.childNodes[li.childNodes.length-1].style.display=='none'){					
										li.childNodes[li.childNodes.length-1].style.display='block';
										this.childNodes[this.childNodes.length-1].style.background='url(img/minus.png) no-repeat';
									}else{
										li.childNodes[li.childNodes.length-1].style.display='none';
										this.childNodes[this.childNodes.length-1].style.background='url(img/add.png) no-repeat';
									}
								}
								//添加li标签
								var li = document.createElement('li');
								li.style.marginTop='-20px';
								var div = document.createElement('div');
								div.style.height='20px';	
								li.appendChild(div);
								pid.childNodes[pid.childNodes.length-1].appendChild(li);
							}
							var li = document.createElement('li');
							li.setAttribute('id',nodes[i].id);
							li.style.margin='0';
							li.style.padding='0';
							li.style.borderTop='1px dotted gray';
							li.style.borderLeft='1px dotted white';
							var div = document.createElement('div');
							div.style.height='21px';
							div.style.position='relative';
							div.style.top='-11px';
							div.style.left='-11px';
							var span = document.createElement('span');
							span.style.display='block';
							span.style.height='100%';
							span.style.width='21px';
							span.style.float='left';
							var a = document.createElement('a');
							a.setAttribute('id',nodes[i].id);
							a.style.display='block';
							a.style.display='block';
							a.style.height='100%';
							a.style.width='100%';
							a.style.background='white';
							a.style.float='left';
							a.style.marginTop='-20px';
							a.style.marginLeft='20px';
							if(settings.checkbox=='show'){
								var a_checkbox = document.createElement('input');
								a_checkbox.style.margin='0';
								a_checkbox.setAttribute('type','checkbox');
								a_checkbox.setAttribute('name','choose');
								a_checkbox.setAttribute('pk',nodes[i].id);
								a_checkbox.setAttribute('pid',nodes[i].pid);								
					            a_checkbox.onclick=function(){
					            	//取消选择时，子节点都需要取消
									if(this.checked==false){	
										var childs = this.parentNode.parentNode.parentNode.getElementsByTagName('input');
						                for (var j = 0; j < childs.length; j++) {
						                    childs[j].checked = this.checked;
						                }
									}else{
										//选择时，父节点都需要选择
										_gw.prototype.tree.recursive(obj,this);
									}
					            }
								a.appendChild(a_checkbox);
							}					
							var a_span = document.createElement('span');
							a_span.appendChild(document.createTextNode(nodes[i].name));
							a_span.style.cursor='pointer';
							a_span.style.textDecoration='none';
							a_span.style.marginLeft='5px';
							a_span.style.fontSize='14px';
							a.appendChild(a_span);
							div.appendChild(span);
							div.appendChild(a);
							li.appendChild(div);
							if(pid.childNodes[pid.childNodes.length-1].childNodes.length>0){
								pid.childNodes[pid.childNodes.length-1].childNodes[pid.childNodes[pid.childNodes.length-1].childNodes.length-1].style.borderLeft='1px dotted gray';
							}
							pid.childNodes[pid.childNodes.length-1].appendChild(li);
						}else{
							alert(nodes[i].pid+'找不到');
						}
					}
				}
			},
			recursive:function(obj,node){
				var inputs = obj.getElementsByTagName('input');
				for(var i=0;i<inputs.length;i++){
					var input = inputs[i];
					if(input.getAttribute('pk')==node.getAttribute('pid')){
						input.checked=node.checked;
						_gw.prototype.tree.recursive(obj,input);
					}
				}
			},
			getChoosedNode:function(){
				//获取checkbox为true的节点的id
				var array = [];
				var inputs = _gw.prototype._obj.getElementsByTagName('input');
				for(var i=0;i<inputs.length;i++){
					if(inputs[i].checked==true){						
						array.push(inputs[i].getAttribute('pk'));						
					}
				}
				return array;
			}
		}
	}
	
	global.gw=new _gw();
})(window)
