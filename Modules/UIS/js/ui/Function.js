//**************************************************Cau hinh *************************************//
var AddressUrl = document.location.protocol + '//' + document.location.host; //Lay ten domain 
//*********************************************** End cau hinh **************************************//
function PopupDoiMatKhau() {
    window.open(AddressUrl + '/' + 'Modules/UIS/General/DoiMatKhau.aspx' + "?t=" + Math.random(), '_blank', 'scrollbars=1,status=1,width=600,height=400,');
}
function PopupCapNhatThongTin() {
    window.open(AddressUrl + '/' + 'Modules/UIS/StudentUC/ThongTin/AjaxCapNhatThongTin.aspx' + "?t=" + Math.random(), '_blank', 'scrollbars=1,status=1,width=700,height=500,');
}
function PopupSoSanhNganh(StudyProgramID) {
    window.open(AddressUrl + '/' + 'Modules/UIS/StudentUC/DangKi/SoSanhNganh.aspx?StudyProgramID=' + StudyProgramID , '_blank', 'scrollbars=1,status=1,width=700,height=500,');
}
function PopupCapNhatThongTin_pro() {
    window.open(AddressUrl + '/' + 'Modules/UIS/ProfessorUC/ThongTin/CapNhatThongTin.aspx' + "?t=" + Math.random(), '_blank', 'scrollbars=1,status=1,width=700,height=500,');
}
function PopupCapNhatXemThongTin(StudentID) {
    window.open(AddressUrl + '/' + 'Modules/UIS/StudentUC/ThongTin/XemThongTinSinhVien.aspx?ID=' +StudentID+ "&t=" + Math.random(), '_blank', 'scrollbars=1,status=1,width=900,height=700,');
}
////////////////////////////////////////////////////////////////////////////////
function Getketquahoctap(StudyProgramID, YearStudyID, TermID) {
    ProgressShow(); 
    var StudyProgram = $('#'+StudyProgramID).val();
    var YearStudy = $('#' + YearStudyID).val();
    var TermID = $('#'+TermID).val();
    var Mark = $('#Mark').val();
    var mypath = AddressUrl;
    jQuery("#divHienthiKQHT").html("<b style='color:red'>Đang tải dử liệu .....</b>");
    $.ajax({
        type: 'GET',
        url: mypath + '/Modules/UIS/StudentUC/AjaxXemDiem.aspx?StudyProgram=' + StudyProgram + '&YearStudy=' + YearStudy + '&TermID=' + TermID + '&Mark=' + Mark + '&t=' + Math.random(),
        async: true,
        dataType: 'html',
        success: function (html) {
            jQuery("#divHienthiKQHT").html(html);
            ProgressHide();
        },
    })
.fail(
    function (jqXHR, textStatus, err) {
        ProgressHide();
        DialogAlert("Lỗi kết nối", "Thời gian chờ quá lâu .Vui lòng đăng nhập lại !", "error");
    });
}


//************************************************** Dialog Jquery ui ***********************************************//
function DialogAlert(Title, Messages, type) { //type : '',error,info,question,warning
    $.messager.alert(Title, Messages, type);
}
//confirm delete dialog :
function ConfirmDelete(MaHocPhan) {
    $.messager.confirm("Lưu ý ", "Bạn có muốn xóa học phần '" + MaHocPhan + "' không ?", function (r) {
        if (r) {
            XoaHocPhan(MaHocPhan);
        }
        else {
            //false
        }
    });
}
//Show progresss , show screen right-botton

