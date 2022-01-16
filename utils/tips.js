export const alert = function ({ content, duration = 3000, type = "warning",position="left" }) {
  //type  success/warning/info/error/zero
  //透明遮罩层
  var mask = document.createElement("div");
  mask.style.position = " fixed";
  mask.style.zIndex = 1000000;
  mask.style.top = 0;
  mask.style.bottom = 0;
  mask.style.left = 0;
  mask.style.right = 0;
  //实现alert
  var div = document.createElement("div");
  let backgroundColor = "#000"
  let color = "#fff";
  let opacity = 0.7;
  let borderColor = "transparent"
  let top = "20%";
  let padding = "0 10px"
  let fontSize = "0.24rem";
  switch (type) {
    case 'zero':
      backgroundColor = "#000"
      color = "#fff"
      opacity = 0.7;
      break;
    case 'success':
      backgroundColor = "#f0f9eb"
      color = "#67C23A";
      borderColor = "#e1f3d8"
      break;
    case 'warning':
      backgroundColor = " #fff5e9"
      color = "#FC9620";
      borderColor = "#feead2"
      break;
    case 'info':
      backgroundColor = "#edf2fc"
      color = "#909399";
      borderColor = "#EBEEF5"
      break;
    case 'error':
      backgroundColor = "#feebeb"
      color = "#F93636";
      borderColor = "#fed7d7"
      break;
    default:
      backgroundColor = "#fff5e9"
      color = "#FC9620";
      borderColor = "#feead2"
      break;
  }
  let animation_top = "0px";
  if (type == 'success' || type == 'warning' || type == 'info' || type == 'error') {
    opacity = 1;
    //div.style.animation = "all .5s"
    div.style.minWidth = "380px";
    div.style.borderWidth = "1px";
    div.style.borderStyle = "solid";
    div.style.padding = "15px 15px 15px 20px";
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.fontSize = fontSize;
    top = '0px';
    animation_top = "20px";
  }
  switch (position) {
    case "left":
      div.style.justifyContent = "flex-start"
      break;
    case "center":
        div.style.justifyContent = "center"
      break;
    case "right":
        div.style.justifyContent = "flex-end"
      break;
    default:
      div.style.justifyContent = "flex-start"
      break;
  }
  div.style.top = top;
  div.style.transform = "translateX(-50%)";
  div.style.transition = "opacity 0.3s, transform .4s, top 0.4s";
  div.style.overflow = "hidden"
  div.style.backgroundColor = backgroundColor;
  div.style.color = color;
  div.style.boxSizing = "border-box";
  div.style.position = " fixed";
  div.style.zIndex = 9999999;
  div.style.opacity = opacity;
  div.style.left = "50%";
  div.style.lineHeight = " 50px";
  div.style.borderColor = borderColor;
  div.style.borderRadius = " 4px";
  div.style.fontSize = fontSize;
  div.style.textAlign = "center";
  div.style.padding = padding;
  div.className = "lk__alert  opacity";
  div.id = "alert";
  div.innerHTML = content;
  document.getElementsByTagName("body")[0].appendChild(div);
  document.getElementsByTagName("body")[0].appendChild(mask);
  var selfObj = document.getElementById("alert");

  //动态调整位置
  if (type == 'success' || type == 'warning' || type == 'info' || type == 'error') {
    var alertWidth = window.getComputedStyle(selfObj, null).width;
    div.style.top = animation_top;
    //div.style.marginLeft = -parseInt(alertWidth) / 2 + "px";
  }

  if (duration != 0) {
    setTimeout(function () {
      document.getElementsByTagName("body")[0].removeChild(div);
      document.getElementsByTagName("body")[0].removeChild(mask);
    }, duration);
  }
};

export default {
  alert
}