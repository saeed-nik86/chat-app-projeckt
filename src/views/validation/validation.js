// import Vue from 'vue'
/**
 * @param {string} txt
 * @returns {Boolean}
 *
 */

//  حروف فارسی و فاصله و عدد؛ فاصله و عدد اول  قبول نمی کنه
export function validtextcheck(txt, title, min, max) {
  var msg = ''
  var validtext = /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AFa-z0-9 ]+$/
  if (txt === null || txt === '' || txt === 'undefined') {
    title + ' را وارد کنید. '
    return msg
  } else if (!(txt.match(validtext))) { return title + ' شامل حروف فارسی نمیباشد.' } else if (txt.length < min || txt.length > max) { return 'طول ' + title + ' بیشتر از ' + min + ' و کمتر از ' + max + 'میباشد.' } else { return msg }
}
// حروف فارسی انگلیسی عدد
export function validtextnumcheck(txt, title, min, max) {
  var msg = ''
  var validnum = /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AFa-z0-9 ]+$/
  if (txt === null || txt === '' || txt === 'undefined') {
    title + ' را وارد کنید. '
    return msg
  } else if (!(txt.match(validnum))) { return title + ' شامل حروف فارسی انگلیسی و عدد میباشد.' } else if (txt.length < min || txt.length > max) { return 'طول ' + title + ' بیشتر از ' + min + ' و کمتر از ' + max + 'میباشد.' } else { return msg }
}

// حروف انگلیسی عدد و . و_و- برای نام کاربری
export function validusercheck(txt, title, min, max) {
  var msg = ''
  var validnum = /^[a-zA-Z0-9_.-]*$/
  if (txt === null || txt === '' || txt === 'undefined') {
    title + ' را وارد کنید. '
    return msg
  } else if (!(txt.match(validnum))) { return title + ' شامل حروف انگلیسی و عدد و کاراکتر های نقطه،آندرلاین،دش میباشد.' } else if (txt.length < min || txt.length > max) { return 'طول ' + title + ' بیشتر از ' + min + ' و کمتر از ' + max + 'میباشد.' } else { return msg }
}

// فقط عدد میگیرد
export function validnumcheck(txt, title, min, max) {
  if (txt != null) { txt = txt.toString() }
  var msg = ''
  var validnum = /^\d+$/
  if (txt === null || txt === '' || txt === 'undefined') { return title + ' را وارد کنید. ' } else if (!(txt.match(validnum))) { return title + ' شامل عدد نمیباشد.' } else if (txt.length < min || txt.length > max) { return 'طول ' + title + ' بیشتر از ' + min + ' و کمتر از ' + max + 'میباشد.' } else { return msg }
}

