var studentRecord={
	id:"",
	name:"",
	gpa:0,
	completedCourses:[]
};

var courseCatalog={
	"CS211":{name: "Data Structures", prereq:["SE112"]},
	"CS342":{name:"Computer Networks", prereq:["CS284"]},
	"SE112":{name:"Introduction To Object-Oriented Programming",prereq:["CS101"]}
};


var signBtn=document.getElementById("signinBtn");

if(signBtn){
	signBtn.onclick=function(){
		var emailInput=document.getElementById("email");
		var pwdInput=document.getElementById("password");
		
		var sid="";
		if (emailInput) sid=emailInput.value.trim();
		if(sid==="") sid="2026XXXX";
		
		studentRecord.id=sid;
		studentRecord.name="mock Student";
		studentRecord.gpa=3.3;
		studentRecord.completedCourses=["SE112"];
		
		localStorage.setItem("studentRecord", JSON.stringify(studentRecord));
		
		window.location.href="chat.html";
	};
}

var studentInfo = document.getElementById("studentInfo");
if (studentInfo) {
  var saved = localStorage.getItem("studentRecord");
  var sr = saved ? JSON.parse(saved) : null;

  if (sr) {
    studentInfo.innerHTML =
      "<b>Logged in as:</b> " + sr.id +
      " | <b>Name:</b> " + sr.name +
      " | <b>GPA:</b> " + sr.gpa +
      " | <b>Completed:</b> " + sr.completedCourses.join(", ");
  } else {
    studentInfo.innerHTML = "<b>Logged in as:</b> (no record found)";
  }
}

var sendBtn=document.getElementById("sendBtn");
if (sendBtn){
	sendBtn.onclick= function(){
		var chatBox=document.getElementById("chatBox");
		var messageWrite=document.getElementById("messageWrite");
		var text=messageWrite.value;
		
		if (text.trim() === ""){
			return;
		}
		
	chatBox.innerHTML = chatBox.innerHTML + '<div class="chatLine userLine"><div class="bubble userBubble">' + text + '</div></div>';

		var saved= localStorage.getItem("studentRecord");
		var sr=saved ? JSON.parse(saved):null;
		
		var reply=buildReply(text,sr);
		
		
	chatBox.innerHTML = chatBox.innerHTML +'<div class="chatLine botLine"><div class="bubble botBubble">' + reply + '</div></div>';
		chatBox.scrollTop=chatBox.scrollHeight;
		messageWrite.value="";
	};
}

function buildReply(userText,sr){
	var lower=userText.toLowerCase();
	var code="";
	if(lower.indexOf("cs211")!==-1) code="CS211";
	if(lower.indexOf("cs342")!==-1) code="CS342";
	if(lower.indexOf("se112")!==-1) code="SE112";
	
if (code === "") {
    return "I can help, but please mention the course code";
  }
 
 var info = courseCatalog[code];
  if (!info) {
    return "I couldn't find this course in the catalog.";
  }
 
 var prereqs = info.prereq;
  if (prereqs.length === 0) {
    return code + " (" + info.name + ") has no prerequisites in this demo.";
  }
  
  var missing = [];
  for (var i = 0; i < prereqs.length; i++) {
    var p = prereqs[i];
    if (!sr || sr.completedCourses.indexOf(p) === -1) {
      missing.push(p);
    }
  }

  if (missing.length === 0) {
    return "Based on your record, you completed " + prereqs.join(", ") +
      ". So you're eligible to take " + code + " (" + info.name + ").";
  } else {
    return "To take " + code + " (" + info.name + "), you still need: " + missing.join(", ") +
      ". (This is based on the courses catalog.)";
  }
}

var logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.onclick = function () {
    window.location.href = "index.html";
  };
}