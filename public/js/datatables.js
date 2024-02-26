window.addEventListener('DOMContentLoaded', event => {
    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple, {
            labels: {
                placeholder: "Tìm kiếm...",
                perPage: "mục mỗi trang",
                noRows: "Không có dữ liệu nào phù hợp với truy vấn của bạn",
                info: "Hiển thị {start} đến {end} của {rows} mục",
                noResults: "Không có kết quả phù hợp với truy vấn tìm kiếm của bạn"
            },
        });
    }
});