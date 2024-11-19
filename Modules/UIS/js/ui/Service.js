/**********************Load thong tin sinh vien thay doi******************/
function LoadProcess(id) {
    $('#wthongbao').window('open');
    getStudentInfoForStaff(id);
    }
function getStudentInfoForStaff(id) {
    Portlets_Portal.Modules.UIS.Services.Portlets_SV.getStudentInfoForStaff(id, getStudentInfoForStaffSuccess, getStudentInfoForStaffFailed);
}

function getStudentInfoForStaffSuccess(results, context, methodName) {
    //alert(results);
    $("#divResultId").html(results);
}
function getStudentInfoForStaffFailed(results, context, methodName) {
}
/**********************END Load thong tin sinh vien thay doi******************/
function OpenDiv() {
    $('#wthongbao').window('open');
}
/**********************END LoadDiem thanh phan******************/
function GetAssignmentMarksDetailToTableHtml(StudentID, StudyUnitID, ClassCss) {
    Portlets_Portal.Modules.UIS.Services.Portlets_SV.GetAssignmentMarksDetailToTableHtml(StudentID, StudyUnitID, ClassCss, GetAssignmentMarksDetailToTableHtmlSuccess, GetAssignmentMarksDetailToTableHtmlFailed);
}

function GetAssignmentMarksDetailToTableHtmlSuccess(results, context, methodName) {
    //alert(results);
    $("#divResultId").html(results);
}
function GetAssignmentMarksDetailToTableHtmlFailed(results, context, methodName) {
    $("#divResultId").html("Kết nối không thành công");
}
function GetAssignmentMarks(StudentID, StudyUnitID, ClassCss) {
    $('#wthongbao').window('open');
    $("#divResultId").html("Loading ...");
    GetAssignmentMarksDetailToTableHtml(StudentID, StudyUnitID, ClassCss)
    var top = window.pageYOffset || document.documentElement.scrollTop;
    top +=100;
    $(".window").css("top", top);
    $(".window-shadow").css("top", top);

}

/**********************END LoadDiem thanh phan******************/
function ResetMatKhauSinhVien() {
    try {
        $('#divResultId').html('Đang xử lý  ...');
        var StudentID = $('#txtUserName_').val();
        var Email = $('#txtemail').val();
        Portlets_Portal.Modules.UIS.Services.Portlets_SV.ResetMatKhauSinhVien(StudentID, Email, ResetMatKhauSinhVienSuccess, ResetMatKhauSinhVienFailed);
    }
    catch (err)
    {
        $('#divResultId').html('Kết nối không thành công.');
    }
}

function ResetMatKhauSinhVienSuccess(results, context, methodName) {
    //alert(results);
    $("#divResultId").html(results);
}
function ResetMatKhauSinhVienFailed(results, context, methodName) {
    $("#divResultId").html("Kết nối không thành công");
}
///////////////////////////////////////////////////////////////////
