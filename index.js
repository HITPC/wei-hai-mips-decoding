/* 
  Written By: PiaoChen
  Time: 2023-06-27
  Compiler: VSCode
  Recorder: MixTop
  Leaved Message: '★Big brother is watching you★'
*/

// 下面是封装的消息提示的实现
class MsgShow {
  constructor(mainId, time){
    this.msgQueue = []; // 使用队列来存储消息
    this.index = 0;
    this.container = document.getElementById(mainId);
    this.aliveTime = time;
  }

  addMsg(content, type){
    type = type || "info"; // 设置默认值
    const msg = {
      id: this.index,
      content,
      type
    };
    this.msgQueue.push(msg); // 将消息添加到队列中
    ++this.index;
    this.displayMsg(msg); // 显示新添加的消息
  }

  displayMsg(msg){
    const span = document.createElement('span');
    span.classList.add('copy-basic', `copy-${msg.type}`);
    span.setAttribute('id', msg.id.toString());
    span.innerHTML = msg.content;
    this.container.appendChild(span);
    setTimeout(() => {
      this.container.removeChild(document.getElementById(msg.id.toString()));
      this.msgQueue.shift(); // 从队列中删除消息
    }, this.aliveTime+20);
  }
}

const msg = new MsgShow("container", 2000); 

if(window.innerWidth <= 900){
  alert("屏幕太小，未做移动适配可能影响展示，建议使用桌面端访问！");
}

function binary(number, bit) {
  let binary = (number >>> 0).toString(2);
  while (binary.length < bit) {
      binary = '0' + binary;
  }
  while(binary.length > bit){
    binary = binary.slice(1);
  }
  return binary;
}


function dec2bin(decNumber, bit) {
    if (decNumber < 0) {
      msg.addMsg("请输入一个非负整数", "error");
    } else {
      var q = binary(decNumber, bit);
      return q;
    }
}

function getNumber(s){
  if(s.charAt(0)==="$"){
    s = s.slice(1);
  }
  if(s.charAt(s.length-1) === ","){
    s = s.substring(0, s.length - 1);
  }
  return Number.parseInt(s);
}

let input = document.getElementById("input");
let btn = document.getElementById("btn");
let result = document.getElementById("result");
let result16 = document.getElementById("result16");
const btnReset = document.getElementById("btn-reset");

/**
 * 译码核心逻辑
 * @returns {string}
 */