// شامل حروف انگلیسی وآندرلاین و عدد بدون فاصله برای پسورد
export function validenPasswordcheck(txt, title, min, max) {
  var msg = ''
  var validtext = /(?=^.{8,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/
  if (txt === null || txt === '' || txt === 'undefined') { return title + ' را وارد کنید. ' } else if (!(txt.match(validtext))) { return title + ' شامل حروف بزرگ و کوچک انگلیسی، عدد و حداقل 8 کاراکتر باشد.' } else if (txt.length < min || txt.length > max) { return 'طول ' + title + ' بیشتر از ' + min + ' و کمتر از ' + max + 'میباشد.' } else { return msg }
}

// حروف فارسی و فاصله؛ فاصله اول  قبول نمی کنه
export function validtextpersiancheck(txt, title, min, max) {
  var msg = ''
  var validtext = '^(?![ ])(?=[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC ]+$)'
  if (txt === null || txt === '' || txt === 'undefined') { return title + ' را وارد کنید. ' } else if (!(txt.match(validtext))) { return title + ' شامل حروف فارسی نمیباشد.' } else if (txt.length < min || txt.length > max) { return 'طول ' + title + ' بیشتر از ' + min + ' و کمتر از ' + max + 'میباشد.' } else { return msg }
}

// حروف فارسی بدون فاصله و دیگر کارکترها
export function validtextnocharactercheck(txt, title, min, max) {
  var msg = ''
  var validtext = '^[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC]+$'
  if (txt === null || txt === '' || txt === 'undefined') { return title + ' را وارد کنید. ' } else if (!(txt.match(validtext))) { return title + ' شامل حروف فارسی میباشد.' } else if (txt.length < min || txt.length > max) { return 'طول ' + title + ' بیشتر از ' + min + ' و کمتر از ' + max + 'میباشد.' } else { return msg }
}

// اول فارسی بعد هر چی وارد کرد برای توضیحات خوبه
export function validtextallcheck(txt, title, min, max) {
  var msg = ''
  var validtext = '(^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF،]+)[]*'
  if (txt === null || txt === '' || txt === 'undefined') { return title + ' را وارد کنید. ' } else if (!(txt.match(validtext))) { return title + ' شامل حروف فارسی میباشد.' } else if (txt.length < min || txt.length > max) { return 'طول ' + title + ' بیشتر از ' + min + ' و کمتر از ' + max + 'میباشد.' } else { return msg }
}

// شامل حروف انگلیسی وآندرلاین بدون فاصله و دیگر کارکترها (آندرلاین اول و آخر قبول نمی کنه
export function validen_nocharactercheck(txt, title, min, max) {
  var msg = ''
  var validtext = /^(?![_])(?=[a-zA-Z_]+(?<![_])$)/
  if (txt === null || txt === '' || txt === 'undefined') { return title + ' را وارد کنید. ' } else if (!(txt.match(validtext))) { return title + ' شامل حروف انگلیسی میباشد.' } else if (txt.length < min || txt.length > max) { return 'طول ' + title + ' بیشتر از ' + min + ' و کمتر از ' + max + 'میباشد.' } else { return msg }
}

// حروف انگلیسی عدد
export function validennumcheck(txt, title, min, max) {
  var msg = ''
  var validnum = /^[a-z0-9 ]+$/
  if (txt === null || txt === '' || txt === 'undefined') {
    title + ' را وارد کنید. '
    return msg
  } else if (!(txt.match(validnum))) { return title + ' شامل حروف انگلیسی و عدد میباشد.' } else if (txt.length < min || txt.length > max) { return 'طول ' + title + ' بیشتر از ' + min + ' و کمتر از ' + max + 'میباشد.' } else { return msg }
}

// اول انگلیسی و عدد  بعد هر چی وارد کرد
export function validenglishallcheck(txt, title, min, max) {
  var msg = ''
  var validtext = /[a-zA-Z0-9]+/
  if (txt === null || txt === '' || txt === 'undefined') { return title + ' را وارد کنید. ' } else if (!(txt.match(validtext))) { return title + ' شامل حروف انگلیسی میباشد.' } else if (txt.length < min || txt.length > max) { return 'طول ' + title + ' بیشتر از ' + min + ' و کمتر از ' + max + 'میباشد.' } else { return msg }
}

// برای تلگرام
export function validtelegramcheck(txt, title, min, max) {
  var msg = ''
  var validtext = /^(?![_0-9])(?=[a-zA-Z0-9_]{5,150}$)/
  if (txt === null || txt === '' || txt === 'undefined') { return title + ' را وارد کنید. ' } else if (!(txt.match(validtext))) { return title + ' دارای فرمت نامعتبر است.' } else if (txt.length < min || txt.length > max) { return 'طول ' + title + ' بیشتر از ' + min + ' و کمتر از ' + max + 'میباشد.' } else { return msg }
}

// برای موبایل
export function validmobailecheck(txt, title, min, max) {
  var msg = ''
  var validtext = /9(1[0-9]|3[1-9]|2[1-9]|0[1-9])-?[0-9]{3}-?[0-9]{4}/
  if (txt === null || txt === '' || txt === 'undefined') { return title + ' را وارد کنید. ' } else if (!(txt.match(validtext))) { return title + ' دارای فرمت نامعتبر است.' } else if (txt.length < min || txt.length > max) { return 'طول ' + title + ' بیشتر از ' + min + ' و کمتر از ' + max + 'میباشد.' } else { return msg }
}

// برای تلفن
export function validphonecheck(txt, title, min, max) {
  var msg = ''
  var validtext = /[1-9][0-9]{7}/
  if (txt === null || txt === '' || txt === 'undefined') { return title + ' را وارد کنید. ' } else if (!(txt.match(validtext))) { return title + ' دارای فرمت نامعتبر است.' } else if (txt.length < min || txt.length > max) { return 'طول ' + title + ' بیشتر از ' + min + ' و کمتر از ' + max + 'میباشد.' } else { return msg }
}

// برای ایمیل
export function validemailcheck(txt, title, min, max) {
  var msg = ''
  var validtext = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
  if (txt === null || txt === '' || txt === 'undefined') { return title + ' را وارد کنید. ' } else if (!(txt.match(validtext))) { return title + ' دارای فرمت نامعتبر است.' } else if (txt.length < min || txt.length > max) { return 'طول ' + title + ' بیشتر از ' + min + ' و کمتر از ' + max + 'میباشد.' } else { return msg }
}

// برای دراپ ها که به انتخاب کنید گیر میده
export function validdrop(value, title) {
  var msg = ''
  if (value === '0' || value === '' || value === 'undefined' || value === null) { return title + ' را انتخاب کنید. ' } else { return msg }
}

// برای دراپ ها که به انتخاب کنید گیر میده
export function validdropfilter(value, title) {
  var msg = ''
  if (value === '0' || value === '' || value === 'undefined' || value === null) { return 'حداقل یکی از' + title + 'را انتخاب کنید.' } else { return msg }
}

// برای تاریخ ها
export function validdatecheck(txt, title) {
  var msg = ''
  var validdate = /^[1-4]\d{3}\/((0?[1-6]\/((3[0-1])|([1-2][0-9])|(0?[1-9])))|((1[0-2]|(0?[7-9]))\/(30|([1-2][0-9])|(0?[1-9]))))$/
  if (txt === null || txt === '' || txt === 'undefined') { return title + ' را وارد کنید. ' } else if (!(txt.match(validdate))) { return title + ' معتبر نمیباشد. ' } else { return msg }
}

// برای ساعت در این فرمت 12:25:00
export function validtimethcheck(txt, title) {
  if (txt != null) { txt = txt.toString() }
  var msg = ''
  var validtime = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])|:([0-5][0-9])?$/
  // var validtime = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])/;
  if (txt === null || txt === '' || txt === 'undefined') { return title + ' را وارد کنید. ' } else if (!(txt.match(validtime))) { return title + ' معتبر نمیباشد. ' } else { return msg }
}

