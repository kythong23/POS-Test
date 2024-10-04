import { Table } from "../js/table.js";
// localStorage.clear();
$.getJSON("../json/table.json",
    function (json, textStatus, jqXHR) {
        let data = localStorage.getItem("dataJson");
        if(data == null || data == "null"){
            data = json;
            localStorage.setItem("dataJson",JSON.stringify(json));
        }
        else{
            data = JSON.parse(localStorage.getItem("dataJson"));
        }
        for(let key in data){
            let id = key.split(" ");
            let idtable;
            if(id[2]==undefined){
                idtable = id[0]+id[1]
            }
            else{
                idtable = id[0]+id[1]+id[2]
            }
            if(key!=="Quầy chờ"){
                var tablecategory = `<button class="btn btn-soft-blue btn-lg waves-effect waves-light tablecate" style="margin: 5px;"><div style="width: 115px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">${key}</div></button>`;
                $(`#tablecategory`).append(tablecategory);
            }
            var tableDiv=`<span class="idtable" id="${idtable}"></span>`;
            $(`#wraptable`).append(tableDiv);
            for(let value of data[key]){
                let tablename=value.name;
                let tablestatus;
                switch (value.status){
                    case 0:
                        tablestatus = "btn-soft-secondary";
                        break;
                    case 1:
                        tablestatus = "btn-warning";
                        break;
                    case 2:
                        tablestatus = "btn-danger";
                        break;
                    case 3:
                        tablestatus = "btn-success";
                        break;
                }
                var table = `
                <button class="btn ${tablestatus} btn-lg waves-effect waves-light tabledetail" style="margin: 5px 0px 5px 10px;width:80px;  padding: 8px 10px;"><div style="width:61px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${tablename}</div></button>
            `;
            $(`#${idtable}`).append(table);
            $('.tabledetail').on(`click`, function () {
                if(tablename == $(this).text()){
                    let table = new Table(value.id,value.name,value.status);
                    window.location.href=`./cart.html?tableData=${encodeURIComponent(JSON.stringify(table))}`;
                    }
                });
            }
        }
        //Tạo CSS cho các button khi chọn các khu vực bàn
        $(`.tablecate`).on(`click`, function () {
            $(`.tablecate`).each(function (indexInArray, valueOfElement) { 
                $(this).css(`background-color`, ``)
                .css('color','');  
            });
            //Hiển thị bàn từng khu vực khi click vào các khu
            let idSpan = $(this).text().replace(/\s/g, '');
            // let span;
            // if(idSpan[2]==undefined){
            //     span = idSpan[0]+idSpan[1]
            // }
            // else{
            //     span = idSpan[0]+idSpan[1]+idSpan[2]
            // }
            if(idSpan!="Tấtcả/All"){
                $(`.idtable`).each(function (index, element) {
                    let id = $(element).attr('id');
                    $(this).toggle(id == idSpan);
                });
            }
            else{
                $(`.idtable`).each(function (index, element) {
                    let id = $(element).attr('id');
                    $(this).show();;
                });
            }
        });
});
//Menu báo cáo 
let openbaocao = false;
$(document).on(`click`, function (e) {
    // if($(`#reportmenu`).has(e.target).length!=1){
    //     $(`.dropdown-menu`).remove();
    //     openbaocao = false;
    // }
});
$(document).on(`click`,`.report`, function () {
    if(openbaocao==true){
        $(`.dropdown-menu`).remove();
        openbaocao=!openbaocao;
    }
    else{
        let content=`<div class="dropdown-menu show dropdownreport" x-placement="top-start"
        style="position: absolute;will-change: transform;left: 61px;bottom: -116%;transform: translate3d(0px, -162px, 0px);">
         <a class="dropdown-item" href="#">Báo cáo tổng hợp doanh thu ngày / Daily report</a>
         <a class="dropdown-item" href="#">Báo cáo tổng hợp bán theo nhóm + món ăn / Item report 2</a>
         <a class="dropdown-item" href="#">Báo cáo doanh thu theo nhân viên / Sales Report 2</a>
         <a class="dropdown-item" href="#">Báo cáo doanh thu theo ngày / Daily Report 3</a>
     </div>`;
    $(`#reportmenu`).append(content);
    openbaocao=!openbaocao;
    }
});
//Menu quản trị
let openquantri = false;
$(document).on(`click`, function (e) {
    if(($(`#quantrimenu`).has(e.target).length==0 && $(`#reportmenu`).has(e.target).length==0)){
        $(`.dropdown-menu`).remove();
        openquantri = false;
        openbaocao = false;
    }
    else if($(`#quantrimenu`).has(e.target).length==1){
        $(`.dropdownreport`).remove();
        openbaocao = false;
    }
    else if($(`#reportmenu`).has(e.target).length==1){
        $(`.dropdownquantri`).remove();
        openquantri = false;
    }
});
$(document).on(`click`,`.quantri`, function () {
    if(openquantri==true){
        $(`.dropdown-menu`).remove();
        openquantri=!openquantri;
    }
    else{
        let content=`<div class="dropdown-menu show dropdownquantri" x-placement="top-start"
        style="position: absolute;will-change: transform;left: 61px;bottom: -116%;transform: translate3d(0px, -162px, 0px);">
         <a class="dropdown-item" href="#">Danh mục món ăn và định lượng/ Item list</a>
         <a class="dropdown-item" href="#">Danh mục giá bán</a>
         <a class="dropdown-item" href="#">Phiếu bán hàng (POS)</a>
         <a class="dropdown-item" href="#">Phiếu bán hàng (Sửa hình thức thanh toán)</a>
     </div>`;
    $(`#quantrimenu`).append(content);
    openquantri=!openquantri;
    }
});
