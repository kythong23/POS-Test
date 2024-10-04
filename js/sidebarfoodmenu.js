import { Food, MinusItem } from './model.js'; 
import { addItem } from "./model.js";
import { deleteItem } from "./model.js";
import { addOrder, inputDiscount, inputVoid } from "./divmodel.js";
import { removeOrder } from "./divmodel.js";
import { removeCheckout, addPay } from "./divmodel.js";
import { noSearchResult } from "./divmodel.js";
import { addCheckout } from "./divmodel.js";
// localStorage.clear();
localStorage.removeItem("cart");
window.onload = function () {
    let urlParams = new URLSearchParams(window.location.search);
    let cart = localStorage.getItem("cart");
    let tableData =JSON.parse(decodeURIComponent(urlParams.get('tableData')));
    $(`#tableNumber`).val(tableData.id);
    //Hiển thị lịch sử đặt món
    let totalmoney = parseInt(localStorage.getItem(`totalmoney${tableData.id}`),10);
    let tableHistory = (JSON.parse(localStorage.getItem(`${tableData.id}`)));
    let total = 0;
    let amount = 0;
    $.each(tableHistory, function (indexInArray, valueOfElement) { 
         $.each(valueOfElement, function (indexInArray, valueOfElement) { 
            $.each(valueOfElement, function (indexInArray, valueOfElement) { 
                amount+=(parseInt(valueOfElement.amount,10));
                total += (parseInt(valueOfElement.price,10)*valueOfElement.amount);
                if(valueOfElement.amount!=0){
                    let content = `<tr>
                    <td style="font-weight:500;width:60%">${valueOfElement.name}</th>
                    <td style="font-weight:500; width: 20%">${valueOfElement.amount}</th>
                    <td style="font-weight:500">${valueOfElement.price}</th>
                </tr>`;
                $(`#orderhistory`).append(content);
                }
            });
         });
    });
    let content =` <tfoot>
                                    <tr>
                                       <td colspan="5">
                                            <div style="text-align: right !important;">Tổng tiền: ${new Intl.NumberFormat('ja-JP').format(//Format tiền (100000 -> 100,000)
                                                total,
                                              )},000₫</div>
                                        </td>
                                    </tr>
                            </tfoot>`;
            $(`#tfoottable`).append(content);
    //Css bảng lịch sử đặt món
    if($(`#bodytable`).height()<420){
        $(`#bodytable`).css("margin-right", "10px");
    }
    if(cart==null){
        let cart = [];
        localStorage.setItem("cart",JSON.stringify(cart));
        removeOrder();
    }
    else{
        if(JSON.parse(localStorage.getItem("cart")).length!=0 && localStorage.getItem("count")!=0){
            addOrder(tableData.id);
        }
        else{
            removeOrder();
        }
    }
    let closeBtn = document.getElementById("closeIcon")
    closeBtn.onclick = function () {
        document.getElementById("hiddenMenu").style.left = "-300px";
    }
    document.getElementById("showMenu").onclick = function () {
        document.getElementById("hiddenMenu").style.left = "0px";
        document.getElementById("hiddenMenu").style.transition = "0.5s cubic-bezier(.36,-0.01,0,.77)";
    }
//Format tiền (100000 -> 100,000)
function formatMoney() { 
    totalmoney = parseInt(localStorage.getItem(`totalmoney${tableData.id}`),10);
    $(".totalmoney").text(new Intl.NumberFormat('ja-JP').format(//Format tiền (100000 -> 100,000)
        totalmoney,
      ),);
 }
 //Tổng số lượng trong giỏ hàng
 function totalAmount(cart,count) {
    cart.forEach(element => {
        count += element.amount;
    });
    $(`#total`).text(`Đã chọn (${count})`);
    $("#carttotal").text(count); 
    return count;
 }
$(document).on('click','.btnMinus', function () {
    let count = 0;
    let id = (this.id.match(/\d+/)[0]);
    let img;
    if($("#foodImg").text()==`GỎ`){
        img = "blank";
    }
    else{
        img = "noblank"
    }
    let name = $("#foodName").text();
    let price= $("#foodPrice").text();
    var food = new Food(id,img,name,price);
    MinusItem(food,tableData.id);//Xóa hàng khỏi giỏ
    cart = JSON.parse(localStorage.getItem("cart"));//Lấy giỏ hàng từ localStorage
    cart.forEach(element => {//Hiển thị số lượng từng mặt hàng
        $(`.itemCount${element.foodid}`).text(element.amount);
        if(element.amount==0){
            $(`#ordered${element.foodid}`).hide();
            $(`#minusGroup${element.foodid}`).hide();
            $(`.detail${element.foodid}`).hide();
        } 
    });
    count = totalAmount(cart,count);
    formatMoney();
    localStorage.setItem("count",count);
    if(count == 0){
        removeCheckout();
        removeOrder();
    }
})
$(document).on('click','.btnAdd', function () {//Nên sử dụng jqOn thay jqClick để bắt được các element sau khi DOM hoàn thành, jqClick đôi khi sẽ
    // lỗi vì element chưa được khởi tạo
    let count = 0;
    let id = (this.id.match(/\d+/)[0]); // Lấy số của id thẻ được click vào (VD: lấy 1 từ foodid1)
    let img;
    if($("#foodImg").text()==`GỎ`){
        img = "blank";
    }
    else{
        img = "noblank"
    }
    let name = $(`#foodName${id}`).text();
    let price= $(`#foodPrice${id}`).text();
    var food = new Food(id,img,name,price);
    if(localStorage.getItem("cart")=="[]" || localStorage.getItem("count") == 0)
        {
            addOrder(tableData.id);
        }
    addItem(food,tableData.id); //Thêm thức ăn vào giỏ
    formatMoney();
    $(`#minusGroup${id}`).show();
    cart = JSON.parse(localStorage.getItem("cart"));
    count = totalAmount(cart,count);
    localStorage.setItem("count",count);
    cart.forEach(element => {//Hiển thị số lượng từng mặt hàng
        $(`.itemCount${element.foodid}`).text(element.amount);
        if(element.amount!=0){
            $(`#ordered${element.foodid}`).show();
        }
    });
    if(isNaN(count))
        count = 0 ;
    $(`.successnotification`).show();
    $(`.successnotification`).delay(2000).fadeOut(1000);
});
$(document).on('click',`.deletebtn`, function () {
    let count = 0;
    let id = (this.id.match(/\d+/)[0]);
    let img;
    if($("#foodImg").text()==`GỎ`){
        img = "blank";
    }
    else{
        img = "noblank"
    }
    let name = $("#foodName").text();
    let price= $("#foodPrice").text();
    var food = new Food(id,img,name,price);
    deleteItem(food,tableData.id);//Xóa hàng khỏi giỏ
    cart = JSON.parse(localStorage.getItem("cart"));//Lấy giỏ hàng từ localStorage
    cart.forEach(element => {//Hiển thị số lượng từng mặt hàng
        $(`.itemCount${element.foodid}`).text(element.amount);
        if(element.amount==0){
            $(`#ordered${element.foodid}`).hide();
            $(`#minusGroup${element.foodid}`).hide();
            $(`.detail${element.foodid}`).hide();
        } 
    });
    cart.forEach(element => {//Hiển thị số lượng từng mặt hàng
        $(`.itemCount${element.foodid}`).text(element.amount);
        if(element.amount==0){
            $(`#ordered${element.foodid}`).hide();
            $(`#minusGroup${element.foodid}`).hide();
            $(`.detail${element.foodid}`).hide();
        } 
    });
    formatMoney();
    count = totalAmount(cart,count);
    if(count == 0){
        removeCheckout();
        removeOrder();
    }
});
    $(`#search_qr`).on("keyup", function () {//Function search  
        var num = 0;
        var searchstring = $(this).val().toLowerCase();
        $(`#food-container #search`).filter(function(){ //Lọc các món ăn theo ký tự được viết trong ô search
            $(this).toggle($(this).text().toLowerCase().indexOf(searchstring)> -1);
        })
        $(`.catename`).each(function(){ // Lọc loại thức ăn theo món đang được tìm kiếm
            var checkfood=false;
            $(this).find(`.food-item`).each(function(){ 
                var foodname=$(this).find(`.foodname`).text().toLowerCase();
                var noresult=parseInt(foodname.indexOf(searchstring),10);
                num += noresult;
                if((foodname).indexOf(searchstring)>-1){
                    checkfood = true;
                }
            })
            $(this).toggle(checkfood);
        })
        if(num<0){
            noSearchResult();
        }
        else{
            $(`.nors`).remove();
        }
    });
    //Scroll màn hình vào cate món khi bấm vào bên menu
    $(document).on("click",`.namecate`, function (e) {
        //CSS cate đã được click vào
        $(`.namecate`).each(function (indexInArray, valueOfElement) { 
             if($(valueOfElement).text()===$(e.target).text()){
                $(`.namecate`)
                    .css("color","")
                    .css("font-weight","");
                $(e.target)
                    .css("color","red")
                    .css("font-weight","bold");
                    //Scroll màn hình xuống loại thức ăn đã chọn ở bảng menu
                $(`#food-container`).find(`.catename`).find(`.cate-name`).each(function (indexInArray, valueOfElement) { 
                    if($(valueOfElement).text()===$(e.target).text()){
                        var targetmenu = $(valueOfElement).attr(`class`).split(" ")[0];
                        $(`html,body`).animate({
                            scrollTop: $(`.${targetmenu}`).offset().top-200
                        },100)
                    }
                });
             }
        });
    });
    //Tắt màn hình thanh toán khi bấm ra ngoài
    $(document).on('click', function (e) {
        if($(e.target)[0].id==="none presentation"){
            removeCheckout();
            addOrder(tableData.id);
        }
    });
    //Cập nhật giá trị status của bàn
    function updateTable() { 
        let dataJson = JSON.parse(localStorage.getItem("dataJson"));
        $.each(dataJson, function (indexInArray, valueOfElement) { 
            if(valueOfElement.find(item=> item.id === tableData.id)!= undefined){
                let table =valueOfElement.find(item=> item.id === tableData.id);
                table.status = 1;
            }
        });
        localStorage.setItem("dataJson",JSON.stringify(dataJson));
     }
    //Lưu lịch sử order món của bàn
    $(document).on('click','#orderButton', function () {
        let props = tableData.id;
        let content =`<div class="modal fade show" id="centermodal" z-index="1400" role="dialog" style="padding-right: 17px; display: block;z-index:1301    " aria-modal="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="myCenterModalLabel">Xác nhận đặt món</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <hr style="border: 1px solid black;margin: 0">
                        <div class="modal-body">
                            <h5 style="display: flex;justify-content: center;">Kiểm tra thật kỹ lần nữa nào</h5>
                            <div class="swal2-success-ring"></div>
                            <div style="display: flex;justify-content: center;">
                                <button class="ladda-button btn btn-warning" dir="ltr" data-style="zoom-out"><span class="ladda-label">Xác nhận
                                                </span><span class="ladda-spinner"></span><div class="ladda-progress" style="width: 0px;"></div></button>
                            </div>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div>
        <div class="modal-backdrop fade show" style="z-index: 1300;"></div>`;
        $(`#__next`).append(content);
        $(document).on(`click`,`.close`, function () {
            $(`#centermodal`).remove(); 
            $(`.modal-backdrop`).remove();
        });
        $(`.ladda-button`).on('click', function (a) {
            if(tableHistory == null){
                tableHistory = [];
                tableHistory.push({cart});
            }
            else{
                var cartid;
                var cartamount;
                var check = false;
                $.each(cart, function (indexInArray, valueOfElement) { 
                     cartid = valueOfElement.foodid;
                     cartamount = valueOfElement.amount;
                     $.each(tableHistory, function (indexInArray, valueOfElement) { 
                        $.each(valueOfElement, function (indexInArray, valueOfElement) {
                            if(valueOfElement.find(item=>item.foodid==cartid)!=undefined){
                                let history = valueOfElement.find(item=>item.foodid==cartid);
                                history.amount+=cartamount;
                                check =true;
                            } 
                        });
                    });
                });
                if(!check){
                    tableHistory.push({cart});
                }
            }
            localStorage.setItem(`${props}`,JSON.stringify(tableHistory));
            var $button = $(this); // Lưu nút hiện tại
            $button.prop('disabled', true); // Vô hiệu hóa nút
            $button.text('Loading...'); // Thay đổi văn bản nút

            // Giả lập tác vụ mất thời gian
            setTimeout(function() {
                $(`#centermodal`).remove(); 
                $(`.modal-backdrop`).remove();
            }, 2000);
            $(`#centermodal`).delay(1800).hide(500);
            setTimeout(function() {
                let content = `<div class="modal fade show" id="centermodal" z-index="1400" role="dialog" style="padding-right: 17px; display: block;z-index:1301    " aria-modal="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title" id="myCenterModalLabel">Xác nhận đặt món</h4>
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    </div>
                                    <hr style="border: 1px solid black;margin: 0">
                                    <div class="modal-body">
                                        <div style="display: flex;justify-content: center;"><div class="success-checkmark">
                                            <div class="check-icon">
                                              <span class="icon-line line-tip"></span>
                                              <span class="icon-line line-long"></span>
                                              <div class="icon-circle"></div>
                                              <div class="icon-fix"></div>
                                            </div>
                                          </div></div>
                                          <h3 style="display: flex;justify-content: center;">Đặt món thành công</h3>
                                        <div class="swal2-success-ring"></div>
                                        <div style="display: flex;justify-content: center;">
                                            <button class="order-ladda-button btn btn-warning" dir="ltr" data-style="zoom-out"><span class="ladda-label">OK
                                                            </span><span class="ladda-spinner"></span><div class="ladda-progress" style="width: 0px;"></div></button>
                                        </div>
                                    </div>
                                </div><!-- /.modal-content -->
                            </div><!-- /.modal-dialog -->
                        </div>
                    <div class="modal-backdrop fade show" style="z-index: 1300;"></div>`;
                $(`#__next`).append(content); 
                $(`#centermodal`).hide();
                $(`#centermodal`).show(500);
            }, 2200);
        });
    });
    //Thanh toán
    $(document).on(`click`,`#checkoutBtn`, function () {
        addPay(tableData,tableHistory,amount,total);
    });
    //Nút back (quay lại) trong form thanh toán
    $(document).on('click',`#backcheckout`, function () {
        $(`#presentation`).fadeOut(500,function () {$(`#presentation`).remove(); });
    });
    //Thoát ra ngoài sau khi xác nhận đặt món
    $(document).on(`click`,`.order-ladda-button`, function () {
        updateTable();
        $(`#centermodal`).remove(); 
        $(`.modal-backdrop`).remove();
        window.location.href="./tablemanage.html";
    });
    //Hiển thị chi tiết giỏ hàng 
    $(document).on('click',`#order`, function () {
        addCheckout(tableData.id);
        let cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach(element => {
        if(element.amount!=0){
            $(`.detail-item`).append(`
                <div class="detail${element.foodid}" style="padding: 8px 16px;">
                        <div class="fl_line_c">
                            <div class="text-bold fl_g1 fs-16">${element.name}</div>
                            <div class="fl_line">
                                <div class="fl_line" style="visibility: visible;align-items:center">
                                <div class="text-bold" style="padding-right: 4px;">${element.price}</div>
                                <button
                                        class="btnMinus" id="foodid${element.foodid}" style="background-color: white;border-style: none;><span
                                            class="style_icon_button_label__2x70B"><svg class="icon_28" width="28"
                                                height="28" viewBox="0 0 28 28" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M14 0C6.272 0 0 6.272 0 14C0 21.728 6.272 28 14 28C21.728 28 28 21.728 28 14C28 6.272 21.728 0 14 0ZM2.8 14C2.8 20.174 7.826 25.2 14 25.2C20.174 25.2 25.2 20.174 25.2 14C25.2 7.826 20.174 2.8 14 2.8C7.826 2.8 2.8 7.826 2.8 14ZM7 12.6V15.4H21V12.6H7Z"
                                                    fill="#0088FF"></path>
                                            </svg></span><span
                                            class="style_touch_ripple_root__1cNes"></span></button><span class="itemCount${element.foodid}"
                                        style="margin: 6px 0px;">${element.amount}</span></div><button
                                    class="btnAdd" id="foodid${element.foodid}" style="background-color: white;border-style: none;><span
                                        class="style_icon_button_label__2x70B"><svg class="icon_28" width="20"
                                            height="20" viewBox="0 0 20 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                                                fill="#0088FF"></path>
                                            <path
                                                d="M13.8889 10.5548H10.5556V13.8881H9.44445V10.5548H6.11111V9.44368H9.44445V6.11035H10.5556V9.44368H13.8889V10.5548Z"
                                                fill="#F3F4F5"></path>
                                        </svg></span><span class="style_touch_ripple_root__1cNes"></span></button>
                                    <div class="fl_line" style="align-items:center">Ghi chú món</div>
                                    <div class="fl_line" style="align-items:center; margin-left: 10px;"><i id="foodid${element.foodid}" class="deletebtn fa-solid fa-circle-xmark fa-2xl" style="color: #ff0000;"></i></div>
                            </div>
                        </div>
                    </div>
                </div>`)
            }
        });
    });
    //Mở form nhập chiết khấu
    $(document).on('click',`.chooseDiscount`, function () {
        inputDiscount();
    });
    //Xác nhận chiết khấu
    $(document).on('click',`.discountBtn`, function () {
        let discount = $(`#discountInput`).val();
        $(`#presentation`).remove(); 
        addPay(tableData,tableHistory,amount,total,discount);
    });
    $(document).on(`click`,`.close`, function () {
        $(`.inputDiscount`).remove(); 
    });
    //Mở form trả món
    $(document).on('click',`.chooseVoid`, function () {
        inputVoid();
    });
    $(document).on('click','.payDetail', function (e) {
        console.log("ok");
        $(`.chooseVoid`).prop('disabled', false);
    });
}