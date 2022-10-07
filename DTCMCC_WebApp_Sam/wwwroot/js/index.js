
$.ajax({
    url: "https://localhost:44321/api/Employee"
}).done((result) => {
    console.log(result);
}).fail((error) => {
    console.log(error);
})

function detail(stringURL) {
    $.ajax({
        url: "https://localhost:44321/api/Employee/" + stringURL
    }).done((result) => {
        $("#EmployeeIdDetail").val(result.data.employeeId);
        $("#FirstNameDetail").val(result.data.firstName);
        $("#DepartmentIdDetail").val(result.data.departmentId);
        $("#JobIdDetail").val(result.data.jobsId);
        console.log(result);
    }).fail((error) => {
        console.log(error);
    })
}

function Insert() {
    var obj = new Object(); //sesuaikan sendiri nama objectnya dan beserta isinya
    //ini ngambil value dari tiap inputan di form nya
    /*obj.EmployeeId = parseInt($("#EmployeeId").val());*/
    obj.FirstName = $("#FirstName").val();
    obj.DepartmentId = parseInt($("#DepartmentId").val());
    obj.JobsId = parseInt($("#JobId").val());
    //isi dari object kalian buat sesuai dengan bentuk object yang akan di post
    $.ajax({
        contentType: "application/json",
        url: "https://localhost:44321/api/Employee",
        type: "POST",
            data: JSON.stringify(obj) //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify();)
}).done((result) => {
    //buat alert pemberitahuan jika success
    Swal.fire(
        'Selesai',
        'Data Berhasil ditambahkan',
        'success'
    )
    $("#InsertForm")[0].reset();
    $('#modalInsert').modal('hide');
    $('#table-list').DataTable().ajax.reload();
}).fail((error) => {
    //alert pemberitahuan jika gagal
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
    })
})
}

function Details() {
    var obj = new Object();
    obj.FirstName = $("#FirstName").val();
    obj.DepartmentId = parseInt($("#DepartmentId").val());
    obj.JobsId = parseInt($("#JobId").val());

    $.ajax({
        contentType: "application/json",
        url: "https://localhost:44321/api/Employee/${'data'}",
        type: "PUT",
        data: JSON.stringify(obj) //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify();)
    }).done((result) => {
        //buat alert pemberitahuan jika success
        Swal.fire(
            'Selesai',
            'Data Berhasil diupdate',
            'success'
        )
        $("#DetailsForm")[0].reset();
        $('#modalDetails').modal('hide');
        $('#table-list').DataTable().ajax.reload();
    }).fail((error) => {
        //alert pemberitahuan jika gagal
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
        })
    })
}


$(document).ready(function () {
    $('#table-list').DataTable({
        ajax: {
            url: "https://localhost:44321/api/Employee",
            dataSrc: "data",
            dataType: "JSON"
        },
        columns: [
            {
                data: "null",
                "render": function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                data: "employeeId"
            },
            {
                data: "firstName"
            },
            {
                data: "departmentId"
            },
            {
                data: "jobsId"
            },
            {
                data: "employeeId",
                render: function (data, type, row) {
                    return `<button class="btn btn-primary" onclick="detail('${data}')" data-toggle="modal" data-target="#modalDetails">Detail</button>`;
                }
            },  
        ],
    });
});

public JsonResult GetDepartment()
{
    var Department = new List < string > ();
    Department.Add("Australia");
    Department.Add("India");
    Department.Add("Russia");
    return Json(Department, JsonRequestBehavior.AllowGet);
}   

$(function () {

    AjaxCall('/Dummy/GetCountries', null).done(function (response) {
        if (response.length > 0) {
            $('#countryDropDownList').html('');
            var options = '';
            options += '<option value="Select">Select</option>';
            for (var i = 0; i < response.length; i++) {
                options += '<option value="' + response[i] + '">' + response[i] + '</option>';
            }
            $('#countryDropDownList').append(options);

        }
    }).fail(function (error) {
        alert(error.StatusText);
    });

    $('#countryDropDownList').on("change", function () {
        var country = $('#countryDropDownList').val();
        var obj = { country: country };
        AjaxCall('/Dummy/GetStates', JSON.stringify(obj), 'POST').done(function (response) {
            if (response.length > 0) {
                $('#stateDropDownList').html('');
                var options = '';
                options += '<option value="Select">Select</option>';
                for (var i = 0; i < response.length; i++) {
                    options += '<option value="' + response[i] + '">' + response[i] + '</option>';
                }
                $('#stateDropDownList').append(options);

            }
        }).fail(function (error) {
            alert(error.StatusText);
        });
    });

});  