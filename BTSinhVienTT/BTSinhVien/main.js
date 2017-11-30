import {DanhSachSinhVien} from './DanhSachSinhVien.js';
import {SinhVien} from './SinhVien.js';


//Khởi tạo 1 danh sách sinh viên
var danhSachSinhVien = new DanhSachSinhVien();
SinhVien.prototype.MaSV = '';

//Xây dựng chức năng thêm sinh viên
function ThemSinhVien1()
{
	var HoTen = document.getElementById('hoten').value;
	var MaSV = document.getElementById('masv').value;
	var CMND = document.getElementById('cmnd').value;
	var Email = document.getElementById('email').value;
	var SDT = document.getElementById('sdt').value;
	//Khởi tạo đối tượng sinh viên từ prototype SinhVien
	var sinhVienThem = new SinhVien(HoTen,Email,CMND,SDT);
	sinhVienThem.MaSV = MaSV;
	//Thêm sinh viên vào đối tượng danhsachsinhvien
	danhSachSinhVien.ThemSinhVien(sinhVienThem);
	//Gọi phương thức cập nhật listbox
	CapNhatDanhSachSinhVien();
}
//Đăng ký function ThemSinhVien là sự kiện
window.ThemSinhVien = ThemSinhVien1;

function CapNhatDanhSachSinhVien()
{
	var tBodySinhVien = document.getElementById('tblSinhVien');
	//Clear lstBoxSinhVien
	tBodySinhVien.innerHTML = '';
	//Duyệt DSSV từ đối tượng danhSachSinhVien
	for(var i = 0; i < danhSachSinhVien.DSSV.length; i++)
	{
		//Lấy đối tượng sinh viên từ mảng DSSV
		var sv = danhSachSinhVien.DSSV[i];
		//Tạo thẻ tr
		var trSinhVien = document.createElement('tr');
		//Tạo thẻ td
		var tdCkbSV = document.createElement('td');
		//Tạo checkbox
		var ckbMaSV = document.createElement('input');
		ckbMaSV.setAttribute('type','checkbox');
		ckbMaSV.value = sv.MaSV;
		ckbMaSV.className = 'ckbMaSV';
		//Append checkbox vào td
		tdCkbSV.appendChild(ckbMaSV);
		//Append td vào tr
		trSinhVien.appendChild(tdCkbSV);
		//Tạo td dữ liệu sinh viên
		var tdMaSV = TaoTheTD('MaSV',sv.MaSV);
		var tdHoTen = TaoTheTD('HoTen',sv.HoTen);
		var tdCMND = TaoTheTD('CMND',sv.CMND);
		var tdSoDT = TaoTheTD('SDT',sv.SoDT);
		var tdEmail = TaoTheTD('Email',sv.Email);
		//append các thẻ td thuộc tính sinh viên vào tr
		trSinhVien.appendChild(tdMaSV);
		trSinhVien.appendChild(tdHoTen);
		trSinhVien.appendChild(tdEmail);
		trSinhVien.appendChild(tdSoDT);
		trSinhVien.appendChild(tdCMND);
		//append tr vào tbody
		tBodySinhVien.appendChild(trSinhVien);
	}
}
function TaoTheTD(ClassName,Value)
{
	var td = document.createElement('td');
    td.className = ClassName;
    td.innerHTML = Value;
    return td;
}


// function XoaSinhVien()
// {

// 		var r = confirm("Bạn có muốn xóa hay không ?");
// 		if (r == true) {
// 		//dom đến listbox sinh viên 
// 		var lstBoxSinhVien = document.getElementById('lstDanhSachSinhVien');
// 		var arrSVDuocChon = [];
// 		//Duyệt danh sách thẻ option từ listBoxSinhVien
// 		for(var i=0;i<lstBoxSinhVien.options.length;i++)
// 		{
// 			if(lstBoxSinhVien.options[i].selected)
// 			{
// 				var MaSV = lstBoxSinhVien.options[i].value;
// 				arrSVDuocChon.push(MaSV);
// 			}
// 		}
// 		//Gọi phương thức xóa sinh viên từ đối tượng danhSachSinhVien
// 		danhSachSinhVien.XoaSV(arrSVDuocChon);
// 		CapNhatDanhSachSinhVien();
// 		}
// }


function LuuDuLieu()
{
	//Chuyển đổi danhSachSinhVien => JSON 
	var jsonDanhSachSinhVien = JSON.stringify(danhSachSinhVien.DSSV);
	localStorage.setItem('DanhSachSinhVien',jsonDanhSachSinhVien);
}

