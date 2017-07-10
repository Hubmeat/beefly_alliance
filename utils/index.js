/**
 * 原生js仿 jq的 Siblings()兄弟选择器
*/
export function siblings (elem) {
  var nodes = [] // 定义一个数组，用来存elem的兄弟元素
  var previ = elem.previousSibling
  while (previ) { // 先取o的哥哥们判断有没有上一个哥哥元素，如果有则往下执行previ表示previousSibling
    if (previ.nodeType === 1) {
      nodes.push(previ)
    }
    previ = previ.previousSibling // 最后把上一个节点赋给previ
  }
  nodes.reverse()
  var nexts = elem.nextSibling // 再取elem的弟弟
  while (nexts) { // 判断有没有下一个弟弟结点nexts是nextSibling的意思
    if (nexts.nodeType === 1) {
      nodes.push(nexts)
    }
    nexts = nexts.nextSibling
  }
  return nodes
}

/**
 * 邮箱验证
 */
export function isEmail (str) {
  var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+.)+[A-Za-z0-9]{2,3}$/
  if (myReg.test(str)) {
    return true
  } else {
    return false
  }
}
/**
 * 用途：检查输入手机号码是否正确
  输入：
  s：字符串
  返回：
  如果通过验证返回true,否则返回false
 */
export function checkMobile (s) {
  var regu = /^[1][3-9][0-9]{9}$/
  var re = new RegExp(regu)
  if (re.test(s)) {
    return true
  } else {
    return false
  }
}
/**
 * 验证非负正整数
 * @param {*} value
 */
export function checkPositiveNumber (value) {
  if (!isNaN(value)) {
     // 验证正整数包括0
    var bool = /^(0|[1-9][0-9]*)$/.test(value)
    return bool
  } else {
    return false
  }
}

/**
 * 用户名 验证 英文字母开头+ 数字组合
 */
export function checkUserName (string) {
  if (string !== '') {
    var reg = /^[a-zA-Z][\w]{0,}$/
    return reg.test(string)
  }
}