function getRes(){
  result.innerHTML="";
  result16.innerHTML="";
  if(input.value === ""){
    msg.addMsg("输入内容不能为空！", "error");
    return;
  }
  let indexArr = input.value.split(" ");
  let op = indexArr[0];
  let numberArr = [];
  let temp = []
  var resArr;
  switch (op){
    case "add": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000";
      resArr[5] = "100000";
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "addi": {
      resArr = new Array(4)
      resArr[0] = "001000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        
        if(i===2){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
      }
      resArr[1] = temp[1];
      resArr[2] = temp[0];
      resArr[3] = temp[2];
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "addiu": {
      resArr = new Array(4)
      resArr[0] = "001001";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        if(i===2){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
      }
      resArr[1] = temp[1];
      resArr[2] = temp[0];
      resArr[3] = temp[2];
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "addu": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000"
      resArr[5] = "100001"
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "and": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000"
      resArr[5] = "100100"
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "andi": {
      resArr = new Array(4)
      resArr[0] = "001100";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        if(i===2){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
      }
      resArr[1] = temp[1];
      resArr[2] = temp[0];
      resArr[3] = temp[2];
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "beq": {
      resArr = new Array(4)
      resArr[0] = "000100";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        if(i===2){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
      }
      resArr[1] = temp[0];
      resArr[2] = temp[1];
      resArr[3] = temp[2];
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "bgtz": {
      resArr = new Array(4)
      resArr[0] = "000111";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        if(i===1){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
      }
      resArr[1] = temp[0];
      resArr[2] = "00000";
      resArr[3] = temp[1];
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "bltz": {
      resArr = new Array(4)
      resArr[0] = "000001";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        if(i===1){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
      }
      resArr[1] = temp[0];
      resArr[2] = "00000";
      resArr[3] = temp[1];
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "bne": {
      resArr = new Array(4)
      resArr[0] = "000101";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        if(i===2){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
      }
      resArr[1] = temp[0];
      resArr[2] = temp[1];
      resArr[3] = temp[2];
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "j": {
      resArr = new Array(2)
      resArr[0] = "000010";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        
          temp.push(binary(numberArr[i], 26));
        
      }
      resArr[1] = temp[0];
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "jal": {
      resArr = new Array(2)
      resArr[0] = "000011";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        
          temp.push(binary(numberArr[i], 26));
        
      }
      resArr[1] = temp[0];
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "jr": {
      resArr = new Array(4)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        
          temp.push(binary(numberArr[i], 5));
        
      }
      resArr[1] = temp[0];
      resArr[2] = "000000000000000";
      resArr[3] = "001000";
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "lbu": {
      msg.addMsg("这个的处理逻辑没写", "error");
      return;
    }
    case "lhu": {
      msg.addMsg("这个的处理逻辑没写", "error");
      return;
    }
    case "lui": {
      resArr = new Array(4)
      resArr[0] = "001111";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        if(i==1){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
          
        
      }
      resArr[1] = "00000";
      resArr[2] = temp[0];
      resArr[3] = temp[1];
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "lw": {
      msg.addMsg("这个的处理逻辑没写", "error");
      return;
    }
    case "nor": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000"
      resArr[5] = "100111"
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "or": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000"
      resArr[5] = "100101"
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "ori": {
      resArr = new Array(4)
      resArr[0] = "001101";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        if(i==2){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
        
      }
      resArr[1] = temp[1];
      resArr[2] = temp[0];
      resArr[3] = temp[2];
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "sb": {
      msg.addMsg("这个的处理逻辑没写", "error");
      return;
    }
    case "sh": {
      msg.addMsg("这个的处理逻辑没写", "error");
      return;
    }
    case "sll": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = "00000";
      resArr[2] = temp[1];
      resArr[3] = temp[0];
      resArr[4] = temp[2];
      resArr[5] = "000000";
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "sllv": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[2];
      resArr[2] = temp[1];
      resArr[3] = temp[0];
      resArr[4] = "00000";
      resArr[5] = "000100";
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "slt": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000";
      resArr[5] = "101010";
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "slti": {
      resArr = new Array(4)
      resArr[0] = "001010";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        if(i==2){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
        
      }
      resArr[1] = temp[1];
      resArr[2] = temp[0];
      resArr[3] = temp[2];
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "sltiu": {
      resArr = new Array(4)
      resArr[0] = "001011";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        if(i==2){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
        
      }
      resArr[1] = temp[1];
      resArr[2] = temp[0];
      resArr[3] = temp[2];
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "sltu": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000";
      resArr[5] = "101011";
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "sra": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = "00000";
      resArr[2] = temp[1];
      resArr[3] = temp[0];
      resArr[4] = temp[2];
      resArr[5] = "000011";
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "srav": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[2];
      resArr[2] = temp[1];
      resArr[3] = temp[0];
      resArr[4] = "00000";
      resArr[5] = "000111";
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "srl": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = "00000";
      resArr[2] = temp[1];
      resArr[3] = temp[0];
      resArr[4] = temp[2];
      resArr[5] = "000010";
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "sub": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000";
      resArr[5] = "100010";
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "subu": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000";
      resArr[5] = "100011";
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "sw":{
      msg.addMsg("这个的处理逻辑没写", "error");
      return;
    }
    case "xor": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000";
      resArr[5] = "100110";
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    case "xori": {
      resArr = new Array(4)
      resArr[0] = "001110";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        if(i==2){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
        
      }
      resArr[1] = temp[1];
      resArr[2] = temp[0];
      resArr[3] = temp[2];
      for(let i = 0; i<resArr.length; ++i){
        result.innerHTML+=resArr[i];
        result.innerHTML+=" ";
      }
      break;
    }
    default: {
      msg.addMsg("可能写错指令了，或者这个指令我没写逻辑...", "error");
      return;
    }  
  }
  let str = ""
  for(let i = 0; i<resArr.length; ++i){
    str += resArr[i];
  }
  str = parseInt(str,2).toString(16);
  let t = "";
  if(str.length < 8){
    for(let i = 0; i<8-str.length; ++i){
      t += "0";
    }
    str = t + str;
  }
  result16.innerHTML = str.toUpperCase();
  msg.addMsg("转换成功！", "success");
}

/**
 * 文件译码核心逻辑，新加功能，懒得改了
 * @param {string} item 
 * @returns {string}
 */
function getFileRes(item){
  let indexArr = item.split(" ");
  let op = indexArr[0];
  let numberArr = [];
  let temp = []
  var resArr;
  let parts = ""
  switch (op){
    case "add": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000";
      resArr[5] = "100000";
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "addi": {
      resArr = new Array(4)
      resArr[0] = "001000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        
        if(i===2){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
      }
      resArr[1] = temp[1];
      resArr[2] = temp[0];
      resArr[3] = temp[2];
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "addiu": {
      resArr = new Array(4)
      resArr[0] = "001001";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        if(i===2){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
      }
      resArr[1] = temp[1];
      resArr[2] = temp[0];
      resArr[3] = temp[2];
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "addu": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000"
      resArr[5] = "100001"
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "and": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000"
      resArr[5] = "100100"
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "andi": {
      resArr = new Array(4)
      resArr[0] = "001100";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        if(i===2){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
      }
      resArr[1] = temp[1];
      resArr[2] = temp[0];
      resArr[3] = temp[2];
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "beq": {
      resArr = new Array(4)
      resArr[0] = "000100";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        if(i===2){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
      }
      resArr[1] = temp[0];
      resArr[2] = temp[1];
      resArr[3] = temp[2];
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "bgtz": {
      resArr = new Array(4)
      resArr[0] = "000111";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        if(i===1){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
      }
      resArr[1] = temp[0];
      resArr[2] = "00000";
      resArr[3] = temp[1];
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "bltz": {
      resArr = new Array(4)
      resArr[0] = "000001";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        if(i===1){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
      }
      resArr[1] = temp[0];
      resArr[2] = "00000";
      resArr[3] = temp[1];
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "bne": {
      resArr = new Array(4)
      resArr[0] = "000101";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        if(i===2){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
      }
      resArr[1] = temp[0];
      resArr[2] = temp[1];
      resArr[3] = temp[2];
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "j": {
      resArr = new Array(2)
      resArr[0] = "000010";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        
          temp.push(binary(numberArr[i], 26));
        
      }
      resArr[1] = temp[0];
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "jal": {
      resArr = new Array(2)
      resArr[0] = "000011";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        
          temp.push(binary(numberArr[i], 26));
        
      }
      resArr[1] = temp[0];
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "jr": {
      resArr = new Array(4)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        
          temp.push(binary(numberArr[i], 5));
        
      }
      resArr[1] = temp[0];
      resArr[2] = "000000000000000";
      resArr[3] = "001000";
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "lbu": {
      return `(lbu逻辑没写)-${item}`;
    }
    case "lhu": {
      return `(lhu逻辑没写)-${item}`;
    }
    case "lui": {
      resArr = new Array(4)
      resArr[0] = "001111";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制    
        if(i==1){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
          
        
      }
      resArr[1] = "00000";
      resArr[2] = temp[0];
      resArr[3] = temp[1];
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "lw": {
      return `(lw逻辑没写)-${item}`;
    }
    case "nor": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000"
      resArr[5] = "100111"
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "or": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000"
      resArr[5] = "100101"
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "ori": {
      resArr = new Array(4)
      resArr[0] = "001101";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        if(i==2){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
        
      }
      resArr[1] = temp[1];
      resArr[2] = temp[0];
      resArr[3] = temp[2];
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "sb": {
      return `(sb的逻辑没写)-${item}`;
    }
    case "sh": {
      return `(sh逻辑没写)-${item}`;
    }
    case "sll": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = "00000";
      resArr[2] = temp[1];
      resArr[3] = temp[0];
      resArr[4] = temp[2];
      resArr[5] = "000000";
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "sllv": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[2];
      resArr[2] = temp[1];
      resArr[3] = temp[0];
      resArr[4] = "00000";
      resArr[5] = "000100";
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "slt": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000";
      resArr[5] = "101010";
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "slti": {
      resArr = new Array(4)
      resArr[0] = "001010";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        if(i==2){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
        
      }
      resArr[1] = temp[1];
      resArr[2] = temp[0];
      resArr[3] = temp[2];
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "sltiu": {
      resArr = new Array(4)
      resArr[0] = "001011";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        if(i==2){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
        
      }
      resArr[1] = temp[1];
      resArr[2] = temp[0];
      resArr[3] = temp[2];
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "sltu": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000";
      resArr[5] = "101011";
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "sra": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = "00000";
      resArr[2] = temp[1];
      resArr[3] = temp[0];
      resArr[4] = temp[2];
      resArr[5] = "000011";
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "srav": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[2];
      resArr[2] = temp[1];
      resArr[3] = temp[0];
      resArr[4] = "00000";
      resArr[5] = "000111";
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "srl": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = "00000";
      resArr[2] = temp[1];
      resArr[3] = temp[0];
      resArr[4] = temp[2];
      resArr[5] = "000010";
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "sub": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000";
      resArr[5] = "100010";
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "subu": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000";
      resArr[5] = "100011";
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "sw":{
      return `(sw逻辑没写)-${item}`;
    }
    case "xor": {
      resArr = new Array(6)
      resArr[0] = "000000";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        temp.push(binary(numberArr[i], 5));
      }
      resArr[1] = temp[1];
      resArr[2] = temp[2];
      resArr[3] = temp[0];
      resArr[4] = "00000";
      resArr[5] = "100110";
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    case "xori": {
      resArr = new Array(4)
      resArr[0] = "001110";
      for(let i = 1; i<indexArr.length; ++i){ // 把操作数拆出来
        numberArr.push(getNumber(indexArr[i]));
      }
      for(let i = 0; i<numberArr.length; ++i){// 操作数转二进制
        if(i==2){
          temp.push(binary(numberArr[i], 16));
        }else{
          temp.push(binary(numberArr[i], 5));
        }
        
      }
      resArr[1] = temp[1];
      resArr[2] = temp[0];
      resArr[3] = temp[2];
      for(let i = 0; i<resArr.length; ++i){
        parts+=resArr[i];
        parts+=" ";
      }
      break;
    }
    default: {
      return `没写这个-(${item})`;
    }  
  }
  let str = ""
  for(let i = 0; i<resArr.length; ++i){
    str += resArr[i];
  }
  str = parseInt(str,2).toString(16);
  let t = "";
  if(str.length < 8){
    for(let i = 0; i<8-str.length; ++i){
      t += "0";
    }
    str = t + str;
  }
  return str.toUpperCase();
}

// 转换得答案
btn.addEventListener("click", getRes);
// let s = "add $5, $6, $5";

// 使用须知
const explain = document.getElementById("explain");
explain.addEventListener('click', ()=>{ // 懒得写弹窗了
  alert(`
    使用须知：
    ⚠ 重要：请一定要确保转换前输入的指令格式是对的，指令格式要求必须要英文逗号并且逗号后面打一个空格，并且末尾不需要加任何东西！并且，本网页并没有实现全部的指令，有部分指令如lbu，sw，sh，sb，lw，lhu等没有写（因为老学长当年选的项目没用到这几个指令）。
    ⚠ 注意，如果指令是对的但是格式错误/部分使用方式错误情况，结果会出现undefined，但是如果是使用方式错了，本页面没有细致检查使用方式正确与否的功能，所以会正常译码，此时结果会看着没问题（但是这个就会出大问题了）
    关于本网页：本网页是老学长自己写来自己用的（纯原生写的~），本着互帮互助的心态分享给大家。
    本网页汇编命令转到机器码没有任何问题，已经经过了老学长亲自使用测试了，拿下了计组课设95+。
    最后：加油各位！实在不会就什么chatGPT，New Bing，文心一言用起来啊！嘎嘎好用啊家人们！要是觉得好用的话不要忘了进老学长的仓库里给个star😁。
  `);
});

// 重置功能
btnReset.addEventListener('click', ()=>{
  input.value = ""; 
  result.innerHTML=""; 
  result16.innerHTML="";
  msg.addMsg("重置成功！", "info");
});

// 点击复制
const copyItems = document.querySelectorAll(".res-res");
function doCopy(item) {
  return async () => {
    try {
      const text = item.textContent;
      await navigator.clipboard.writeText(text); // 实现复制到粘贴板
      msg.addMsg('复制成功', 'success');
    } catch (err) {
      msg.addMsg('复制出现问题了！请重试', 'error');
      console.error(err);
    }
  };
}
copyItems.forEach((item) => {// 绑上
  item.addEventListener("click", doCopy(item));
});

// 右键粘贴
input.addEventListener('contextmenu', (e) => {
  e.preventDefault(); // 阻止右键菜单
  navigator.clipboard.readText()
    .then(text => {
        input.value = text;
        msg.addMsg("粘贴成功！", "success");
    })
    .catch(err => {
      msg.addMsg("访问粘贴板出错！", "error");
      console.log(err);
      return;
    });
});

/**
 * 生成下载文件
 * @param {string[]} fileStringArr 文件内容数组 
 * @param {string} fileName 文件名
 * @param {string} type 文件类型
 */
function letsDownloadFile(fileStringArr, fileName, type){
  // 创建一个File对象
  let file = new File(
    fileStringArr, 
    fileName, 
    {
      type,
    }
  );
  // 创建一个指向File对象的URL
  let url = URL.createObjectURL(file);
  // 创建一个a标签并模拟点击来下载文件
  let a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  a.click();
}

/**
 * 解析字符串
 * @param {string} fileString 
 * @returns {string} 直接可生成文件下载的内容
 */
function parseStr(fileString){
  let strs = fileString.split("\r\n");
  let res = "";
  strs.forEach((item)=>{
    if(item !== ""){
      res += getFileRes(item.trim());
      res += "\r\n";
    }
  });
  return res;
}

// 拿到上传文件
const file = document.getElementById("file");
// 按钮
const templateBtn = document.getElementById("templateBtn");
templateBtn.addEventListener("click", ()=>{
  alert(`
    🧨文件格式：多个指令之前不需要添加分号，只需回车换行即可。除了指令之外，别的什么都不要有。
      点击确定继续。
  `);
  letsDownloadFile(
    [`add $5, $61, $5\r\nadd $15, $6, $5\r\nadd $5, $6, $9`], 
    "WeiHaiMIPS-template.txt",
    "text/plain"
  );
});
const uploadFileBtn = document.getElementById("fileBtn");
uploadFileBtn.addEventListener("click", ()=>{
  alert(`
    
    请注意，上传的文件必须符合格式要求的！检错不一定能检出来错误，格式错误甚至可能继续转换，导致机器码出错🧨！而这很难被发现。
    内容将转换为16进制数。
    无法处理汇编内容，跳转部分需要自己计算！
    点击确定继续。（如果没继续让上传说明已经上传过一次了，刷新一下）
  `);
  file.click();
});
let fileString;
file.onchange = (e)=>{
  const fileReader = new FileReader();
  fileReader.readAsText(e.target.files[0]);
  fileReader.onload = (e)=>{
    fileString = e.target.result;
    msg.addMsg("上传成功！", "success");
    const result = parseStr(fileString);
    msg.addMsg("转换完毕！", "success");
    letsDownloadFile([result], "ResultOfWeiHaiMIPS.txt", "text/plain");
  }
}
