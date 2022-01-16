export function newGuid() {
	var guid = "";
	for (var i = 1; i <= 32; i++) {
	  var n = Math.floor(Math.random() * 16.0).toString(16);
	  guid += n;
	  if (i == 8 || i == 12 || i == 16 || i == 20) guid += "-";
	}
	return guid;
}

export const groupBy = (array, f) => {
    var groups = {};
    array.forEach(function (o) {
       var group = formdataTime(f(o),'YYYY-MM')
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
        return groups[group];
    });
}

export const formdataTime = (params,type="YYYY-MM-DD") => {
    if(type=="YYYY-MM-DD"){
        return params.split(" ")[0]
    }else if(type=="YYYY-MM"){
        let time = params.split(" ")[0].split('-');
        return time[0]+'-'+time[1]
    }
   
}

export const phoneCodeVerification = (phone) => {
    let codeVerification = /^[1][3,4,5,7,8][0-9]{9}$/;
    return codeVerification.test(phone);
}

export const stringVerification = (str) => {
    // 字符串只能是数字、字母和中文组成，不能包含特殊符号和空格。
    let codeVerification = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
    return codeVerification.test(str);
}

export const emailVerification = (str) => {
    let codeVerification = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return codeVerification.test(str);
}

export const  checkURL = (URL) => {
    var str = URL,
    Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/,
    objExp = new RegExp(Expression);
    if(objExp.test(str) == true) {
       return true
    } else {
       return false
    }
}

export const randomNun = (m, n) => {
    var num = Math.floor(Math.random() * (m - n) + n);
    return num;
};


export function orderBy(list, key) {
	return list.sort((a, b) => a[key] - b[key]);
}

export function deepTree(list) {
	const newList = [];
	const map = {};

	list.forEach((e) => (map[e.id] = e));

	list.forEach((e) => {
		const parent = map[e.parentId];

		if (parent) {
			(parent.children || (parent.children = [])).push(e);
		} else {
			newList.push(e);
		}
	});

	const fn = (list) => {
		list.map((e) => {
			if (e.children instanceof Array) {
				e.children = orderBy(e.children, "orderNum");

				fn(e.children);
			}
		});
	};

	fn(newList);
	return orderBy(newList, "orderNum");
}

export function  dateFormat() {
    const date = new Date();
    const opt = {
      Y: date.getFullYear().toString(),
      M: (date.getMonth() + 1).toString(),
      D: date.getDate().toString(),
      H: date.getHours().toString(),
      m: date.getMinutes().toString(),
    };
    for (let i in opt) {
      opt[i] = opt[i].length == 1 ? opt[i].padStart(2, "0") : opt[i];
    }
    return `${opt.Y}/${opt.M}/${opt.D} ${opt.H}:${opt.m}`;
}

export function initUserInfo(userInfo) {
    let _userInfo = {
                name: "",
                email: "",
                phone: "",
                address: "",
                wechat: "",
                qq: "",
                content:"",
                userId:newGuid(),
                avatarUrl:randomNun(1,10)+".jpg",
    }
    try {
        if(userInfo){
            userInfo.content = ""
            localStorage.setItem("_userInfo",JSON.stringify(userInfo))
        }else{
            localStorage.setItem("_userInfo",JSON.stringify(_userInfo))
        }
    } catch (error) {
        localStorage.setItem("_userInfo",JSON.stringify(_userInfo))
    }
}

export function randomImg(){
    return `https://oss.wangmiaozero.cn/blogs/image/other/${randomNun(1,58)}bh3.png`
}

export default { 
    newGuid,
    groupBy,
    formdataTime,
    phoneCodeVerification,
    stringVerification,
    emailVerification,
    checkURL,
    randomNun,
    orderBy,
    deepTree,
    dateFormat,
    initUserInfo,
    randomImg
}
