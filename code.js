function toast({title = '', msg = '', type = 'success', duration = 300}) {
    // tạo ra một list icon tuỳ thuộc vào kiểu type
    const icons = {
        success: 'fa-solid fa-circle-check',
        info: 'fa-solid fa-circle-info',
        warning: 'fa-sharp fa-solid fa-circle-exclamation',
        error: 'fa-solid fa-circle-xmark'
    }
    // lấy được icon dựa vào kiểu type
    const icon = icons[type]
    // lấy ID toast
    const main = document.getElementById('toast')
    // kiểm tra xem #toast có nằm trong chương trình hay không
    if (main){
        // tự tạo ra một thẻ div
        const toast = document.createElement('div')

        // xoá phần thông báo đã được gán ra khỏi DOM, vì nếu không thì thông báo mới sẽ xuất hiện ở phía dưới
        // liên tục, nên ta cần remove ra khỏi DOM để có thể trồi lên trên
        const autoremove = setTimeout(function() {
            main.removeChild(toast)
        },duration + 1000)
        // (lỗi xem ở trong video về phần remove này)

        // lắng nghe sự kiện click vào dấu tắt 
        toast.onclick = function(e){
            if (e.target.closest('.toast__close')){
                // đối với closet thì cần có dấu . trước tên class
                main.removeChild(toast)
                // bị lỗi về DOM nên phải đưa phần tự động tắt thông báo ở lên trên
                // khi sử dụng tắt thủ công thì việc tự động tắt phải được clear
                // để tránh trường hợp lỗi về DOM
                // lỗi này là do thời gian không được đồng bộ, vì nếu ta chọn tự động tắt nhưng 6(duration +1s) giây sau 
                // autoremove mới thực hiện thì sẽ chồng lẫn lên nhau gây ra lỗi
                clearTimeout(toast)
            }
        }
        
        // trong thẻ div đó có tên class là toast
        toast.classList.add('toast', `toast--${type}`)
        const delay = (duration/1000).toFixed(2)
        toast.style.animation= `appear ease-in-out .3s, fadeout linear 1s ${delay}s forwards`
        // in ra màn hình
        toast.innerHTML  = 
        ` 
        <div class="toast__icon">
            <i class="${icon}"></i>
        </div>
        <div class="toast__body">
            <div class="toast__title">${title}</div>
            <div class="toast__msg">${msg}</div>
        </div>
        <div class="toast__close">
            <i class="fa-solid fa-circle-xmark"></i>
        </div>
        `
        // gán những gì ở trên vào sau thẻ id toast
        main.appendChild(toast);
    }
}
function showsuccess(){
toast({
title: 'Thành công',
msg: 'Kết nối thành công với khách hàng',
type: 'success',
duration: 5000
})
}
function showerror(){
toast({
title: 'Thất bại',
msg: 'Kết nối thất bại với khách hàng',
type: 'error',
duration: 3000
})
}