function Slide(Title_, Messages, time) {//Hien thị goc phai bên duoi man minh trong time giay .
    $.messager.show({
        title: Title_,
        msg: Messages,
        timeout: time,
        showType: 'slide'
    });
}
function Fade(Title_, Messages) { //Hien thi như slide nhưng ko tự động close
    $.messager.show({
        title: Title_,
        msg: Messages,
        timeout: 0,
        showType: 'fade'
    });
}
function ProgressShow() {
    var win = $.messager.progress({
        title: 'Please waiting...',
        msg: 'Đang xử lý . vui lòng đợi ...',
        interval: 1000
    });
}
function ProgressHide() {
    $.messager.progress('close');
}
//************************************************** End Dialog Jquery ui ***********************************************//
function GetChuongTrinhDaoTao(TermID_,StudyProgram_) {
    ProgressShow();
    var TermID = $('#' + TermID_).val();
    var StudyProgram = $('#' + StudyProgram_).val();
    //var TermName = $('#' + TermID_ + ':selected').text();// $("#ddlHocKy :selected").text();
    var sel = document.getElementById(TermID_);
    var TermName = sel.options[sel.selectedIndex].text;
    var mypath = AddressUrl;
    jQuery("#divHienthiKQHT").html("<b style='color:red'>Đang tải dử liệu .....</b>");
    $.ajax({
        type: 'GET',
        url: mypath + '/Modules/UIS/StudentUC/ChuongTrinhDaoTao/AjaxCTDT.aspx?TermID=' + TermID + '&TermName=' + TermName + '&STD=' + StudyProgram + '&t=' + Math.random(),
        async: true,
        dataType: 'html',
        success: function (html) {
            jQuery("#divHienthiKQHT").html(html);
            ProgressHide();
        },
    })
.fail(
    function (jqXHR, textStatus, err) {
        ProgressHide();
        DialogAlert("Lỗi kết nối", "Thời gian chờ quá lâu .Vui lòng đăng nhập lại !", "error");
    });
}

function GetNoiDungTinNhan(MessageID) {
    ProgressShow();
    var mypath = AddressUrl;
    jQuery("#divHienthiKQHT").html("<b style='color:red'>Đang tải dử liệu .....</b>");
    $.ajax({
        type: 'GET',
        url: mypath + '/Modules/UIS/General/LayNoiDungTinNhan.aspx?MessageID=' + MessageID +'&t=' + Math.random(),
        async: true,
        dataType: 'html',
        success: function (html) {
            jQuery("#divHienthiKQHT").html(html);
            ProgressHide();
        },
    })
.fail(
    function (jqXHR, textStatus, err) {
        ProgressHide();
        DialogAlert("Lỗi kết nối", "Thời gian chờ quá lâu .Vui lòng đăng nhập lại !", "error");
    });
}

function GetThoiKhoaBieu(ddlYearStudy, ddlTermID) {
    ProgressShow();
    var mypath = AddressUrl;
    var YearStudy = $('#' + ddlYearStudy).val();
    var TermID = $('#'+ddlTermID).val();
    var typeID = $('#TypeID').val();
    var adr = mypath + '/Modules/UIS/StudentUC/AjaxTKBDangVe.aspx?YearStudy=' + YearStudy + '&TermID=' + TermID + '&t=' + Math.random();
    if (typeID == "1")
        adr = mypath + '/Modules/UIS/StudentUC/AjaxTKBDangLuoi.aspx?YearStudy=' + YearStudy + '&TermID=' + TermID + '&t=' + Math.random();
    jQuery("#divThoiKhoiBieu").html("<b style='color:red'>Đang tải dử liệu .....</b>");
    $.ajax({
        type: 'GET',
        url: adr,
        async: true,
        dataType: 'html',
        success: function (html) {
            jQuery("#divThoiKhoiBieu").html(html);
            ProgressHide();
        },
    })
.fail(
    function (jqXHR, textStatus, err) {
        ProgressHide();
        DialogAlert("Lỗi kết nối", "Vui lòng refesh lại website !", "error");
    });
}

/////////////////////
function SelectAll(element) {
    var checked = $(element).is(":checked");
    $('#tbody :checkbox').prop("checked", checked);
}

function ShowConfirm_Loading(Noidung) {
    var kt = confirm(Noidung);
    if (kt) {
        visible_loader();
    }
    return kt;

}

function close_loader() {
    document.getElementById("id_div_ordernow").style.display = 'none';
}
function visible_loader() {
    document.getElementById("id_div_ordernow").style.display = 'block';
}