// برای ساعت در این فرمت 12:25
export function validtimecheck(txt, title) {
  if (txt != null) { txt = txt.toString() }
  var msg = ''
  var validtime = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])?$/
  // var validtime = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])/;
  if (txt === null || txt === '' || txt === 'undefined') { return title + ' را وارد کنید. ' } else if (!(txt.match(validtime))) { return title + ' معتبر نمیباشد. ' } else { return msg }
}

// برای ساعت سه رقمی در این فرمت 12:25
export function validtimethreecheck(txt, title) {
  if (txt != null) { txt = txt.toString() }
  var msg = ''
  var validtime = /^([0-9]{2}|[0-9]{3}):[0-5][0-9]$/
  if (txt === null || txt === '' || txt === 'undefined') { return title + ' را وارد کنید. ' } else if (!(txt.match(validtime))) { return title + ' معتبر نمیباشد. ' } else { return msg }
}
// export function validdelete() {
//     // Vue.prototype.$message({
//     //     message: 'Copy successfully',
//     //     type: 'success',
//     //     duration: 1500
//     //   });
//     var msg = '';
//         return "آیا از حذف خود مطمئن هستید؟";
// }
import { Notification } from 'element-ui'
export function validdelete() {
  Notification({
    title: 'انجام نشد',
    message: 'چرا درست نمیشی اخه؟',
    type: 'warning',
    button: 'Confirm',
    cancelButtonText: 'false',
    confirmButtonText: 'false',
    onClick() {
      // console.log("ok");
    }
  })
}
// export function alert(msg) {
//     swal({
//         title: "انجام نشد",
//         text: msg.join("\n"),
//         icon: "warning",
//         button: "متوجه شدم",
//     });
// }

export function alert(msg) {
  var message = msg.join('\r\n').replace(/<[^>]+>/g, '')
  Notification({
    title: 'انجام نشد',
    message: message,
    type: 'warning',
    position: 'top-left',
    duration: 4000,
    dangerouslyUseHTMLString: false
  })
}
import { Loading } from 'element-ui'
export function loading(st) {
  let loadingInstance = Loading.service({ text: 'در حال بارگذاری...' }, { background: 'rgba(0, 0, 0, 0.7)' })
  if (st === true) { loadingInstance = Loading.service({ fullscreen: true }) } else loadingInstance.close()
}
