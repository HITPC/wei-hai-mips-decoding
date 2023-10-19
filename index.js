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
          alert("请输入一个非负整数");
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

function getRes(){
  result.innerHTML="";
  result16.innerHTML="";
  let indexArr = input.value.split(" ");
  if(indexArr.length === 0){
    alert("input error");
    return;
  }
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
      alert("这个的处理逻辑没写");
      break;
    }
    case "lhu": {
      alert("这个的处理逻辑没写");
      break;
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
      alert("这个的处理逻辑没写");
      break;
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
      alert("这个的处理逻辑没写");
      break;
    }
    case "sh": {
      alert("这个的处理逻辑没写");
      break;
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
      alert("这个的处理逻辑没写");
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
      alert("可能写错指令了，或者我没支持上...");
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
}

btn.addEventListener("click", getRes);
// let s = "add $5, $6, $5";

const explain = document.getElementById("explain");

explain.addEventListener('click', ()=>{
  alert(`
  使用须知：
  **重要：请一定要确保转换前输入的指令格式是对的，指令格式要求必须要英文逗号并且逗号后面打一个空格，并且末尾不需要加任何东西！并且，本网页并没有实现全部的指令，有部分指令如lbu，sw，sh，sb，lw，lhu等没有写（因为老学长当年选的项目没用到这几个指令）。
  **注意，如果指令是对的但是格式错误/部分使用方式错误情况，结果会出现undefined，但是如果是使用方式错了，本页面没有细致检查使用方式正确与否的功能，所以会正常译码，此时结果会看着没问题（但是这个就会出大问题了）
  关于本网页：本网页是老学长自己写来自己用的，本着互帮互助的心态分享给大家。
  本网页汇编命令转到机器码没有任何问题，已经经过了老学长亲自使用测试了，拿下了计组课设95+。
  最后：加油各位！实在不会就什么chatGPT，New Bing，文心一言用起来啊！嘎嘎好用啊家人们！
`);
});

btnReset.addEventListener('click', ()=>{
  input.value = ""; 
  result.innerHTML=""; 
  result16.innerHTML="";
});