function LayDuLieu()
{
	//Lấy chuỗi json danh sách sinh viên từ storage
	var jsonDSSV = localStorage.getItem('DanhSachSinhVien');
	//Chuyển đổi chuỗi jsonDSSV => Đối tượng DanhSachSinhVien 
	danhSachSinhVien.DSSV = JSON.parse(jsonDSSV);
	CapNhatDanhSachSinhVien();

}
//Thêm phương thức XoaSinhVien cho prototypeSinhVien
DanhSachSinhVien.prototype.XoaSV = function(arrSVDuocChon){
	//Duyệt mảng sinh viên được chọn với mảng danh sách sinh viên tìm ra sinh viên xóa
	for(var i=0; i<arrSVDuocChon.length;i++)
	{
		for(var j=0;j<this.DSSV.length;j++)
		{
			if(arrSVDuocChon[i] == this.DSSV[j].MaSV )
			{
				this.DSSV.splice(j,1);
			}
		}
	}
}
DanhSachSinhVien.prototype.TimSV = function(tukhoa){
	
	//Tạo danh sách kết quả sinh viên
	var lstDSSVTimKiem = new DanhSachSinhVien();
	//Duyệt danh sách sinh viên so sánh từ khóa với họ tên
	for(var i=0;i<this.DSSV.length;i++)
	{
		var sinhvien = this.DSSV[i];
	
		if(sinhvien.HoTen.search(tukhoa) != -1)
		{
			lstDSSVTimKiem.ThemSinhVien(sinhvien);
		}
	}
	return lstDSSVTimKiem;
}

function TimKiemSinhVien(){
	//Lấy từ khóa người dùng nhập vào
	var tukhoa = document.getElementById('TuKhoa').value;
	//Gọi phương thức tìm kiếm sinh viên
	var DSSVKetQuaTimKiem = danhSachSinhVien.TimSV(tukhoa);
	console.log(DSSVKetQuaTimKiem);
	CapNhatKetQuaTimKiem(DSSVKetQuaTimKiem);
}
window.TimKiemSinhVien = TimKiemSinhVien;

function CapNhatKetQuaTimKiem(DanhSachSV)
{
	var tBodySinhVien = document.getElementById('tblSinhVien');
	//Clear lstBoxSinhVien
	tBodySinhVien.innerHTML = '';
	//Duyệt DSSV từ đối tượng danhSachSinhVien
	for(var i = 0; i < DanhSachSV.DSSV.length; i++)
	{
		//Lấy đối tượng sinh viên từ mảng DSSV
		var sv = DanhSachSV.DSSV[i];
		//Tạo thẻ tr
		var trSinhVien = document.createElement('tr');
		//Tạo thẻ td
		var tdCkbSV = document.createElement('td');
		//Tạo checkbox
		var ckbMaSV = document.createElement('input');
		ckbMaSV.setAttribute('type','checkbox');
		ckbMaSV.value = sv.MaSV;
		ckbMaSV.className = 'ckbMaSV';
		//Append checkbox vào td
		tdCkbSV.appendChild(ckbMaSV);
		//Append td vào tr
		trSinhVien.appendChild(tdCkbSV);
		//Tạo td dữ liệu sinh viên
		var tdMaSV = TaoTheTD('MaSV',sv.MaSV);
		var tdHoTen = TaoTheTD('HoTen',sv.HoTen);
		var tdCMND = TaoTheTD('CMND',sv.CMND);
		var tdSoDT = TaoTheTD('SDT',sv.SoDT);
		var tdEmail = TaoTheTD('Email',sv.Email);
		//append các thẻ td thuộc tính sinh viên vào tr
		trSinhVien.appendChild(tdMaSV);
		trSinhVien.appendChild(tdHoTen);
		trSinhVien.appendChild(tdEmail);
		trSinhVien.appendChild(tdSoDT);
		trSinhVien.appendChild(tdCMND);
		//append tr vào tbody
		tBodySinhVien.appendChild(trSinhVien);
	}
}


function XoaSinhVien()
{
	//Lấy danh sách tất cả checkbox có classname = ckbMaSV
	var lstMaSV = document.getElementsByClassName('ckbMaSV');
	var arrMaSVDuocChon = [];
	//Duyệt listMaSV 
	for(var i=0 ; i<lstMaSV.length;i++)
	{
		console.log(lstMaSV[i]);
		//Kiểm tra sv nào được checked
		if(lstMaSV[i].checked)
		{
			var MaSV = lstMaSV[i].value;
			arrMaSVDuocChon.push(MaSV);
		}
	}

	danhSachSinhVien.XoaSV(arrMaSVDuocChon);
	CapNhatDanhSachSinhVien();
}
window.XoaSinhVien = XoaSinhVien;


import {HocSinh,TruongHoc} from './test.js';

var hs = new HocSinh('abc');


var th = new TruongHoc('abc','123 lý thái tổ');

console.log(hs);
console.log(th);

//Đóng gói css
require('./style.css');
require('./sass/style.scss');